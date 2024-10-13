const jwt = require('jsonwebtoken');

//To verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if(!token) {
        return res.status(401).json({ msg: 'Access denied, no token'});
    }

    const decodedToken = jwt.verify(token, 'jwt_crossing');
    if(!decodedToken) {
        return res.status(401).json({ msg: 'The token is invalid or has expired'});
    }

    req.user = decodedToken;
    next();
}

module.exports = authMiddleware;