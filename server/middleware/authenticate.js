
const { User } = require('./../models/user')
const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    console.log('auth-token-beg', token);
    User.findByToken(token).then((user) => {
        //console.log('auth-token', token);
        console.log('auth-user', user);
        if (!user) {
            Promise.reject();

        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
}

module.exports = { authenticate };