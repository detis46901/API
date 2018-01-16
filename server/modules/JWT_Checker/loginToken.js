const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzdHJhbmFoYW5AY2l0eW9ma29rb21vLm9yZyIsIklEIjoxLCJpYXQiOjE1MTU3MTU2MjQsImV4cCI6MTUxODMwNzYyNH0.cuX49SzYowA0bwI8uny9FR5bdnKgSCRd2NdxhV3kC0Y"
        //const token = req.headers.authorization.split(" ")[1]; //Remove "Bearer " from auth header in request
        //console.log("\n\n\n\n\n\n" + "loginToken.js" + "\n\n\n\n\n")
        //console.log("\n\n"+token+"\n\n")
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            ignoreExpiration:false
        }) //jwt.verify() does jwt.decode() and verifies signature afterwards.
        req.loginJsonData = decoded_token
        //console.log("\n\n"+req.loginJsonData+"\n\n")
        next();
    } catch(error) {
        return res.status(401).json({
            message: this.token
        })
    }
    
}