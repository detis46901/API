const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //Remove "Bearer " from auth header in request
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            ignoreExpiration:false
        }) //jwt.verify() does jwt.decode() and verifies signature afterwards.
        req.loginToken = decoded_token
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Authorization failed."
        })
    }
}