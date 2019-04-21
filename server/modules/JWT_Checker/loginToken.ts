const jwt = require('jsonwebtoken')
import {environment} from '../../core/environment'

module.exports = (req, res, next) => {
    try {
        if (req.query.apikey) {
            const token = req.query.apikey
            const decoded_token = jwt.verify(token, environment.JWT_SECRET_KEY, {
                ignoreExpiration:false
            })
            req.loginJsonData = decoded_token
        } else {
            const token = req.headers.authorization.split(" ")[1]; //Remove "Bearer " from auth header in request
            const decoded_token = jwt.verify(token, environment.JWT_SECRET_KEY, {
                ignoreExpiration:false
            })
            req.loginJsonData = decoded_token
        }
        next();
    } catch(error) {
        return res.status(401).json({
            message: this.token
        })
    }
    
}