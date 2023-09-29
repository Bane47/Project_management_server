const jwt=require('jsonwebtoken')


const generateAccessToken=(credentials)=>{
const token=jwt.sign({credentials},process.env.JWT_SECRET)

return token;
}

module.exports=generateAccessToken;