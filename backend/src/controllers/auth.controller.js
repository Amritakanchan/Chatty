import User from '../models/User.js';
import generateToken from '../lib/utils.js';
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

        if(newUser){
            generateToken(newUser._id, res); // created this function in lib/utils.js
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

        } else {
            res.status(400).json({message: "Invalid User data"});
        }
        // send a welcome email to user after successful signup                 
    } 
    catch(err) {
        console.log("Error in signup controller", err);
        res.status(500).json({message:"internal server error"});
    }
}

export default signup;