import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-routes.js";
import userRoutes from "./routes/user-routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

import {app, server} from "./socket/socket.js";
// const app = express();

dotenv.config();  

const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const __dirname = path.resolve();
console.log("Current directory:", __dirname);

app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB(MONGO_DB_URI);
  console.log(`Server is running at ${PORT}`);
});


