// /* 
//   complete the middleware code to check if the user is logged in
//   before granting access to the next middleware/route handler
// */

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {

        jwt.verify(authorization, secrets.jwtSecret, function(err, decodedToken) {
            if (err) {
                res.status(401).json({ message: 'You are not authorized to perform this operation' });
            } else {
                req.token = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({ message: 'Please login to have access to this operation'})
    }
};