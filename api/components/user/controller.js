const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';
module.exports = (ijectedStore) => {
    if (!ijectedStore) ijectedStore = require('../../../store/dummy');
    return {
        list: () => ijectedStore.list(TABLE),
        get: id => ijectedStore.get(TABLE, id),
        upsert:  async (body) => {
            const user = {
                name: body.name,
                username: body.username,
            }
            user.id = body.id ? body.id : nanoid();

            if (body.password || body.username) {
                await auth.upsert({
                    id: user.id,
                    username: user.username,
                    password: body.password,
                });
            }
            ijectedStore.upsert(TABLE, user);
        },
        remove: id => ijectedStore.remove(TABLE, id),
    }
};