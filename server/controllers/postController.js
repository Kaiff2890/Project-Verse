/** @format */

import Comments from "../models/commentModel.js";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
// controllers/postController.js (or wherever createPost is)

export const createPost = async (req, res, next) => {
	try {
		const { userId } = req.body.user; // keep your existing approach

		// accept new fields from frontend
		const {
			description,
			image,
			postType = "text",
			projectCaption,
			gitUrl,
		} = req.body;

		// ✅ validate description (your old rule)
		if (!description || !description.trim()) {
			next("You must provide a description");
			return;
		}

		// ✅ validate postType
		const allowedTypes = ["text", "image", "video", "project"];
		if (!allowedTypes.includes(postType)) {
			next("Invalid post type");
			return;
		}

		// ✅ only validate project fields when postType is project
		if (postType === "project") {
			if (!projectCaption || !projectCaption.trim()) {
				next("Project caption is required");
				return;
			}

			if (!gitUrl || !gitUrl.trim()) {
				next("Git URL is required");
				return;
			}

			const isGithubUrl = /^https?:\/\/(www\.)?github\.com\/.+/i.test(
				gitUrl.trim(),
			);
			if (!isGithubUrl) {
				next("Please provide a valid GitHub URL");
				return;
			}
		}

		const file = req.file;

		// ✅ create post payload
		const payload = {
			userId,
			description: description.trim(),
			image,
			postType,
		};

		if (file) {
			payload.image = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
		}

		// ✅ attach project data only for project posts
		if (postType === "project") {
			payload.projectCaption = projectCaption.trim();
			payload.gitUrl = gitUrl.trim();
		}

		const post = await Posts.create(payload);

		res.status(200).json({
			sucess: true, // (typo kept to match your existing API)
			message: "Post created successfully",
			data: post,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getPosts = async (req, res, next) => {
	try {
		const { userId } = req.body.user;
		const { search } = req.body;

		const user = await Users.findById(userId);
		const friends = user?.friends?.toString().split(",") ?? [];
		friends.push(userId);

		const searchPostQuery = {
			$or: [
				{
					description: { $regex: search, $options: "i" },
				},
			],
		};

		const posts = await Posts.find(search ? searchPostQuery : {})
			.populate({
				path: "userId",
				select: "firstName lastName location profileUrl -password",
			})
			.sort({ _id: -1 });

		const friendsPosts = posts?.filter((post) => {
			return post?.userId?._id && friends.includes(post.userId._id.toString());
		});

		const otherPosts = posts?.filter(
			(post) => post?.userId?._id && !friends.includes(post.userId._id.toString()),
		);

		let postsRes = null;

		if (friendsPosts?.length > 0) {
			postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
		} else {
			postsRes = posts;
		}

		res.status(200).json({
			sucess: true,
			message: "successfully",
			data: postsRes,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getPost = async (req, res, next) => {
	try {
		const { id } = req.params;

		const post = await Posts.findById(id)
			.populate({
				path: "userId",
				select: "firstName lastName location profileUrl -password",
			})
			.populate({
				path: "comments",
				populate: {
					path: "userId",
					select: "firstName lastName location profileUrl -password",
				},
				options: {
					sort: "-_id",
				},
			})
			.populate({
				path: "comments",
				populate: {
					path: "replies.userId",
					select: "firstName lastName location profileUrl -password",
				},
			});

		res.status(200).json({
			sucess: true,
			message: "successfully",
			data: post,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getUserPost = async (req, res, next) => {
	try {
		const { id } = req.params;

		const post = await Posts.find({ userId: id })
			.populate({
				path: "userId",
				select: "firstName lastName location profileUrl -password",
			})
			.sort({ _id: -1 });

		res.status(200).json({
			sucess: true,
			message: "successfully",
			data: post,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getComments = async (req, res, next) => {
	try {
		const { postId } = req.params;

		const postComments = await Comments.find({ postId })
			.populate({
				path: "userId",
				select: "firstName lastName location profileUrl -password",
			})
			.populate({
				path: "replies.userId",
				select: "firstName lastName location profileUrl -password",
			})
			.sort({ _id: -1 });

		res.status(200).json({
			sucess: true,
			message: "successfully",
			data: postComments,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const likePost = async (req, res, next) => {
	try {
		const { userId } = req.body.user;
		const { id } = req.params;
		const post = await Posts.findById(id);
		const index = post.likes.findIndex((pid) => pid === String(userId));

		if (index === -1) {
			post.likes.push(userId);
		} else {
			post.likes = post.likes.filter((pid) => pid !== String(userId));
		}

		const newPost = await Posts.findByIdAndUpdate(id, post, {
			new: true,
		});

		res.status(200).json({
			sucess: true,
			message: "successfully",
			data: newPost,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const likePostComment = async (req, res, next) => {
	const { userId } = req.body.user;
	const { id, rid } = req.params;

	try {
		if (rid === undefined || rid === null || rid === `false`) {
			const comment = await Comments.findById(id);

			const index = comment.likes.findIndex((el) => el === String(userId));

			if (index === -1) {
				comment.likes.push(userId);
			} else {
				comment.likes = comment.likes.filter((i) => i !== String(userId));
			}

			const updated = await Comments.findByIdAndUpdate(id, comment, {
				new: true,
			});

			res.status(201).json(updated);
		} else {
			const replyComments = await Comments.findOne(
				{ _id: id },
				{
					replies: {
						$elemMatch: {
							_id: rid,
						},
					},
				},
			);

			const index = replyComments?.replies[0]?.likes.findIndex(
				(i) => i === String(userId),
			);

			if (index === -1) {
				replyComments.replies[0].likes.push(userId);
			} else {
				replyComments.replies[0].likes = replyComments.replies[0]?.likes.filter(
					(i) => i !== String(userId),
				);
			}

			const query = { _id: id, "replies._id": rid };

			const updated = {
				$set: {
					"replies.$.likes": replyComments.replies[0].likes,
				},
			};

			const result = await Comments.updateOne(query, updated, { new: true });

			res.status(201).json(result);
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const commentPost = async (req, res, next) => {
	try {
		const { comment, from } = req.body;
		const { userId } = req.body.user;
		const { id } = req.params;

		if (comment === null) {
			return res.status(404).json({ message: "Comment is required." });
		}

		const newComment = new Comments({ comment, from, userId, postId: id });

		await newComment.save();

		//updating the post with the comments id
		const post = await Posts.findById(id);

		post.comments.push(newComment._id);
		const updatedPost = await Posts.findByIdAndUpdate(id, post, {
			new: true,
		});

		res.status(201).json(newComment);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const replyPostComment = async (req, res, next) => {
	const { userId } = req.body.user;
	const { comment, replyAt, from } = req.body;
	const { id } = req.params;

	if (comment === null) {
		return res.status(404).json({ message: "Comment is required." });
	}

	try {
		const commentInfo = await Comments.findById(id);

		commentInfo.replies.push({
			comment,
			replyAt,
			from,
			userId,
			created_At: Date.now(),
		});

		commentInfo.save();

		res.status(200).json(commentInfo);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;

		await Posts.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: "Deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
