import {TokenDecode} from "../utilities/tokenUtility.js";
export default (req, res, next) => {

    let token=req.cookies['token']
    let decoded=TokenDecode(token)
    if (decoded===null){
        res.status(401).send({status:"fail",message:"Unauthorized"})
    }

    else {
        let email=decoded.email;
        let userId=decoded.userId;

        req.email=email;
        req.userId=userId;
        
        next()
    }
}