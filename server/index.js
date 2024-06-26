import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongo-db.js";
import userRoutes from "./routes/userRouter.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

import {app, server} from "./socket/socket.js"
const port = process.env.PORT;
const clientURL = process.env.CLIENT_URL;

app.use(express.json());

// to be fixed 
const corsOptions = {
  origin: clientURL,
  credentials: true,
};

app.use(cors());

connectDB();

app.use("/users", userRoutes);
app.use("/ratings", ratingRoutes);
app.use('/offers', postRoutes);
app.use("/profile", profileRoutes)
// To user send email
app.use('/send-email', emailRoutes);

app.use("/chats", chatRouter);
app.use("/messages", messageRouter);


server.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
