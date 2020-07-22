const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';
module.exports = (injectedStore) => {
    if (!injectedStore) injectedStore = require('../../../store/dummy');
    const login = async (username, password) => {
        const data = await injectedStore.query(TABLE, { username: username });
        const equals = await bcrypt.compare(password, data.password);
        if (equals) {
            //token
            return auth.sign(data);
        } else {
            throw new Error('invalid data');
        }
    }
    const upsert = async data => {
        const authData = {
            id: data.id,
        }
        if (data.username) authData.username = data.username;
        if (data.password) authData.password = await bcrypt.hash(data.password, 6);
        return injectedStore.upsert(TABLE, authData);
    }
    return {
        login,
        upsert,
    }
}