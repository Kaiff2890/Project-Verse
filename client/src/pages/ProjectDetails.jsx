/** @format */
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { BsCheck2Circle, BsLockFill } from "react-icons/bs";
import { RiSparkling2Fill } from "react-icons/ri";

const isPremiumUser = () => {
  // Later: replace with redux user premium flag or backend check
  const u = JSON.parse(localStorage.getItem("user"));
  return !!u?.isPremium; // if you set this true, contacts unlock
};

const ProjectDetails = () => {
  const { id } = useParams();
  const premium = isPremiumUser();

  const project = useMemo(() => PROJECTS.find((p) => p.id === id), [id]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-bgColor flex items-center justify-center">
        <div className="bg-primary border border-[#66666625] rounded-3xl p-6 text-center">
          <p className="text-ascent-1 font-semibold text-lg">Project not found</p>
          <Link to="/projects" className="text-blue mt-2 inline-block">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const premiumFeatures = [
    "See direct contact details of developers",
    "View top-rated developers first",
    "Unlock premium filters (skills, location, availability)",
    "Priority hiring support",
  ];

  return (
    <div className="w-full min-h-screen bg-bgColor">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-14">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-ascent-2 text-sm">{project.category}</p>
            <h1 className="text-ascent-1 text-2xl md:text-3xl font-bold">
              {project.title}
            </h1>
            <p className="text-ascent-2 mt-2 max-w-3xl">{project.summary}</p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/projects"
              className="text-ascent-2 hover:text-ascent-1 transition border border-[#66666625] px-4 py-2 rounded-xl bg-primary/70"
            >
              Back
            </Link>

            {!premium && (
              <Link
                to="/premium"
                className="px-4 py-2 rounded-xl bg-[#0444a4] text-white text-sm font-semibold hover:opacity-95 transition"
              >
                Buy Premium
              </Link>
            )}
          </div>
        </div>

        {/* Top cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-primary/80 border border-[#66666625] rounded-3xl p-5">
            <p className="text-ascent-2 text-sm">Budget</p>
            <p className="text-ascent-1 text-xl font-bold mt-1">{project.budget}</p>
          </div>
          <div className="bg-primary/80 border border-[#66666625] rounded-3xl p-5">
            <p className="text-ascent-2 text-sm">Duration</p>
            <p className="text-ascent-1 text-xl font-bold mt-1">{project.duration}</p>
          </div>
          <div className="bg-primary/80 border border-[#66666625] rounded-3xl p-5">
            <p className="text-ascent-2 text-sm">Level</p>
            <p className="text-ascent-1 text-xl font-bold mt-1">{project.level}</p>
          </div>
        </div>

        {/* Main layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-primary/80 border border-[#66666625] rounded-3xl p-5">
              <h2 className="text-ascent-1 text-lg font-semibold">Problem</h2>
              <p className="text-ascent-2 mt-2">{project.problem}</p>
            </div>

            <div className="bg-primary/80 border border-[#66666625] rounded-3xl p-5">
              <h2 className="text-ascent-1 text-lg font-semibold">Features</h2>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-ascent-2">
                    <BsCheck2Circle className="text-blue mt-1" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/80 border border-[#66666625] rounded-3xl p-5">
              <h2 className="text-ascent-1 text-lg font-semibold">Tech Stack</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border border-[#66666625] bg-bgColor/30 text-ascent-2"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.screenshots?.length > 0 && (
              <div className="bg-primary/80 border border-[#66666625] rounded-3xl p-5">
                <h2 className="text-ascent-1 text-lg font-semibold">Screenshots</h2>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.screenshots.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="screenshot"
                      className="w-full h-48 object-cover rounded-2xl border border-[#66666625]"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Developers + Premium */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Developers */}
            <div className="bg-primary/85 border border-[#66666625] rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-ascent-1 text-lg font-semibold">Developers</h2>
                <span className="text-xs text-ascent-2">
                  {project.developers.length} listed
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                {project.developers.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-2xl border border-[#66666620] bg-bgColor/25 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-ascent-1 font-bold">{d.name}</p>
                        <p className="text-ascent-2 text-sm">{d.role}</p>
                        <p className="text-ascent-2 text-xs mt-1">{d.location}</p>
                      </div>

                      <span className="text-xs px-3 py-1 rounded-full border border-[#66666625] bg-primary/60 text-ascent-2 inline-flex items-center gap-1">
                        <RiSparkling2Fill className="text-blue" />
                        Premium contact
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {d.skills.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1 rounded-full border border-[#66666625] bg-primary/60 text-ascent-2"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Contact */}
                    <div className="mt-4 rounded-xl border border-[#66666620] bg-primary/60 p-3">
                      {premium ? (
                        <div className="text-sm text-ascent-2 flex flex-col gap-1">
                          <span>
                            <b className="text-ascent-1">Phone:</b>{" "}
                            {d.premiumContact.phone}
                          </span>
                          <span>
                            <b className="text-ascent-1">Email:</b>{" "}
                            {d.premiumContact.email}
                          </span>
                          <div className="flex gap-2 mt-2">
                            <a
                              href={d.premiumContact.whatsapp}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 rounded-xl bg-[#0444a4] text-white text-xs font-semibold"
                            >
                              WhatsApp
                            </a>
                            <a
                              href={d.premiumContact.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 rounded-xl border border-[#66666635] text-ascent-1 text-xs font-semibold"
                            >
                              LinkedIn
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-ascent-2 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <BsLockFill className="text-blue" />
                            <span>Direct contact is locked</span>
                          </div>
                          <Link
                            to="/premium"
                            className="px-3 py-2 rounded-xl bg-[#0444a4] text-white text-xs font-semibold"
                          >
                            Unlock
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            <div className="bg-primary/85 border border-[#66666625] rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-ascent-1 text-lg font-semibold">Premium Features</h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    premium
                      ? "border-[#2ba15055] bg-[#2ba15010] text-[#2ba150fe]"
                      : "border-[#66666625] bg-bgColor/25 text-ascent-2"
                  }`}
                >
                  {premium ? "Active" : "Locked"}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {premiumFeatures.map((x) => (
                  <div key={x} className="flex items-start gap-2 text-ascent-2">
                    <BsCheck2Circle className="text-blue mt-1" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>

              {!premium && (
                <Link
                  to="/premium"
                  className="mt-5 w-full inline-flex justify-center py-3 rounded-2xl bg-[#0444a4] text-white font-semibold"
                >
                  Buy Premium to Unlock All
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;