/** @format */

import Users from "../models/userModel.js";
import Posts from "../models/postModel.js";

/**
 * GET /admin/stats
 */
export const getAdminStats = async (req, res) => {
  try {
    const users = await Users.find({})
      .select("-password")
      .populate({ path: "friends", select: "_id" })
      .lean();

    const allPosts = await Posts.find({})
      .select("userId postType description projectCaption gitUrl likes comments createdAt")
      .populate({ path: "userId", select: "firstName lastName email profileUrl" })
      .lean();

    const postsByUser = {};
    const postTypesByUser = {};

    allPosts.forEach((post) => {
      const uid = String(post.userId?._id || post.userId);
      if (!postsByUser[uid]) {
        postsByUser[uid] = [];
        postTypesByUser[uid] = { text: 0, image: 0, video: 0, project: 0 };
      }
      postsByUser[uid].push(post);
      const t = post.postType || "text";
      if (postTypesByUser[uid][t] !== undefined) postTypesByUser[uid][t]++;
    });

    const now = Date.now();
    const enrichedUsers = users.map((u) => {
      const uid = String(u._id);
      const userPosts = postsByUser[uid] || [];
      const joinedAt = new Date(u.createdAt);
      const lastActive = new Date(u.updatedAt);
      const daysOnPlatform = Math.floor((now - joinedAt.getTime()) / 86_400_000);
      const daysSinceActive = Math.floor((now - lastActive.getTime()) / 86_400_000);

      const recentPosts = [...userPosts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map((p) => ({
          _id: p._id,
          postType: p.postType,
          description: p.description,
          projectCaption: p.projectCaption,
          gitUrl: p.gitUrl,
          likeCount: (p.likes || []).length,
          commentCount: (p.comments || []).length,
          createdAt: p.createdAt,
        }));

      return {
        _id: uid,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        profileUrl: u.profileUrl || null,
        profession: u.profession || null,
        location: u.location || null,
        isPremium: !!u.isPremium,
        verified: !!u.verified,
        friendCount: (u.friends || []).length,
        postCount: userPosts.length,
        postTypes: postTypesByUser[uid] || { text: 0, image: 0, video: 0, project: 0 },
        recentPosts,
        joinedAt: u.createdAt,
        lastActive: u.updatedAt,
        daysOnPlatform,
        daysSinceActive,
      };
    });

    enrichedUsers.sort((a, b) => b.postCount - a.postCount);

    const totalUsers = users.length;
    const premiumUsers = users.filter((u) => u.isPremium).length;
    const totalPosts = allPosts.length;
    const postTypeSummary = allPosts.reduce(
      (acc, p) => {
        const t = p.postType || "text";
        if (acc[t] !== undefined) acc[t]++;
        return acc;
      },
      { text: 0, image: 0, video: 0, project: 0 },
    );
    const totalLikes = allPosts.reduce((s, p) => s + (p.likes?.length || 0), 0);
    const totalFriendships = users.reduce((s, u) => s + (u.friends?.length || 0), 0);
    const avgDaysOnPlatform = enrichedUsers.length
      ? Math.round(enrichedUsers.reduce((s, u) => s + u.daysOnPlatform, 0) / enrichedUsers.length)
      : 0;

    const topUsers = enrichedUsers.slice(0, 5).map((u) => ({
      _id: u._id,
      name: `${u.firstName} ${u.lastName}`,
      profileUrl: u.profileUrl,
      postCount: u.postCount,
      isPremium: u.isPremium,
    }));

    return res.status(200).json({
      success: true,
      summary: {
        totalUsers,
        premiumUsers,
        freeUsers: totalUsers - premiumUsers,
        totalPosts,
        postTypeSummary,
        totalLikes,
        totalFriendships,
        avgDaysOnPlatform,
        topUsers,
      },
      users: enrichedUsers,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUT /admin/users/:id
 * Admin can update any user's editable fields
 */
export const updateUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, profession, location, isPremium, verified } = req.body;

  try {
    const user = await Users.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (firstName  !== undefined) user.firstName  = firstName.trim();
    if (lastName   !== undefined) user.lastName   = lastName.trim();
    if (email      !== undefined) user.email       = email.trim().toLowerCase();
    if (profession !== undefined) user.profession  = profession.trim();
    if (location   !== undefined) user.location    = location.trim();
    if (isPremium  !== undefined) user.isPremium   = Boolean(isPremium);
    if (verified   !== undefined) user.verified    = Boolean(verified);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        _id: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profession: user.profession || null,
        location: user.location || null,
        isPremium: user.isPremium,
        verified: user.verified,
        profileUrl: user.profileUrl || null,
      },
    });
  } catch (error) {
    console.error("Admin update user error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /admin/users/:id
 * Admin can delete a user and all their posts
 */
export const deleteUserByAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    await Posts.deleteMany({ userId: id });
    return res.status(200).json({ success: true, message: "User and posts deleted" });
  } catch (error) {
    console.error("Admin delete user error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
