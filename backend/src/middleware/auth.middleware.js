import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ENV from '../lib/env.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; 

        if(!token){
            return res.status(401).json({message: "Unauthorized - no token provided"});
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET); // Here the token is decoded and verified using the secret key. If the token is invalid or expired, it will throw an error.

        if(!decoded) {
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        console.log("from middleware : ", decoded);

        const user = await User.findById(decoded.userId).select("-password"); // !!!! CHECK NEEDED

        if(!user) {
            return res.status(401).json({message: "User not found"}); 
        }

        req.user = user;

        next();

    } catch (err) {
        console.log("Error in protectRoute middleware :", err);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default protectRoute;