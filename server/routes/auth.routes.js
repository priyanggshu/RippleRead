import express from "express";
import { currentUserController, loginController, signupController } from "../controllers/auth.controller";

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/me', verified, currentUserController);

export default router;