/**
 * Project-Verse Database Seed Script
 * Creates 20 realistic users, posts, comments, and friend connections.
 *
 * Run with:  node seed.js
 * (from the /server directory)
 */

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// ── Models ──────────────────────────────────────────────────────────────────

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true, minlength: 6 },
    location:  { type: String },
    profileUrl:{ type: String },
    profession:{ type: String },
    isPremium: { type: Boolean, default: false },
    socialLinks: {
      instagram: { type: String, default: "" },
      github:    { type: String, default: "" },
      facebook:  { type: String, default: "" },
    },
    friends:  [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views:    [{ type: String }],
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

const postSchema = new mongoose.Schema(
  {
    userId:         { type: Schema.Types.ObjectId, ref: "Users", required: true },
    postType:       { type: String, enum: ["text","image","video","project"], default: "text" },
    description:    { type: String, required: true },
    image:          { type: String },
    projectCaption: { type: String },
    gitUrl:         { type: String },
    likes:          [{ type: String }],
    comments:       [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);
const Posts = mongoose.model("Posts", postSchema);

const commentSchema = new mongoose.Schema(
  {
    userId:  { type: Schema.Types.ObjectId, ref: "Users" },
    postId:  { type: Schema.Types.ObjectId, ref: "Posts" },
    comment: { type: String, required: true },
    from:    { type: String, required: true },
    replies: [],
    likes:   [{ type: String }],
  },
  { timestamps: true }
);
const Comments = mongoose.model("Comments", commentSchema);

// ── User data ────────────────────────────────────────────────────────────────
// Profile photos: real Unsplash / i.pravatar.cc (reliable, no auth needed)
// Pinterest-style aesthetic portrait photos via picsum/pravatar

const USERS = [
  {
    firstName:"Aisha", lastName:"Patel",
    email:"aisha.patel@projectverse.dev",
    profession:"Full Stack Developer",
    location:"Mumbai, India",
    profileUrl:"https://i.pravatar.cc/300?img=47",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/aishapatel_dev", github:"https://github.com/torvalds", facebook:"" },
  },
  {
    firstName:"Liam", lastName:"Chen",
    email:"liam.chen@projectverse.dev",
    profession:"AI/ML Engineer",
    location:"San Francisco, USA",
    profileUrl:"https://i.pravatar.cc/300?img=12",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/liamchen_ai", github:"https://github.com/openai", facebook:"" },
  },
  {
    firstName:"Sofia", lastName:"Martinez",
    email:"sofia.martinez@projectverse.dev",
    profession:"UI/UX Designer",
    location:"Barcelona, Spain",
    profileUrl:"https://i.pravatar.cc/300?img=25",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/sofia_designs", github:"https://github.com/vercel", facebook:"" },
  },
  {
    firstName:"Ravi", lastName:"Sharma",
    email:"ravi.sharma@projectverse.dev",
    profession:"DevOps Engineer",
    location:"Bangalore, India",
    profileUrl:"https://i.pravatar.cc/300?img=15",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/ravi_devops", github:"https://github.com/docker", facebook:"" },
  },
  {
    firstName:"Emma", lastName:"Johansson",
    email:"emma.johansson@projectverse.dev",
    profession:"Blockchain Developer",
    location:"Stockholm, Sweden",
    profileUrl:"https://i.pravatar.cc/300?img=44",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/emma_blockchain", github:"https://github.com/ethereum", facebook:"" },
  },
  {
    firstName:"Carlos", lastName:"Rivera",
    email:"carlos.rivera@projectverse.dev",
    profession:"Mobile App Developer",
    location:"Mexico City, Mexico",
    profileUrl:"https://i.pravatar.cc/300?img=8",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/carlos_mobile", github:"https://github.com/facebook", facebook:"" },
  },
  {
    firstName:"Yuna", lastName:"Kim",
    email:"yuna.kim@projectverse.dev",
    profession:"Data Scientist",
    location:"Seoul, South Korea",
    profileUrl:"https://i.pravatar.cc/300?img=49",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/yuna_data", github:"https://github.com/tensorflow", facebook:"" },
  },
  {
    firstName:"Omar", lastName:"Hassan",
    email:"omar.hassan@projectverse.dev",
    profession:"Cybersecurity Specialist",
    location:"Dubai, UAE",
    profileUrl:"https://i.pravatar.cc/300?img=18",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/omar_sec", github:"https://github.com/OWASP", facebook:"" },
  },
  {
    firstName:"Priya", lastName:"Nair",
    email:"priya.nair@projectverse.dev",
    profession:"Cloud Architect",
    location:"Hyderabad, India",
    profileUrl:"https://i.pravatar.cc/300?img=38",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/priya_cloud", github:"https://github.com/aws", facebook:"" },
  },
  {
    firstName:"Jake", lastName:"Thompson",
    email:"jake.thompson@projectverse.dev",
    profession:"Game Developer",
    location:"Austin, Texas, USA",
    profileUrl:"https://i.pravatar.cc/300?img=6",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/jake_gamedev", github:"https://github.com/unity3d", facebook:"" },
  },
  {
    firstName:"Mei", lastName:"Zhang",
    email:"mei.zhang@projectverse.dev",
    profession:"Frontend Engineer",
    location:"Shanghai, China",
    profileUrl:"https://i.pravatar.cc/300?img=32",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/mei_frontend", github:"https://github.com/vuejs", facebook:"" },
  },
  {
    firstName:"Noah", lastName:"Andersen",
    email:"noah.andersen@projectverse.dev",
    profession:"Backend Developer",
    location:"Oslo, Norway",
    profileUrl:"https://i.pravatar.cc/300?img=20",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/noah_backend", github:"https://github.com/expressjs", facebook:"" },
  },
  {
    firstName:"Fatima", lastName:"Al-Zahra",
    email:"fatima.alzahra@projectverse.dev",
    profession:"Product Manager",
    location:"Cairo, Egypt",
    profileUrl:"https://i.pravatar.cc/300?img=41",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/fatima_pm", github:"https://github.com/microsoft", facebook:"" },
  },
  {
    firstName:"Ethan", lastName:"Williams",
    email:"ethan.williams@projectverse.dev",
    profession:"Open Source Contributor",
    location:"London, UK",
    profileUrl:"https://i.pravatar.cc/300?img=3",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/ethan_oss", github:"https://github.com/linux", facebook:"" },
  },
  {
    firstName:"Isabela", lastName:"Costa",
    email:"isabela.costa@projectverse.dev",
    profession:"AR/VR Developer",
    location:"São Paulo, Brazil",
    profileUrl:"https://i.pravatar.cc/300?img=36",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/isabela_ar", github:"https://github.com/aframevr", facebook:"" },
  },
  {
    firstName:"Arjun", lastName:"Mehta",
    email:"arjun.mehta@projectverse.dev",
    profession:"Startup Founder & Engineer",
    location:"Pune, India",
    profileUrl:"https://i.pravatar.cc/300?img=11",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/arjun_startup", github:"https://github.com/supabase", facebook:"" },
  },
  {
    firstName:"Chloe", lastName:"Dupont",
    email:"chloe.dupont@projectverse.dev",
    profession:"NLP Researcher",
    location:"Paris, France",
    profileUrl:"https://i.pravatar.cc/300?img=45",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/chloe_nlp", github:"https://github.com/huggingface", facebook:"" },
  },
  {
    firstName:"Diego", lastName:"Fernandez",
    email:"diego.fernandez@projectverse.dev",
    profession:"Systems Programmer",
    location:"Buenos Aires, Argentina",
    profileUrl:"https://i.pravatar.cc/300?img=22",
    isPremium:false,
    socialLinks:{ instagram:"https://instagram.com/diego_systems", github:"https://github.com/rust-lang", facebook:"" },
  },
  {
    firstName:"Zara", lastName:"Ahmed",
    email:"zara.ahmed@projectverse.dev",
    profession:"Web3 Developer",
    location:"Karachi, Pakistan",
    profileUrl:"https://i.pravatar.cc/300?img=40",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/zara_web3", github:"https://github.com/solana-labs", facebook:"" },
  },
  {
    firstName:"Kenji", lastName:"Nakamura",
    email:"kenji.nakamura@projectverse.dev",
    profession:"Robotics Engineer",
    location:"Tokyo, Japan",
    profileUrl:"https://i.pravatar.cc/300?img=14",
    isPremium:true,
    socialLinks:{ instagram:"https://instagram.com/kenji_robotics", github:"https://github.com/ros2", facebook:"" },
  },
];

// ── Post templates ───────────────────────────────────────────────────────────

const POST_TEMPLATES = [
  // TEXT POSTS (Now with aesthetic images)
  {
    postType:"image",
    description:"Just shipped my first open-source library! 🎉 After 3 months of late-night coding sessions, v1.0 is finally live. It handles async state management with zero boilerplate. Would love your feedback! #OpenSource #JavaScript",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    postType:"image",
    description:"Hot take: Most 'AI-powered' features are just if-else statements with a fancy wrapper. The real magic of AI comes from thoughtful data pipelines, not the model itself. What do you think? #AI #MachineLearning",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
  },
  {
    postType:"image",
    description:"Reminder: Your code doesn't have to be perfect to ship. Done is better than perfect — refactor after users validate the idea. Stop over-engineering, start delivering. 🚀 #DevLife #StartupMindset",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    postType:"image",
    description:"Finally cracked WebSockets after 2 weeks of debugging. The trick was handling reconnection logic with exponential backoff. Sharing a full write-up on my blog this weekend! #WebDev #RealTime",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80",
  },
  // IMAGE POSTS
  {
    postType:"image",
    description:"Redesigned our entire design system this week. Switched to a glassmorphism + neon accent approach. The results are stunning 🔮 What do you think of this aesthetic?",
    image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    postType:"image",
    description:"Late-night pair programming session with my team across 4 time zones 🌍 Remote work is hard but moments like these make it worth it. #RemoteWork #TeamWork",
    image:"https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
  },
  {
    postType:"image",
    description:"My home lab setup — 3 Raspberry Pis, a custom Kubernetes cluster, and enough RGB to blind you. This is where I experiment with edge computing. 🖥️ #Homelab #Kubernetes",
    image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    postType:"image",
    description:"Data visualization is an art form. This dashboard represents 6 months of user behavior analytics for our SaaS product. Built with D3.js and React. 📊",
    image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    postType:"image",
    description:"AR prototype running on a custom WebGL renderer I built from scratch. No Three.js, pure math and love. 🥽 #AR #WebGL #Innovation",
    image:"https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80",
  },
  // VIDEO POSTS
  {
    postType:"video",
    description:"Quick demo of my AI code reviewer — paste any function, get instant feedback on complexity, potential bugs, and improvement suggestions powered by Gemini. 🤖 Watch the full demo!",
    image:"https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    postType:"video",
    description:"Built a real-time collaborative whiteboard using WebRTC and CRDTs in 48 hours during a hackathon. Here's the speed-run demo. Won 1st place! 🏆 #Hackathon #WebRTC",
    image:"https://www.w3schools.com/html/movie.mp4",
  },
  // PROJECT POSTS
  {
    postType:"project",
    description:"NeuralChat — An AI-powered real-time chat application. Uses WebSockets for live messaging, Gemini AI for smart reply suggestions, and Redis for caching conversation context. Deployed on AWS with auto-scaling. Stars are appreciated ⭐",
    projectCaption:"NeuralChat — AI-Powered Real-Time Messaging",
    gitUrl:"https://github.com/torvalds/linux",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    postType:"project",
    description:"VerseBoard — A Kanban-style project management tool built for developers. Features real-time updates, GitHub integration, and AI-generated task breakdowns. Built with React, Node.js, and MongoDB. Open for contributions!",
    projectCaption:"VerseBoard — Developer-First Project Management",
    gitUrl:"https://github.com/facebook/react",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    postType:"project",
    description:"EdgeGuard — A lightweight cybersecurity scanning tool for edge devices. Written in Rust for maximum performance, detects common vulnerabilities in IoT firmware. CLI + web dashboard included. MIT licensed.",
    projectCaption:"EdgeGuard — IoT Security Scanner in Rust",
    gitUrl:"https://github.com/rust-lang/rust",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    postType:"project",
    description:"ChainVault — A decentralized file storage system built on Ethereum. Uses IPFS for storage and smart contracts for access control. Supports end-to-end encryption and pay-per-access monetization for creators.",
    projectCaption:"ChainVault — Decentralized Encrypted Storage",
    gitUrl:"https://github.com/ethereum/go-ethereum",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
  },
  {
    postType:"project",
    description:"RoboNav — An autonomous navigation system for ground robots using ROS2 and computer vision. Implements SLAM for mapping unknown environments. Tested on a custom 3D-printed robot chassis. Full hardware specs included!",
    projectCaption:"RoboNav — Autonomous Robot Navigation with ROS2",
    gitUrl:"https://github.com/ros2/ros2",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    postType:"project",
    description:"PixelForge — A browser-based pixel art editor with real-time collaboration. Supports layers, animation frames, and one-click export to GIF/PNG/WebP. Built purely with HTML Canvas and vanilla JS — no frameworks!",
    projectCaption:"PixelForge — Collaborative Pixel Art Editor",
    gitUrl:"https://github.com/vercel/next.js",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80",
  },
  {
    postType:"project",
    description:"CloudMind — Serverless ML inference platform. Deploy any ONNX model in seconds via a REST API. Auto-scales to zero, integrates with Cloudflare Workers, and supports model versioning. SaaS-ready with Stripe billing built in.",
    projectCaption:"CloudMind — Serverless ML Inference Platform",
    gitUrl:"https://github.com/huggingface/transformers",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
];

const COMMENTS = [
  "This is genuinely impressive work! How long did it take?",
  "Followed! Your projects are exactly the inspiration I needed this week 🔥",
  "This approach is cleaner than I expected. Open to collaborating?",
  "Just starred the repo! The documentation is 🔑",
  "The design is stunning. What color palette did you use?",
  "This is the future of development right here 🚀",
  "Incredible! I've been struggling with this exact problem for weeks.",
  "Love the aesthetic. Very Dribbble-worthy 💜",
  "The performance benchmarks are unreal. How did you optimize it?",
  "Tagged 3 friends — they need to see this immediately!",
  "Exactly what I needed for my project. Thank you for sharing!",
  "The real-time feature is buttery smooth. WebSockets or SSE?",
  "This deserves way more attention. Sharing now! 🙌",
  "Your commit history tells the real story of dedication. Respect.",
  "Mind if I fork and build on this? Would credit you ofc.",
];

// ── Seed function ────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("✅ Connected to MongoDB:", process.env.MONGODB_URL);

  // Clear existing seed data only (by email domain)
  await Users.deleteMany({ email: /@projectverse\.dev$/ });
  console.log("🧹 Cleaned old seed users");

  // Hash password once
  const hashedPwd = await bcrypt.hash("Verse@2025", 10);

  // ── Create users ──────────────────────────────────────────────────
  const created = [];
  for (const u of USERS) {
    const doc = await Users.create({ ...u, password: hashedPwd, verified: true });
    created.push(doc);
    process.stdout.write(`👤 Created ${doc.firstName} ${doc.lastName}\n`);
  }

  // ── Make everyone friends with each other ─────────────────────────
  const allIds = created.map(u => u._id);
  for (const user of created) {
    const friendIds = allIds.filter(id => !id.equals(user._id));
    await Users.findByIdAndUpdate(user._id, { $set: { friends: friendIds } });
  }
  console.log("🤝 All 20 users are now friends with each other");

  // ── Create posts ──────────────────────────────────────────────────
  const allPosts = [];
  for (let i = 0; i < created.length; i++) {
    const user = created[i];
    // Each user gets 2 posts from the template pool
    const t1 = POST_TEMPLATES[i % POST_TEMPLATES.length];
    const t2 = POST_TEMPLATES[(i + 10) % POST_TEMPLATES.length];
    for (const template of [t1, t2]) {
      // Random subset of users "liked" this post
      const likers = created
        .filter((_, j) => j !== i && Math.random() > 0.45)
        .map(u => u._id.toString());

      const post = await Posts.create({
        userId: user._id,
        postType: template.postType,
        description: template.description,
        image: template.image || undefined,
        projectCaption: template.projectCaption || undefined,
        gitUrl: template.gitUrl || undefined,
        likes: likers,
      });
      allPosts.push({ post, user });
    }
    process.stdout.write(`📝 Posts created for ${user.firstName}\n`);
  }

  // ── Create comments on each post ─────────────────────────────────
  for (const { post, user } of allPosts) {
    // 2-4 random commenters per post
    const commenters = created
      .filter(u => !u._id.equals(user._id))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 2);

    const commentIds = [];
    for (const commenter of commenters) {
      const text = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
      const commentLikers = created
        .filter((_, j) => Math.random() > 0.6)
        .map(u => u._id.toString());

      const comment = await Comments.create({
        userId: commenter._id,
        postId: post._id,
        comment: text,
        from: `${commenter.firstName} ${commenter.lastName}`,
        likes: commentLikers,
      });
      commentIds.push(comment._id);
    }

    // Link comments to post
    await Posts.findByIdAndUpdate(post._id, { $push: { comments: { $each: commentIds } } });
  }
  console.log("💬 Comments added to all posts");

  // ── Summary ───────────────────────────────────────────────────────
  console.log("\n══════════════════════════════════════════════");
  console.log("🎉 Seed complete!");
  console.log(`   Users  : ${created.length}`);
  console.log(`   Posts  : ${allPosts.length}`);
  console.log(`   Password for all: Verse@2025`);
  console.log("══════════════════════════════════════════════\n");
  console.log("Login with any email, e.g.:");
  console.log("  Email:    aisha.patel@projectverse.dev");
  console.log("  Password: Verse@2025");
  console.log("\n");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
