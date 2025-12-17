import mongoose from "mongoose";

// create message schema
const messageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text: {type: String},
    image: {type: String},
    seen: {type: Boolean, default: false}
},{timestamps: true});

// create message model
const Message = mongoose.model("Message", messageSchema);

// export message model
export default Message;