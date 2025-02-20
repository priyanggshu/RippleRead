import express from "express";
import { currentUserController, loginController, signupController } from "../controllers/auth.controller.js";
import verified from "../middleware/verified.js";

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/me', verified, currentUserController);

export default router;