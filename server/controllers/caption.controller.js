/** @format */

// controllers/caption.controller.js
import { ai } from "../config/gemini.js";

export const generateCaption = async (req, res) => {
	try {
		const { text } = req.body;

		// Validation
		if (!text || typeof text !== "string" || text.trim().length < 2) {
			return res.status(400).json({
				success: false,
				message: "Valid caption text is required.",
			});
		}

		const cleanText = text.trim();

		// Prompt
		const prompt = `
You are a professional social media caption writer.

User input:
"${cleanText}"

Rewrite it into ONE catchy Instagram caption.

Rules:
- Max length of content should be 3 times the length of the given content
- 3 related  hashtags
- No explanation
- Return only caption text

`.trim();

		// Gemini call
		const result = await ai.models.generateContent({
			model: "gemini-flash-lite-latest", // stable public model
			contents: prompt,
			config: {
				temperature: 0.8,
				maxOutputTokens: 40,
			},
		});

		// Safer text extraction
		const caption =
			result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
			result?.text?.trim();

		if (!caption) {
			return res.status(500).json({
				success: false,
				message: "Model returned empty caption.",
			});
		}

		return res.status(200).json({
			success: true,
			original: cleanText,
			generated: caption,
		});
	} catch (error) {
		console.error("Caption Controller Error:", error.message);

		return res.status(500).json({
			success: false,
			message: "Server error while generating caption.",
		});
	}
};

// controllers/caption.controller.js
export const summarizePost = async (req, res) => {
	try {
		const { text } = req.body;

		// Validation
		if (!text || typeof text !== "string" || text.trim().length < 10) {
			return res.status(400).json({
				success: false,
				message: "Post content must be at least 10 characters.",
			});
		}

		const cleanText = text.trim();

		// Prompt for summarization
		const prompt = `
You are an expert content summarizer.

Post content:
"${cleanText}"

Task:
- Summarize this post into a short, clear summary.
- Keep it under 20 words.
- Maintain original meaning.
- No hashtags.
- No explanation.

Return only the summarized text.
`.trim();

		// Gemini API call
		const result = await ai.models.generateContent({
			model: "gemini-flash-lite-latest", // stable + fast
			contents: [
				{
					role: "user",
					parts: [{ text: prompt }],
				},
			],
			config: {
				temperature: 0.4, // lower = more factual summary
				maxOutputTokens: 60,
			},
		});

		// Extract text safely
		const summary =
			result?.text?.trim() ||
			result?.candidates?.[0]?.content?.parts
				?.map((p) => p.text || "")
				.join("")
				.trim();

		if (!summary) {
			return res.status(500).json({
				success: false,
				message: "Model returned empty summary.",
			});
		}

		return res.status(200).json({
			success: true,
			original: cleanText,
			summary,
		});
	} catch (error) {
		console.error("Summarize Controller Error:", error);

		return res.status(500).json({
			success: false,
			message: "Server error while summarizing post.",
		});
	}
};

export const suggestComments = async (req, res) => {
	try {
		const { text } = req.body;

		// Validation
		if (!text || typeof text !== "string" || text.trim().length < 5) {
			return res.status(400).json({
				success: false,
				message: "Post description text is required (min 5 chars).",
			});
		}

		const cleanText = text.trim();

		const prompt = `
You are a social media assistant.

Post description:
"${cleanText}"

Task:
- Generate 3 short comment suggestions that fit this post.
- Each comment must include 1 or 2 relevant emojis.
- Keep each comment under 10 words.
- No hashtags.
- No explanation.

Return ONLY valid JSON array of strings.
Example:
["Nice one 😍", "This is amazing 🔥", "Love this vibe 😄"]
`.trim();

		const result = await ai.models.generateContent({
			model: "gemini-flash-lite-latest", // stable
			contents: [
				{
					role: "user",
					parts: [{ text: prompt }],
				},
			],
			config: {
				temperature: 0.9,
				maxOutputTokens: 120,
			},
		});

		const raw =
			result?.text?.trim() ||
			result?.candidates?.[0]?.content?.parts
				?.map((p) => p.text || "")
				.join("")
				.trim();

		if (!raw) {
			return res.status(500).json({
				success: false,
				message: "Model returned empty suggestions.",
			});
		}

		// Parse JSON safely
		let suggestions;
		try {
			suggestions = JSON.parse(raw);
		} catch (e) {
			// fallback: split lines if model didn't return strict JSON
			suggestions = raw
				.split("\n")
				.map((s) => s.replace(/^[-*\d.\s]+/, "").trim())
				.filter(Boolean)
				.slice(0, 3);
		}

		if (!Array.isArray(suggestions) || suggestions.length === 0) {
			return res.status(500).json({
				success: false,
				message: "Failed to parse suggestions from model output.",
			});
		}

		// Clean + limit
		const finalSuggestions = suggestions
			.map((s) => (typeof s === "string" ? s.trim() : ""))
			.filter(Boolean)
			.slice(0, 3);

		return res.status(200).json({
			success: true,
			original: cleanText,
			suggestions: finalSuggestions,
		});
	} catch (error) {
		console.error("SuggestComments Controller Error:", error);

		return res.status(500).json({
			success: false,
			message: "Server error while generating comment suggestions.",
		});
	}
};

export const suggestReplies = async (req, res) => {
	try {
		const { text, comment, replyTo } = req.body;

		// Validation
		if (!text || typeof text !== "string" || text.trim().length < 5) {
			return res.status(400).json({
				success: false,
				message: "Post description text is required (min 5 chars).",
			});
		}

		const cleanDesc = text.trim();
		const cleanComment = typeof comment === "string" ? comment.trim() : "";
		const cleanReplyTo = typeof replyTo === "string" ? replyTo.trim() : "";

		const prompt = `
You are a social media assistant.

Post description:
"${cleanDesc}"

${cleanComment ? `Comment to reply to:\n"${cleanComment}"\n` : ""}

${cleanReplyTo ? `Replying to user:\n"${cleanReplyTo}"\n` : ""}

Task:
- Generate 3 short reply suggestions that fit the post + the comment context.
- Each reply must include 1 or 2 relevant emojis.
- Keep each reply under 10 words.
- No hashtags.
- No explanation.

Return ONLY valid JSON array of strings.
Example:
["So true! 😄✨", "Haha love this 😂🔥", "Exactly! 💯👏"]
`.trim();

		const result = await ai.models.generateContent({
			model: "gemini-flash-lite-latest",
			contents: [
				{
					role: "user",
					parts: [{ text: prompt }],
				},
			],
			config: {
				temperature: 0.9,
				maxOutputTokens: 140,
			},
		});

		const raw =
			result?.text?.trim() ||
			result?.candidates?.[0]?.content?.parts
				?.map((p) => p.text || "")
				.join("")
				.trim();

		if (!raw) {
			return res.status(500).json({
				success: false,
				message: "Model returned empty reply suggestions.",
			});
		}

		// Parse JSON safely
		let suggestions;
		try {
			suggestions = JSON.parse(raw);
		} catch (e) {
			// Fallback if model doesn't return strict JSON
			suggestions = raw
				.split("\n")
				.map((s) => s.replace(/^[-*\d.)\s]+/, "").trim())
				.filter(Boolean)
				.slice(0, 3);
		}

		if (!Array.isArray(suggestions) || suggestions.length === 0) {
			return res.status(500).json({
				success: false,
				message: "Failed to parse reply suggestions from model output.",
			});
		}

		const finalSuggestions = suggestions
			.map((s) => (typeof s === "string" ? s.trim() : ""))
			.filter(Boolean)
			.slice(0, 3);

		return res.status(200).json({
			success: true,
			original: cleanDesc,
			context: {
				comment: cleanComment || undefined,
				replyTo: cleanReplyTo || undefined,
			},
			suggestions: finalSuggestions,
		});
	} catch (error) {
		console.error("SuggestReplies Controller Error:", error);

		return res.status(500).json({
			success: false,
			message: "Server error while generating reply suggestions.",
		});
	}
};

/**
 * POST /api/gemini/chat
 * body: { message: string, history?: Array<{ role: "user"|"model", text: string }> }
 */
import { GoogleGenAI } from "@google/genai";

export const geminiChat = async (req, res) => {
	try {
		const { message, history = [] } = req.body;

		if (!process.env.GEMINI_API_KEY) {
			return res.status(500).json({
				success: false,
				message: "Missing GEMINI_API_KEY in environment",
			});
		}

		if (!message || typeof message !== "string" || !message.trim()) {
			return res
				.status(400)
				.json({ success: false, message: "Message is required" });
		}

		const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

		// keep last 20 turns
		const safeHistory =
			Array.isArray(history) ?
				history
					.filter(
						(h) =>
							h &&
							(h.role === "user" || h.role === "model") &&
							typeof h.text === "string" &&
							h.text.trim(),
					)
					.slice(-20)
			:	[];

		const contents = [
			...safeHistory.map((h) => ({
				role: h.role,
				parts: [{ text: h.text }],
			})),
			{ role: "user", parts: [{ text: message.trim() }] },
		];

		// ✅ Use a valid model name
		const response = await ai.models.generateContent({
			model: "gemini-flash-lite-latest",
			contents,
		});

		return res.json({
			success: true,
			reply: response?.text || "No response text received.",
		});
	} catch (error) {
		// IMPORTANT: log the real error so you can see what Gemini returned
		console.error("Gemini chat error:", error);

		return res.status(500).json({
			success: false,
			message: error?.message || "Gemini server error",
		});
	}
};
