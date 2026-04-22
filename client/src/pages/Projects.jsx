/** @format */
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RiSparkling2Fill } from "react-icons/ri";

const PROJECTS = [
  { id:"p1", title:"Task Manager", category:"Productivity", level:"Beginner", summary:"Manage daily tasks.", stack:["React","Tailwind"], budget:"$80-$150", duration:"1-2 weeks"},
  { id:"p2", title:"Weather App", category:"Utility", level:"Beginner", summary:"Live weather updates.", stack:["React","API"], budget:"$50-$120", duration:"1 week"},
  { id:"p3", title:"Portfolio Website", category:"Web", level:"Beginner", summary:"Personal portfolio.", stack:["React","CSS"], budget:"$50-$100", duration:"1 week"},
  { id:"p4", title:"E-commerce Store", category:"E-commerce", level:"Intermediate", summary:"Online store with cart.", stack:["React","Node","MongoDB"], budget:"$200-$500", duration:"3-4 weeks"},
  { id:"p5", title:"Blog App", category:"Content", level:"Beginner", summary:"Write and publish blogs.", stack:["React","Firebase"], budget:"$60-$120", duration:"1 week"},
  { id:"p6", title:"Chat App", category:"Communication", level:"Intermediate", summary:"Realtime chat.", stack:["React","Socket.io"], budget:"$150-$300", duration:"2-3 weeks"},
  { id:"p7", title:"Expense Tracker", category:"Finance", level:"Beginner", summary:"Track expenses.", stack:["React"], budget:"$50-$100", duration:"1 week"},
  { id:"p8", title:"Movie App", category:"Entertainment", level:"Beginner", summary:"Browse movies.", stack:["React","API"], budget:"$50-$120", duration:"1 week"},
  { id:"p9", title:"Notes App", category:"Productivity", level:"Beginner", summary:"Simple notes app.", stack:["React"], budget:"$40-$80", duration:"1 week"},
  { id:"p10", title:"Todo API", category:"Backend", level:"Beginner", summary:"REST API for todos.", stack:["Node","Express"], budget:"$50-$120", duration:"1 week"},

  { id:"p11", title:"AI Resume Analyzer", category:"AI/ML", level:"Intermediate", summary:"Analyze resumes.", stack:["React","Node"], budget:"$150-$300", duration:"2-3 weeks"},
  { id:"p12", title:"Chat App Pro", category:"Communication", level:"Advanced", summary:"Advanced chat system.", stack:["React","Socket"], budget:"$250-$500", duration:"3-4 weeks"},
  { id:"p13", title:"Crypto Tracker", category:"Finance", level:"Intermediate", summary:"Crypto prices.", stack:["React","Chart"], budget:"$120-$250", duration:"2 weeks"},
  { id:"p14", title:"E-learning Platform", category:"Education", level:"Advanced", summary:"Online courses.", stack:["Next","Mongo"], budget:"$400-$800", duration:"5 weeks"},
  { id:"p15", title:"Fitness Tracker", category:"Health", level:"Beginner", summary:"Track workouts.", stack:["React"], budget:"$70-$150", duration:"1-2 weeks"},
  { id:"p16", title:"Portfolio Builder", category:"Web Tool", level:"Intermediate", summary:"Build portfolios.", stack:["React"], budget:"$150-$300", duration:"2-3 weeks"},
  { id:"p17", title:"Job Finder", category:"Career", level:"Intermediate", summary:"Find jobs.", stack:["React","API"], budget:"$120-$250", duration:"2 weeks"},
  { id:"p18", title:"Expense Splitter", category:"Finance", level:"Beginner", summary:"Split bills.", stack:["React"], budget:"$60-$120", duration:"1 week"},
  { id:"p19", title:"AI Image Generator", category:"AI/ML", level:"Advanced", summary:"Generate images.", stack:["React"], budget:"$200-$500", duration:"3-4 weeks"},
  { id:"p20", title:"Travel Planner", category:"Lifestyle", level:"Intermediate", summary:"Plan trips.", stack:["React"], budget:"$150-$300", duration:"2-3 weeks"},

  { id:"p21", title:"Social Dashboard", category:"Analytics", level:"Intermediate", summary:"Track engagement.", stack:["React"], budget:"$150-$300", duration:"2-3 weeks"},
  { id:"p22", title:"Code Editor", category:"Dev Tool", level:"Advanced", summary:"Online IDE.", stack:["React"], budget:"$300-$600", duration:"4 weeks"},
  { id:"p23", title:"Food Delivery", category:"E-commerce", level:"Advanced", summary:"Order food.", stack:["React","Node"], budget:"$500-$900", duration:"5 weeks"},
  { id:"p24", title:"Habit Tracker", category:"Productivity", level:"Beginner", summary:"Track habits.", stack:["React"], budget:"$60-$120", duration:"1 week"},
  { id:"p25", title:"Blog Platform", category:"Content", level:"Intermediate", summary:"Publish blogs.", stack:["Next"], budget:"$150-$300", duration:"2-3 weeks"},
  { id:"p26", title:"Music UI", category:"Entertainment", level:"Beginner", summary:"Music player UI.", stack:["React"], budget:"$80-$150", duration:"1 week"},
  { id:"p27", title:"Stock Tracker", category:"Finance", level:"Intermediate", summary:"Track stocks.", stack:["React"], budget:"$120-$250", duration:"2 weeks"},
  { id:"p28", title:"Quiz App", category:"Education", level:"Beginner", summary:"Quiz system.", stack:["React"], budget:"$50-$100", duration:"1 week"},
  { id:"p29", title:"Event Booking", category:"Booking", level:"Intermediate", summary:"Book events.", stack:["React"], budget:"$150-$300", duration:"2-3 weeks"},
  { id:"p30", title:"AI Chatbot", category:"AI/ML", level:"Intermediate", summary:"Smart chatbot.", stack:["React"], budget:"$150-$350", duration:"2-3 weeks"},

  { id:"p31", title:"URL Shortener", category:"Utility", level:"Beginner", summary:"Short links.", stack:["React"], budget:"$50-$120", duration:"1 week"},
  { id:"p32", title:"Kanban Board", category:"Productivity", level:"Intermediate", summary:"Task board.", stack:["React"], budget:"$120-$250", duration:"2 weeks"},
  { id:"p33", title:"Video Call App", category:"Communication", level:"Advanced", summary:"Video calls.", stack:["React","WebRTC"], budget:"$400-$800", duration:"4-5 weeks"},
  { id:"p34", title:"Password Manager", category:"Security", level:"Advanced", summary:"Secure passwords.", stack:["React"], budget:"$250-$500", duration:"3-4 weeks"},
  { id:"p35", title:"News App", category:"Content", level:"Beginner", summary:"Latest news.", stack:["React"], budget:"$60-$120", duration:"1 week"},
];

const Projects = () => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return PROJECTS.filter((p) =>
      [p.title, p.category, p.level].join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        Projects <RiSparkling2Fill className="text-blue-400" />
      </h1>

      <input
        className="w-full mt-4 p-3 rounded-xl bg-white/10 border border-white/10"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 
            hover:scale-105 transition duration-300 shadow-lg"
          >
            <p className="text-blue-400 text-xs">{p.category}</p>
            <h2 className="text-xl font-bold">{p.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{p.summary}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {p.stack.map((s) => (
                <span key={s} className="text-xs bg-purple-500/20 px-2 py-1 rounded">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex justify-between mt-4 text-sm">
              <span>{p.budget}</span>
              <span>{p.duration}</span>
            </div>

            <Link
              to={`/projects/${p.id}`}
              className="block mt-4 text-center bg-blue-600 py-2 rounded-xl hover:bg-blue-700"
            >
              View Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;