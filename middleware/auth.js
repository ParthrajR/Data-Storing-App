const jwt = require("jsonwebtoken")

const auth = async(req, res, next) =>{
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log("userrrr", user.user.id)
            req.userId = user.user.id;
            console.log(req.userId)
        }else{
            res.status(401).json({message: "Unauthorized User"})
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({message: "Unauthorized User"})
    }
}

module.exports = {auth};