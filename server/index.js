import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongo-db.js";
import userRoutes from "./routes/userRouter.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

const port = process.env.PORT;
const clientURL = process.env.CLIENT_URL;

app.use(express.json());

const corsOptions = {
  origin: clientURL,
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use("/users", userRoutes);
app.use("/ratings", ratingRoutes);
app.use("/posts", postRoutes);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);



app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
