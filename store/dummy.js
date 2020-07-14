const db = {
    'user': [
        {
            id: 1,
            name: 'Ernesto',
        },
    ],
}

const list = (table) => {
    return db[table];
}
const get = (table, id) => {
    let col = list(table);
    return col.find(item => item.id === id) || null;
}
const upsert = (table, data) => {
    db[collection].push(data);
}
const remove = (table, id) => {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
}