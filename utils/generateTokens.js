const jwt = require("jsonwebtoken");

const generateTokens = (user)=>{
    return jwt.sign({email: user.email, id: user.id}, process.env.JWT_KEY);
}

module.exports.generateTokens = generateTokens; 