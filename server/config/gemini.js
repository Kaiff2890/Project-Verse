/** @format */

// config/gemini.js
import dotenv from "dotenv";
dotenv.config(); // LOAD ENV FIRST

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

// Hard fail if missing
if (!apiKey) {
	console.error("❌ GEMINI_API_KEY not found in .env");
	process.exit(1);
}

export const ai = new GoogleGenAI({
	apiKey,
});
