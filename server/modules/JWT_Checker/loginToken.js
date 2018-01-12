const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        var token = req.headers.authorization + "";
        token = token.split(" ")[1]; //Remove "Bearer " from auth header in request
        console.log("\nloginToken.js line7\n"+req.headers.authorization+"\n\n")
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            ignoreExpiration:false
        }) //jwt.verify() does jwt.decode() and verifies signature afterwards.
        req.loginJsonData = decoded_token
        console.log("\nloginToken.js line12\n"+req.loginJsonData+"\n\n")
        next();
    } catch(error) {
        console.log("\nloginToken.js line15\n"+error+"\n\n")
        return res.status(401).json({
            message: "Authorization failed."
        })
    }
    
}