/** @format */
export const PROJECTS = [
  {
    id: "p1",
    title: "AI Resume Screener",
    category: "AI / Recruitment",
    level: "Advanced",
    budget: "₹25,000 - ₹60,000",
    duration: "2-4 weeks",
    stack: ["MERN", "Node.js", "MongoDB", "OpenAI", "Tailwind"],
    summary:
      "Screen resumes, rank candidates, generate fit-score, and provide insights for recruiters.",
    problem:
      "Manual screening is slow and biased. Recruiters need a consistent, fast ranking pipeline.",
    features: [
      "Resume parsing + skill extraction",
      "Job-to-candidate match scoring",
      "Shortlist & export reports",
      "Admin dashboard + analytics",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d1",
        name: "Faisal Nadaf",
        role: "Full Stack Developer",
        skills: ["React", "Node", "MongoDB", "AI Integrations"],
        location: "Belgaum, Karnataka",
        premiumContact: {
          phone: "+91 88672 16305",
          email: "faisal@example.com",
          whatsapp: "https://wa.me/918867216305",
          linkedin: "https://linkedin.com",
        },
      },
      {
        id: "d2",
        name: "Ayesha Khan",
        role: "UI/UX + Frontend",
        skills: ["UI Systems", "Tailwind", "Animations"],
        location: "Bengaluru",
        premiumContact: {
          phone: "+91 90000 00000",
          email: "ayesha@example.com",
          whatsapp: "https://wa.me/919000000000",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p2",
    title: "Realtime Workspace Productivity Tracker",
    category: "Computer Vision",
    level: "Pro",
    budget: "₹60,000 - ₹2,00,000",
    duration: "1-2 months",
    stack: ["Python", "YOLOv8", "FastAPI", "MongoDB", "React"],
    summary:
      "Top-down camera tracking, zone analytics, productive time, anomaly detection dashboard.",
    problem:
      "Organizations need privacy-respecting analytics to understand workspace utilization and productivity.",
    features: [
      "Zone tracking (desk/meeting/break)",
      "Presence + movement detection",
      "Time calculations + analytics dashboard",
      "Anomaly detection alerts",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d3",
        name: "Rahul Patil",
        role: "Computer Vision Engineer",
        skills: ["YOLO", "Tracking", "Optimization"],
        location: "Pune",
        premiumContact: {
          phone: "+91 81111 11111",
          email: "rahul@example.com",
          whatsapp: "https://wa.me/918111111111",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  // ✅ NEW PROJECTS

  {
    id: "p3",
    title: "AI Social Media Caption + Hashtag Generator",
    category: "AI / Content",
    level: "Intermediate",
    budget: "₹10,000 - ₹35,000",
    duration: "1-2 weeks",
    stack: ["React", "Node.js", "OpenAI", "MongoDB", "Tailwind"],
    summary:
      "Generate captions, hashtags, and post summaries with tone control for creators and businesses.",
    problem:
      "Creators waste time brainstorming. They need fast, consistent content ideas that match brand tone.",
    features: [
      "Caption generation by tone (formal/funny/pro)",
      "Hashtag suggestions by niche",
      "Post summary + CTA suggestions",
      "History + favorites",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d4",
        name: "Nikhil Desai",
        role: "Frontend Developer",
        skills: ["React", "Tailwind", "UI Polish"],
        location: "Hubballi",
        premiumContact: {
          phone: "+91 82222 22222",
          email: "nikhil@example.com",
          whatsapp: "https://wa.me/918222222222",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p4",
    title: "Smart Attendance System (Face + Liveness)",
    category: "Computer Vision / Security",
    level: "Advanced",
    budget: "₹40,000 - ₹1,50,000",
    duration: "3-6 weeks",
    stack: ["Python", "OpenCV", "FastAPI", "PostgreSQL", "React"],
    summary:
      "Face recognition attendance with liveness detection, admin logs, and anti-spoof checks.",
    problem:
      "RFID and manual attendance can be faked. Institutions need accurate, tamper-resistant tracking.",
    features: [
      "Face enroll + recognition",
      "Liveness detection (anti-photo/video)",
      "Attendance reports + exports",
      "Role-based admin dashboard",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1581092795360-7f6b0f0b7b35?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d5",
        name: "Sneha Kulkarni",
        role: "Backend + ML Engineer",
        skills: ["FastAPI", "CV Pipelines", "Databases"],
        location: "Mumbai",
        premiumContact: {
          phone: "+91 83333 33333",
          email: "sneha@example.com",
          whatsapp: "https://wa.me/918333333333",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p5",
    title: "Campus Placement Portal",
    category: "EdTech / Hiring",
    level: "Intermediate",
    budget: "₹25,000 - ₹90,000",
    duration: "3-5 weeks",
    stack: ["MERN", "JWT", "Cloudinary", "Tailwind"],
    summary:
      "College placements portal with student profiles, company posts, applications, and shortlists.",
    problem:
      "Placements happen on spreadsheets and WhatsApp. Colleges need one clean workflow platform.",
    features: [
      "Student profile + resume upload",
      "Company job posting + filters",
      "Application tracking + shortlist",
      "Notifications + admin approvals",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d6",
        name: "Arjun Shetty",
        role: "Full Stack Developer",
        skills: ["React", "Node", "Auth", "Dashboards"],
        location: "Mangaluru",
        premiumContact: {
          phone: "+91 84444 44444",
          email: "arjun@example.com",
          whatsapp: "https://wa.me/918444444444",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p6",
    title: "Doctor Clinic Manager (Offline + Weekly Backup)",
    category: "Healthcare / Mobile",
    level: "Intermediate",
    budget: "₹15,000 - ₹60,000",
    duration: "2-4 weeks",
    stack: ["Flutter", "Drift/SQLite", "PDF", "Google Drive API"],
    summary:
      "Local-first clinic app to manage patients, visits, revenue/expenses, and weekly cloud backup.",
    problem:
      "Doctors need quick offline records without subscription tools, plus safe backups.",
    features: [
      "Patient visits + prescriptions",
      "Revenue/expense dashboard",
      "Export PDF/Excel",
      "Weekly auto backup to Drive",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1580281658628-0f6b1f59f8d1?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d7",
        name: "Meera Joshi",
        role: "Flutter Developer",
        skills: ["Flutter", "Local DB", "PDF Reports"],
        location: "Belgaum",
        premiumContact: {
          phone: "+91 85555 55555",
          email: "meera@example.com",
          whatsapp: "https://wa.me/918555555555",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p7",
    title: "E-Commerce Price Tracker + Alerts",
    category: "Web / Automation",
    level: "Intermediate",
    budget: "₹20,000 - ₹70,000",
    duration: "2-4 weeks",
    stack: ["Next.js", "Node.js", "MongoDB", "Cron", "Email/SMS"],
    summary:
      "Track product prices across stores and alert users when prices drop.",
    problem:
      "Users miss deals and waste time checking prices manually.",
    features: [
      "Add product links + price history chart",
      "Scheduled scraping / API integration",
      "Price drop alerts (email/whatsapp)",
      "Watchlists + categories",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1515165562835-c3b8c0b685b5?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d8",
        name: "Kiran Naik",
        role: "Backend Developer",
        skills: ["Node", "Cron Jobs", "Automation"],
        location: "Goa",
        premiumContact: {
          phone: "+91 86666 66666",
          email: "kiran@example.com",
          whatsapp: "https://wa.me/918666666666",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p8",
    title: "Secure Notes App (End-to-End Encryption)",
    category: "Security / Privacy",
    level: "Advanced",
    budget: "₹30,000 - ₹1,00,000",
    duration: "3-5 weeks",
    stack: ["React", "Node.js", "MongoDB", "Crypto", "JWT"],
    summary:
      "Encrypted notes vault with sharing, device sessions, and zero-knowledge design.",
    problem:
      "Most notes apps can read your content. Users want private notes with real encryption.",
    features: [
      "Client-side encryption/decryption",
      "Vault lock + session timeout",
      "Secure sharing (encrypted links)",
      "Device/session management",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d9",
        name: "Zoya Shaikh",
        role: "Security-minded Full Stack Dev",
        skills: ["Node", "JWT", "Crypto", "React"],
        location: "Hyderabad",
        premiumContact: {
          phone: "+91 87777 77777",
          email: "zoya@example.com",
          whatsapp: "https://wa.me/918777777777",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p9",
    title: "AI Interview Prep Coach",
    category: "AI / EdTech",
    level: "Advanced",
    budget: "₹35,000 - ₹1,20,000",
    duration: "4-6 weeks",
    stack: ["Next.js", "Node.js", "OpenAI", "PostgreSQL", "Tailwind"],
    summary:
      "Mock interviews, feedback, scoring rubrics, and tailored improvement plans.",
    problem:
      "Candidates don’t get structured feedback. They need realistic interview practice + action items.",
    features: [
      "Role-based mock interviews",
      "Answer evaluation + scoring rubric",
      "Weakness detection + practice tasks",
      "Progress tracking dashboard",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d10",
        name: "Pratik Pawar",
        role: "Full Stack + AI",
        skills: ["Next.js", "APIs", "Prompting", "DB Design"],
        location: "Nashik",
        premiumContact: {
          phone: "+91 88888 88888",
          email: "pratik@example.com",
          whatsapp: "https://wa.me/918888888888",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },

  {
    id: "p10",
    title: "Smart Expense Manager (OCR + Analytics)",
    category: "FinTech / Productivity",
    level: "Intermediate",
    budget: "₹18,000 - ₹75,000",
    duration: "2-4 weeks",
    stack: ["Flutter", "Firebase", "OCR", "Charts"],
    summary:
      "Scan bills, auto-categorize expenses, and show insights with monthly budgets.",
    problem:
      "Manual expense tracking fails because it’s boring. OCR makes it fast and usable.",
    features: [
      "Bill OCR scan + auto entry",
      "Categories + budgets",
      "Charts + monthly insights",
      "Export CSV/PDF",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=60",
    ],
    developers: [
      {
        id: "d11",
        name: "Tanmay Kulkarni",
        role: "Mobile Developer",
        skills: ["Flutter", "Firebase", "UX"],
        location: "Bengaluru",
        premiumContact: {
          phone: "+91 89999 99999",
          email: "tanmay@example.com",
          whatsapp: "https://wa.me/918999999999",
          linkedin: "https://linkedin.com",
        },
      },
    ],
  },
  {
    id: "p1",
    title: "Task Management App",
    category: "Web Application",
    level: "Beginner",
    budget: "₹8,000 - ₹15,000",
    duration: "1-2 weeks",
    stack: ["React", "Node.js", "MongoDB"],
    summary: "A simple task manager where users can create, update and delete tasks."
  },

  {
    id: "p2",
    title: "AI Chatbot",
    category: "Artificial Intelligence",
    level: "Intermediate",
    budget: "₹20,000 - ₹40,000",
    duration: "2-3 weeks",
    stack: ["Python", "OpenAI API", "Flask"],
    summary: "A chatbot that answers user questions using AI."
  },

  {
    id: "p3",
    title: "E-Commerce Website",
    category: "Web Development",
    level: "Advanced",
    budget: "₹40,000 - ₹80,000",
    duration: "4-6 weeks",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    summary: "Online shopping platform with product listings and payments."
  },

  {
    id: "p4",
    title: "Portfolio Builder",
    category: "Web Tools",
    level: "Beginner",
    budget: "₹5,000 - ₹10,000",
    duration: "1 week",
    stack: ["HTML", "CSS", "JavaScript"],
    summary: "Tool for developers to generate a personal portfolio website."
  },

  {
    id: "p5",
    title: "Weather Forecast App",
    category: "Mobile / Web App",
    level: "Beginner",
    budget: "₹6,000 - ₹12,000",
    duration: "1 week",
    stack: ["React", "Weather API"],
    summary: "Shows weather forecasts based on the user's location."
  },

  {
    id: "p6",
    title: "Online Learning Platform",
    category: "EdTech",
    level: "Advanced",
    budget: "₹30,000 - ₹90,000",
    duration: "4-6 weeks",
    stack: ["MERN", "JWT"],
    summary: "Platform where instructors upload courses and students enroll."
  },

  {
    id: "p7",
    title: "Food Delivery App",
    category: "Mobile App",
    level: "Advanced",
    budget: "₹50,000 - ₹1,20,000",
    duration: "5-8 weeks",
    stack: ["React Native", "Node.js", "MongoDB"],
    summary: "Users can order food online and track delivery in real time."
  },

  {
    id: "p8",
    title: "AI Image Generator",
    category: "AI",
    level: "Intermediate",
    budget: "₹20,000 - ₹60,000",
    duration: "2-3 weeks",
    stack: ["React", "Node.js", "Stable Diffusion API"],
    summary: "Generate images from text prompts using AI."
  },

  {
    id: "p9",
    title: "Job Portal",
    category: "Web Platform",
    level: "Advanced",
    budget: "₹40,000 - ₹1,00,000",
    duration: "5-7 weeks",
    stack: ["MERN", "JWT"],
    summary: "Employers post jobs and job seekers apply online."
  },

  {
    id: "p10",
    title: "Expense Tracker",
    category: "Finance App",
    level: "Beginner",
    budget: "₹7,000 - ₹14,000",
    duration: "1-2 weeks",
    stack: ["React", "Firebase"],
    summary: "Track daily expenses and visualize spending with charts."
  }
];

