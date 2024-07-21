import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-routes.js";
import userRoutes from "./routes/user-routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToMongoDB(MONGO_DB_URI);
  console.log(`Server is running at ${PORT}`);
});
