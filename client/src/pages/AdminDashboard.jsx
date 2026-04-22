/** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoProfile } from "../assets";

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) : "N/A";

const Donut = ({ premium, free }) => {
  const total = premium + free || 1, pct = (premium/total)*100;
  const r=52, cx=60, cy=60, circ=2*Math.PI*r, dash=(circ*pct)/100;
  return (
    <svg viewBox="0 0 120 120" className="w-36 h-36">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#dg)" strokeWidth="16"
        strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
      <text x={cx} y={cy-6} textAnchor="middle" fill="white" fontSize="14" fontWeight="700">{Math.round(pct)}%</text>
      <text x={cx} y={cy+12} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">Premium</text>
      <defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/>
      </linearGradient></defs>
    </svg>
  );
};

const BarChart = ({ data }) => {
  const max = Math.max(...Object.values(data), 1);
  const colors = { text:"#8b5cf6", image:"#06b6d4", video:"#10b981", project:"#f59e0b" };
  return (
    <div className="flex items-end gap-3 h-20 w-full">
      {Object.entries(data).map(([k,v]) => (
        <div key={k} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-[10px] text-white/50">{v}</span>
          <div className="w-full rounded-t" style={{ height:`${(v/max)*60}px`, background:colors[k] }}/>
          <span className="text-[9px] text-white/40 capitalize">{k}</span>
        </div>
      ))}
    </div>
  );
};

const inputCls = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-amber-500/50 transition";

const UserModal = ({ user, onClose, onSave, onDelete }) => {
  const [tab, setTab] = useState("view");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm({ firstName:user.firstName||"", lastName:user.lastName||"", email:user.email||"",
        profession:user.profession||"", location:user.location||"", isPremium:!!user.isPremium, verified:!!user.verified });
      setTab("view"); setMsg(""); setConfirmDel(false);
    }
  }, [user]);

  if (!user) return null;

  const f = (k) => ({ value:form[k], onChange:(e)=>setForm(p=>({...p,[k]:e.target.value})) });

  const save = async () => {
    setSaving(true); setMsg("");
    try {
      const r = await fetch(`http://localhost:8800/admin/users/${user._id}`,
        { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const j = await r.json();
      if (j.success) { setMsg("✅ Saved!"); onSave(j.user); setTimeout(()=>setTab("view"),800); }
      else setMsg("❌ " + (j.message||"Failed"));
    } catch { setMsg("❌ Network error"); }
    finally { setSaving(false); }
  };

  const del = async () => {
    setDeleting(true);
    try {
      const r = await fetch(`http://localhost:8800/admin/users/${user._id}`, { method:"DELETE" });
      const j = await r.json();
      if (j.success) { onDelete(user._id); onClose(); }
      else setMsg("❌ " + (j.message||"Failed"));
    } catch { setMsg("❌ Network error"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"/>
      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-white/10 bg-[#0d0d1a] shadow-2xl overflow-hidden"
        onClick={e=>e.stopPropagation()}>
        <div className="absolute inset-x-0 top-0 h-[1.5px]"
          style={{background:"linear-gradient(90deg,transparent,#f59e0b,#ef4444,transparent)"}}/>

        {/* Header */}
        <div className="flex items-center gap-4 p-6 pb-0">
          <img src={user.profileUrl||NoProfile} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500/30"/>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base truncate">{user.firstName} {user.lastName}</h3>
            <p className="text-white/40 text-xs truncate">{user.email}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white text-xl transition">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 mt-4">
          {[["view","📊 Overview"],["edit","✏️ Edit Info"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)}
              className={`text-xs px-4 py-1.5 rounded-full border transition ${tab===t
                ?"bg-amber-500/20 border-amber-500/40 text-amber-300 font-semibold"
                :"border-white/10 text-white/35 hover:text-white"}`}>{l}</button>
          ))}
        </div>

        <div className="p-6 pt-4 max-h-[68vh] overflow-y-auto">
          {tab==="view" ? (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[["Posts",user.postCount],["Friends",user.friendCount],
                  ["Days on platform",user.daysOnPlatform],["Last active",`${user.daysSinceActive}d ago`],
                  ["Joined",fmt(user.joinedAt)],["Premium",user.isPremium?"⭐ Yes":"No"]
                ].map(([l,v])=>(
                  <div key={l} className="rounded-xl bg-white/5 border border-white/8 px-4 py-3">
                    <p className="text-white/40 text-[10px] uppercase tracking-wide">{l}</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Post breakdown</p>
                <BarChart data={user.postTypes}/>
              </div>
              {user.recentPosts?.length>0 && (
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Recent Posts</p>
                  <div className="flex flex-col gap-2 max-h-44 overflow-y-auto">
                    {user.recentPosts.map(p=>(
                      <div key={p._id} className="rounded-xl bg-white/[0.04] border border-white/8 px-4 py-3">
                        <div className="flex justify-between gap-2">
                          <p className="text-white/80 text-xs flex-1 line-clamp-2">{p.projectCaption||p.description}</p>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border shrink-0 ${
                            p.postType==="project"?"border-amber-500/30 text-amber-400 bg-amber-500/10":
                            p.postType==="video"?"border-green-500/30 text-green-400 bg-green-500/10":
                            p.postType==="image"?"border-cyan-500/30 text-cyan-400 bg-cyan-500/10":
                            "border-violet-500/30 text-violet-400 bg-violet-500/10"}`}>{p.postType}</span>
                        </div>
                        <div className="flex gap-3 mt-1 text-[10px] text-white/30">
                          <span>❤ {p.likeCount}</span><span>💬 {p.commentCount}</span><span>{fmt(p.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/30">First Name</label>
                  <input {...f("firstName")} className={inputCls}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/30">Last Name</label>
                  <input {...f("lastName")} className={inputCls}/>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-3">
                <label className="text-[10px] uppercase tracking-widest text-white/30">Email</label>
                <input {...f("email")} type="email" className={inputCls}/>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/30">Profession</label>
                  <input {...f("profession")} placeholder="e.g. Developer" className={inputCls}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widests text-white/30">Location</label>
                  <input {...f("location")} placeholder="e.g. Mumbai" className={inputCls}/>
                </div>
              </div>
              {/* Toggle buttons */}
              <div className="flex gap-3 mb-4">
                {[["isPremium","⭐ Premium","amber"],["verified","✓ Verified","green"]].map(([k,l,c])=>(
                  <button key={k} type="button" onClick={()=>setForm(p=>({...p,[k]:!p[k]}))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${
                      form[k] ? c==="amber"
                        ?"bg-amber-500/20 border-amber-500/40 text-amber-300"
                        :"bg-green-500/15 border-green-500/35 text-green-300"
                      :"bg-white/5 border-white/10 text-white/35"}`}>
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      form[k] ? c==="amber"?"border-amber-400 bg-amber-400":"border-green-400 bg-green-400"
                              : "border-white/25"}`}>
                      {form[k] && <span className="text-[8px] text-black font-bold">✓</span>}
                    </span>
                    {l}
                  </button>
                ))}
              </div>
              {msg && <p className={`text-xs mb-3 ${msg.startsWith("✅")?"text-green-400":"text-red-400"}`}>{msg}</p>}
              <div className="flex gap-3">
                <button onClick={save} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition">
                  {saving?"Saving…":"Save Changes"}
                </button>
                <button onClick={()=>setConfirmDel(true)}
                  className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition">
                  🗑 Delete
                </button>
              </div>
              {confirmDel && (
                <div className="mt-3 rounded-xl border border-red-500/25 bg-red-500/8 p-4">
                  <p className="text-red-300 text-sm mb-3">⚠️ Delete <strong>{user.firstName} {user.lastName}</strong> and all their posts? Cannot be undone.</p>
                  <div className="flex gap-2">
                    <button onClick={del} disabled={deleting}
                      className="flex-1 py-2 rounded-xl bg-red-500/80 text-white text-xs font-bold hover:bg-red-500 disabled:opacity-50 transition">
                      {deleting?"Deleting…":"Yes, Delete"}
                    </button>
                    <button onClick={()=>setConfirmDel(false)}
                      className="flex-1 py-2 rounded-xl border border-white/10 text-white/50 text-xs hover:text-white transition">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSave = (u) => {
    setData(p => ({ ...p, users: p.users.map(x => x._id===u._id ? {...x,...u} : x) }));
    setSelectedUser(p => p ? {...p,...u} : p);
  };
  const handleUserDelete = (id) => {
    setData(p => ({ ...p, users: p.users.filter(x => x._id!==id) }));
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") { navigate("/admin-login"); return; }
    fetch("http://localhost:8800/admin/stats")
      .then(r=>r.json())
      .then(j => { if(j.success) setData(j); else setError(j.message||"Failed"); })
      .catch(()=>setError("Cannot reach server"))
      .finally(()=>setLoading(false));
  }, [navigate]);

  const logout = () => { localStorage.removeItem("isAdmin"); localStorage.removeItem("adminName"); navigate("/admin-login"); };

  if (loading) return <div className="min-h-screen bg-[#06060f] flex items-center justify-center"><div className="adm-spinner"/></div>;
  if (error)   return <div className="min-h-screen bg-[#06060f] flex items-center justify-center"><p className="text-red-400">{error}</p></div>;

  const { summary, users } = data;
  const filtered = users.filter(u => {
    const mf = filter==="all"||(filter==="premium"&&u.isPremium)||(filter==="free"&&!u.isPremium);
    const ms = !search || `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  const cards = [
    { label:"Total Users",    val:summary.totalUsers,   icon:"👥", c:"violet" },
    { label:"Premium Users",  val:summary.premiumUsers, icon:"⭐", c:"amber"  },
    { label:"Total Posts",    val:summary.totalPosts,   icon:"📝", c:"cyan"   },
    { label:"Total Likes",    val:summary.totalLikes,   icon:"❤️",  c:"pink"   },
    { label:"Avg Days",       val:summary.avgDaysOnPlatform+"d", icon:"⏱", c:"green" },
    { label:"Friendships",    val:summary.totalFriendships, icon:"🤝", c:"blue" },
  ];

  const ptColors = { text:"#8b5cf6", image:"#06b6d4", video:"#10b981", project:"#f59e0b" };

  return (
    <div className="min-h-screen bg-[#06060f] text-white" style={{fontFamily:"'Inter',system-ui,sans-serif"}}>
      {/* Topbar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-[#0a0a16]/90 backdrop-blur border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center font-bold">A</div>
          <div><p className="text-white font-bold text-sm">Admin Panel</p><p className="text-white/35 text-[10px]">Project-Verse Analytics</p></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 text-xs text-amber-400/70 border border-amber-500/20 rounded-full px-3 py-1 bg-amber-500/8">
            🔐 {localStorage.getItem("adminName")||"Admin"}
          </span>
          <button onClick={logout} className="text-xs text-white/50 border border-white/10 rounded-full px-4 py-1.5 hover:text-white hover:border-white/25 transition">Sign Out</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* Summary cards */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-white/30 mb-4">Platform Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {cards.map(c=>(
              <div key={c.label} className={`adm-card adm-card-${c.c} rounded-2xl p-4`}>
                <p className="text-2xl mb-2">{c.icon}</p>
                <p className="text-white font-bold text-xl">{c.val}</p>
                <p className="text-white/45 text-[11px] mt-0.5">{c.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="adm-panel rounded-2xl p-6">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">User Distribution</p>
            <div className="flex items-center gap-6">
              <Donut premium={summary.premiumUsers} free={summary.freeUsers}/>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-red-500"/><span className="text-white/70 text-sm">Premium <strong className="text-white">{summary.premiumUsers}</strong></span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white/15"/><span className="text-white/70 text-sm">Free <strong className="text-white">{summary.freeUsers}</strong></span></div>
              </div>
            </div>
          </div>
          <div className="adm-panel rounded-2xl p-6">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Post Type Breakdown</p>
            <BarChart data={summary.postTypeSummary}/>
          </div>
        </section>

        {/* Top users */}
        <section className="adm-panel rounded-2xl p-6">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">🏆 Most Active Users</p>
          <div className="flex flex-wrap gap-3">
            {summary.topUsers.map((u,i)=>(
              <div key={u._id} className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/8 px-4 py-2">
                <span className="text-sm font-bold text-white/30">#{i+1}</span>
                <img src={u.profileUrl||NoProfile} alt="" className="w-7 h-7 rounded-full object-cover"/>
                <span className="text-sm text-white/80">{u.name}</span>
                {u.isPremium && <span className="text-amber-400 text-xs">⭐</span>}
                <span className="text-white/40 text-xs">{u.postCount} posts</span>
              </div>
            ))}
          </div>
        </section>

        {/* Users grid */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-xs uppercase tracking-widest text-white/30">All Users ({filtered.length})</h2>
            <div className="flex gap-2 flex-wrap">
              {["all","premium","free"].map(f=>(
                <button key={f} onClick={()=>setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${filter===f?"bg-violet-600 border-violet-500 text-white":"border-white/10 text-white/40 hover:text-white"}`}>
                  {f.charAt(0).toUpperCase()+f.slice(1)}
                </button>
              ))}
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
                className="text-xs bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 text-white/70 placeholder:text-white/25 outline-none focus:border-violet-500/50 w-48"/>
            </div>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(u=>(
              <div key={u._id} onClick={()=>setSelectedUser(u)}
                className="adm-panel rounded-2xl p-5 cursor-pointer hover:border-violet-500/30 hover:bg-white/[0.07] transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <img src={u.profileUrl||NoProfile} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-violet-500/30 transition"/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-white font-semibold text-sm truncate">{u.firstName} {u.lastName}</p>
                      {u.isPremium && <span className="text-amber-400 text-xs">⭐</span>}
                    </div>
                    <p className="text-white/40 text-xs truncate">{u.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-bold">{u.postCount}</p>
                    <p className="text-white/30 text-[10px]">posts</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="adm-pill">👥 {u.friendCount}</span>
                  <span className="adm-pill">⏱ {u.daysOnPlatform}d</span>
                  <span className={`adm-pill ${u.daysSinceActive===0?"adm-pill-green":u.daysSinceActive<3?"adm-pill-yellow":"adm-pill-gray"}`}>
                    {u.daysSinceActive===0?"🟢 Today":`🕐 ${u.daysSinceActive}d ago`}
                  </span>
                </div>
                <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden bg-white/5">
                  {u.postCount>0 && Object.entries(u.postTypes).map(([k,v])=>{
                    const pct=(v/u.postCount)*100;
                    return pct>0 ? <div key={k} style={{width:`${pct}%`,background:ptColors[k]}} title={`${k}:${v}`}/> : null;
                  })}
                </div>
                <div className="flex justify-between text-[9px] text-white/20 mt-1">
                  <span>Joined {fmt(u.joinedAt)}</span>
                  <span className="text-violet-400/60">Click to manage →</span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length===0 && <div className="text-center py-16 text-white/30">No users found.</div>}
        </section>
      </div>

      <UserModal user={selectedUser} onClose={()=>setSelectedUser(null)} onSave={handleUserSave} onDelete={handleUserDelete}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .adm-spinner { width:44px; height:44px; border-radius:50%; border:3px solid rgba(245,158,11,0.2); border-top-color:#f59e0b; animation:admSpin .75s linear infinite; }
        @keyframes admSpin { to { transform:rotate(360deg); } }
        .adm-panel { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
        .adm-card { border:1px solid; }
        .adm-card-violet { background:rgba(139,92,246,0.10); border-color:rgba(139,92,246,0.20); }
        .adm-card-amber  { background:rgba(245,158,11,0.10); border-color:rgba(245,158,11,0.20); }
        .adm-card-cyan   { background:rgba(6,182,212,0.10);  border-color:rgba(6,182,212,0.20); }
        .adm-card-pink   { background:rgba(244,114,182,0.10);border-color:rgba(244,114,182,0.20); }
        .adm-card-green  { background:rgba(16,185,129,0.10); border-color:rgba(16,185,129,0.20); }
        .adm-card-blue   { background:rgba(59,130,246,0.10); border-color:rgba(59,130,246,0.20); }
        .adm-pill { font-size:10px; padding:2px 8px; border-radius:99px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.5); }
        .adm-pill-green  { background:rgba(16,185,129,0.12); border-color:rgba(16,185,129,0.2); color:#6ee7b7; }
        .adm-pill-yellow { background:rgba(245,158,11,0.12); border-color:rgba(245,158,11,0.2); color:#fcd34d; }
        .adm-pill-gray   { background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);color:rgba(255,255,255,0.35); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
