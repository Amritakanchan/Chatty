import jwt from "jsonwebtoken";
import ENV from './env.js';

const generateToken = (userId, res) => {
    const { JWT_SECRET } = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET not configured");
    }
    // creating a token for the user
    const token = jwt.sign({userId}, ENV.JWT_SECRET, {expiresIn: "7d"});

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // this is 7 days in milliseconds
        httpOnly: true, // prevent XSS(cross-site scripting) attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: ENV.NODE_ENV==="development"? false : true
    });

    return token;
}

export default generateToken;