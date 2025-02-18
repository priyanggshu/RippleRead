import express from "express";
import { createBlogController, fetchBlogsController } from "../controllers/blog.controller";

const router = express.Router();

router.post('/', verified, createBlogController);
router.get('/', fetchBlogsController);

export default router;