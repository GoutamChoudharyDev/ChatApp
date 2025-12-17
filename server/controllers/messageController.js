import Message from "../models/Message.js";
import User from "../models/User.js";

// Get all users except the logged in user
export const getUserForSidebar = async (req, res) => {
    try {
        // Get all users except the logged in user
        const userId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        // Count number of message not seen
        const unseenMessages = {}
        const promises = filterUsers.map(async (user) => {
            const messages = await Message.find({
                senderId: user._id, receiverId: userId,
                seen: false
            })
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({ success: true, users: filterUsers, unseenMessages })
    } catch (error) {
        console.log(error.messages);
        res.json({ success: false, messages: error.message })
    }
}

// Get all messages for selected user
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId },
            ]
        })
        await Message.updateMany({ senderId: selectedUserId, receiverId: myId },
            { seen: true });

        res.json({ success: true, messages })

    } catch (error) {
        console.log(error.messages);
        res.json({ success: false, messages: error.message })
    }
}

// api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, {seen: true}) 
        res.json({success: true})
    } catch (error) {
        console.log(error.messages);
        res.json({ success: false, messages: error.message })
    }
}