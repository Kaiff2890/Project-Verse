/** @format */

// routes/caption.routes.js
import express from "express";
import {
	geminiChat,
	generateCaption,
	suggestComments,
	suggestReplies,
	summarizePost,
} from "../controllers/caption.controller.js";

const router = express.Router();

router.post("/generate-caption", generateCaption);
router.post("/summarize-post", summarizePost);
router.post("/suggest-comments", suggestComments);
router.post("/suggest-replies", suggestReplies);
router.post("/chat", geminiChat);

export default router;
