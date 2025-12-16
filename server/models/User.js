import mongoose from "mongoose";

// Create user Scehma
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },
}, { timestamps: true });

// Create User Model
const User = mongoose.model("User", userSchema);

// export it
export default User;