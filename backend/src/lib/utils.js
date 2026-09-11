import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    // creating a token for the user
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // this is 7 days in milliseconds
        httpOnly: true, // prevent XSS(cross-site scripting) attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV==="development"? false : true
    });

    return token;
}

export default generateToken;