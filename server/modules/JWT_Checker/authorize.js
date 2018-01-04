const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //console.log("\n\n"+token+"\n\n")
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            ignoreExpiration:false
        }) //jwt.verify: jwt.decode + verify signature
        req.userData = decoded_token
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Authorization failed."
        })
    }
    
}