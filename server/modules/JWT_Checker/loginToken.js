const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzdHJhbmFoYW5AY2l0eW9ma29rb21vLm9yZyIsIklEIjoxLCJpYXQiOjE1MTc3MDE3MDgsImV4cCI6MTUyMDI5MzcwOH0.EvHfulwOPPrcue-O7cGoThSh_Lxddap3pI7v0uF_WNE"
        //const token = req.headers.authorization.split(" ")[1]; //Remove "Bearer " from auth header in request
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            ignoreExpiration:false
        }) //jwt.verify() does jwt.decode() and verifies signature afterwards.
        req.loginJsonData = decoded_token
        next();
    } catch(error) {
        return res.status(401).json({
            message: this.token
        })
    }
    
}