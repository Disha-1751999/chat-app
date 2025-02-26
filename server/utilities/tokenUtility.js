import jwt from "jsonwebtoken";


export const TokenEncode=(email,userId)=>{
    const KEY=process.env.JWT_KEY
    const EXPIRE={expiresIn: 3*24*60*60*1000}
    const PAYLOAD={email:email,userId:userId}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

export const TokenDecode=(token)=>{
    try {
        return jwt.verify(token,process.env.JWT_KEY)
    }catch (e) {
        return null
    }
}