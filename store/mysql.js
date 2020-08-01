const mysql = require('mysql');
const config = require('../config');
const dbconfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};
let connection;
const handleConnection = () => {
    connection = mysql.createConnection(dbconfig);
    connection.connect((error) => {
        if (error) {
            console.error('[db error]', error);
            setTimeout(handleConnection, 2000);
        } else {
            console.log('DB Connected!');
        }

    });
    connection.on('error', error => {
        console.error('[db error]', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        } else {
            throw error;
        }
    })
}
const list = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
}
const get = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
}
const insert = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}
const update = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}
const upsert = async (table, payload) => new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, data) => {
        console.log('UPDATE DATA: ', data)
        if (error) {
            return reject(error)
        }
        resolve(data)
    })
});
const query = (table, query, join) => {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, result) => {
            if (err) reject(err);
            if (result == undefined) {
                reject(err);
            } else {
                let output = {
                    id: result[0].id,
                    username: result[0].username,
                    password: result[0].password
                }
                resolve(output, null);
            }

        });
    });
}
handleConnection();

module.exports = {
    list,
    get,
    upsert,
    query,
}