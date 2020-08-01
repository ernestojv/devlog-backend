const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';
module.exports = (injectedStore) => {
    if (!injectedStore) injectedStore = require('../../../store/dummy');
    return {
        list: () => injectedStore.list(TABLE),
        get: id => injectedStore.get(TABLE, id),
        upsert: async (body) => {
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
            injectedStore.upsert(TABLE, user);
        },
        remove: id => injectedStore.remove(TABLE, id),
        follow: (from, to) => {
            return injectedStore.upsert(TABLE + '_follow', {
                user_from: from,
                user_to: to,
            });
        },
        following: async (user) => {
            const join = {};
            join[TABLE] = 'user_to';
            const query = { user_from: user };
            return await injectedStore.query(TABLE + '_follow', query, join);
        }
    }
};