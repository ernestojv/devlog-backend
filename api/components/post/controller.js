const TABLE = 'post';
module.exports = (injectedStore) => {
    if (!injectedStore) injectedStore = require('../../../store/dummy');
    return {
        list: () => injectedStore.list(TABLE),
    }
};