import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP Server
const app = express();
const server = http.createServer(app); // Note : socket.io supports this http server

// Initialize socket.io server
export const io = new Server(server, {
    cors: { origin: "*" }
})

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("diconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Api Endpoint (Route Setup)
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter); // from user router
app.use("/api/messages", messageRouter); // from message router

// Connect to MongoDB
await connectDB();

// Port 
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
