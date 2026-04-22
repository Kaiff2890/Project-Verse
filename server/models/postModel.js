/** @format */

import mongoose, { Schema } from "mongoose";

// schema
const postSchema = new mongoose.Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },

		postType: {
			type: String,
			enum: ["text", "image", "video", "project"],
			default: "text",
		},

		description: { type: String, required: true },

		// file url (image/video/project file if you upload)
		image: { type: String },

		// ✅ Project fields (only required when postType === "project")
		projectCaption: {
			type: String,
			trim: true,
			required: function () {
				return this.postType === "project";
			},
		},

		gitUrl: {
			type: String,
			trim: true,
			required: function () {
				return this.postType === "project";
			},
			validate: {
				validator: function (v) {
					// allow empty if not project (because required handled above)
					if (this.postType !== "project") return true;

					// must be valid URL + github.com link
					return /^https?:\/\/(www\.)?github\.com\/.+/i.test(v);
				},
				message: "Invalid GitHub URL",
			},
		},

		likes: [{ type: String }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
	},
	{ timestamps: true },
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
