import User from '../models/User.js';
import generateToken from '../lib/utils.js';
import sendWelcomeEmail from '../emails/emailHandlers.js';
import ENV from '../lib/env.js'; // using a js file which has all env value as an object
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
    const{fullName, email, password} = req.body; // extracting user data from req body

    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({message:"All feilds are required"});
        }

        if(password.length<6) {
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }    

        // check if email id valid using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        //check if user email exists 
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"});

        // salting and hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // new user creation
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){ // saving user to db ; generating token for user ; sending welcome email
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res); // created this function in lib/utils.js

            res.status(201).json({
                _id: savedUser._id,
                fullname: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic
            });

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error('Failed to send welcome email : ', error);
            }

        } else {
            res.status(400).json({message: "Invalid User data"});
        }
    } 
    catch(err) {
        console.log("Error in signup controller", err);
        res.status(500).json({message:"internal server error"});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if( !email || !password) {
        return res.status(400).json({message: "All feilds are required"});
    }

    try {
        const user = await User.findOne({email});
        console.log(user);

        if(!user) { // verifying if user exists in db
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password); // password checking function

        if(!isPasswordCorrect){ // verifying if entered password is correct
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res); // generating a token for user

            res.status(200).json({
                _id: user._id,
                fullname: user.fullName,
                email: user.email,
                profilePic: user.profilePic
            });

    } catch(err) {
        console.error("Error in login controller : ", err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const logout =  (_, res) => {     // clearing users cookie session
    res.clearCookie("jwt", {
        httpOnly: true, 
        sameSite: "strict", 
        secure: ENV.NODE_ENV==="development"? false : true
    }); 
    res.status(200).json({message: "Logged Out Succcesfully"});
}

export { signup, login, logout };