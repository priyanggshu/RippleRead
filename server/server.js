import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());

server.use('/auth', authRoutes);
server.use('/blog', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(error => console.error(`DB Connection failed: ${error}`));

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});