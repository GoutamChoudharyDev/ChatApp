import { generateToken } from '../lib/utils.js';
import User from '../models/User.js'
import bcrypt from 'bcrypt.js'

// --------Signup function----------
export const signup = async (req, res) => {
    // Get data from request body
    const { fullName, email, password, bio } = req.body;

    try {
        // Check the data is available or not.
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" })
        }
        // Ceck User is Exist or not.
        const user = await User.findOne({ email });

        // If user exist then show "Account already exists".
        if (user) {
            return res.json({ success: false, message: "Account already exists" })
        }

        //If no user then creat but before that perform password encryption using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });

        // Create token so we can authenticate 
        const token = generateToken(newUser._id);

        // After created new user we send a response
        res.json({ success: true, userData: newUser, token, message: "Account created successfully" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// --------Login function----------
export const login = async (req, res) => {
    try {
        // Get email & password from request body
        const { email, password } = req.body;

        // Find user by email
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(userData._id);

        // Send response  
        res.json({ success: true, userData, token, message: "Login successfull" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

