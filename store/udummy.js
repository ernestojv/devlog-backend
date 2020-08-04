const db = {
    'user': [
        {
            id: '1',
            name: 'Ernesto',
        },
    ],
}

const list = async (table) => {
    return db[table];
}
const get = async (table, id) => {
    let col = await list(table);
    return col.find(item => item.id === id) || null;
}
const upsert = async (table, data) => {
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
    console.log(db);
}
const remove = async (table, id) => {
    return true;
}
const query = async (table, q) => {
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0]
    return col.find(item => item[keys] === q[key]) || null;
}
module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}