import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import redis from "redis";

dotenv.config();
const server = express();

const redisClient = redis.createClient();

redisClient.on('error', (err) => console.error(`Redis error: ${err}`));

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    redisClient.get(key, (err, data) => {
        if(err) throw err;
        if(data) return res.json(JSON.parse(data));
        next();
    })
};


server.use(cors());
server.use(express.json());

server.use('/auth', authRoutes);
server.use('/blog', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(error => console.error(`DB Connection failed: ${error}`));
    
export { redisClient, cacheMiddleware}

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});