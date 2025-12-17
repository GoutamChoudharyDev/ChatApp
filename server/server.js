import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Create Express app and HTTP Server
const app = express();
const server = http.createServer(app); // Note : socket.io supports this http server

// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

// Api Endpoint (Route Setup)
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter); // from user router
app.use("/api/messages", messageRouter); // from message router

// Connect to MongoDB
await connectDB();

// Port 
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server is running on PORT : ${PORT}`));
