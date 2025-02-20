import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createClient } from "redis";

import authRoutes from "./routes/auth.routes.js"
import blogRoutes from "./routes/blog.routes.js"

dotenv.config();
const server = express();

const redisClient = createClient({
    url: process.env.UPSTASH_REDIS_URL
});

redisClient.on('error', (err) => console.error(`Redis error: ${err}`));

const cacheMiddleware = async (req, res, next) => {
    try {
        const key = req.originalUrl;
        const data = await redisClient.get(key);

        if(data) {
            return res.json(JSON.parse(data));
        }
        next();
    } catch (error) {
        console.error("Redis error:", error);
        next();
    }
};

server.use(cors());
server.use(express.json());
server.use('/auth', authRoutes);
server.use('/blog', blogRoutes);

const PORT = process.env.PORT || 3003;

const startServer = async () => {
    try {
        await redisClient.connect();
        console.log("✅ Connected to Redis");

        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('DB connected'))
            .catch(error => console.error(`DB Connection failed: ${error}`));

        server.listen(PORT, () => console.log(`✅ Server connected on port ${PORT}`)); 
    } catch (error) {
        console.error("❌ Error starting the server:", error);   
    }
};

startServer();
export { redisClient, cacheMiddleware}

