import cloudinary from '../lib/cloudinary.js';
import Message from '../models/Message.js';
import User from '../models/User.js';


const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // idk if it is user or users; Check it once.
        console.log(req)

        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password"); // ne -> not equal
        res.status(200).json(filteredUsers);
    } catch(error) {
        console.log("Error in getting all contacts :", error);
        res.status(500).json({message: "Error in get all contacts function"}); // change msg later on
    }
}

const getAllChats = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; //extracting logged in user's id

        // find all the messages from our db where the logged in user is either a sender or receiver
        const messages = await Message.find({$or: [
            {senderId: loggedInUserId}, 
            {receiverId: loggedInUserId}
        ]});

        // extracting all the users that the logged user has chatted with
        const chatPartnerIds = [...new Set(messages.map((msg) => // we want this as an array and we want unique values only. we are also spreading this
            msg.senderId.toString()===loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))]; 

            const chatPartners = await User.find({_id: {$in : chatPartnerIds}}).select("-password");

            res.status(200).json(chatPartners);

    } catch (error) {
        console.error("Error in getting all chats : ", error.message);
        res.status(500).json({error: "Error in get all chat route function"});
    }
}

const getMessagesByUserId = async (req, res) => {
    try {
        const senderId = req.user._id;
        const {id:receiverId} = req.params; // params is taken from the url

        const messages = await Message.find({
            $or: [
                {senderId: senderId, receiverId: receiverId}, 
                {senderId: receiverId, receiverId: senderId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages controller : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

const sendMessage = async (req, res) => {  // i have a todo list here
    try {
        const {text, img} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imgUrl;
        if(img) {
            // upload base64 img to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(img);
            imgUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message ({
            senderId, receiverId, text, image:imgUrl
        });

        await newMessage.save();

        //todo: send message in real time if user is online using socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Error from the send message controller"});
    }
}

export { getAllContacts, getAllChats, getMessagesByUserId, sendMessage };