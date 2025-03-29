import express from "express";
import verified from "../middleware/verified.js";
import { createBlogController, deleteBlogController, fetchBlogsController, fetchExternalSourcesController, getBlogByIdController, getRecommendationsController, likeBlogController, saveBlogController, updateBlogController } from "../controllers/blog.controller.js";

const router = express.Router();

router.post('/', verified, createBlogController);
router.get('/', fetchBlogsController);

router.get('/recommendations', verified, getRecommendationsController);
router.get('/external', fetchExternalSourcesController);
router.get('/:id', getBlogByIdController);

router.put('/:id', verified, updateBlogController);
router.delete('/:id', verified, deleteBlogController);

router.post('/:id/like', verified, likeBlogController);
router.post('/:id/save', verified, saveBlogController);

export default router;