const User = require('./models/User');


async function usernameValidator(username) {
    const valid = await User.countDocuments({ username: username }) == 0;

    if (valid) return undefined;
    return Promise.reject(new Error('Username is already taken.'));
}


module.exports = { usernameValidator };
