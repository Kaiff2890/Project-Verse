import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import postRoute from "./postRoutes.js";
import messageRoute from "./messageRouter.js";
import genrateRoute from "./caption.routes.js";
import adminRoute from "./adminRoutes.js";

const router = express.Router();

router.use(`/auth`, authRoute); //auth/register
router.use(`/users`, userRoute);
router.use(`/posts`, postRoute);
router.use(`/chat`, messageRoute);
router.use(`/genrate`, genrateRoute);
router.use(`/admin`, adminRoute);

export default router;

