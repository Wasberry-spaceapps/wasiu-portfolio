import React, { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  User,
  Settings2,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Code2,
  Mail,
  RotateCcw,
  Inbox,
  Check,
  Eye,
  Menu,
  Save,
  Sparkles
} from "lucide-react";
import { PortfolioData, UserProfile, Skill, Project, Experience, Inquiry } from "../types";

interface EditorPanelProps {
  data: PortfolioData;
  inquiries: Inquiry[];
  onDataUpdate: (newData: PortfolioData) => void;
  onInquiriesUpdate: (newInquiries: Inquiry[]) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function EditorPanel({
  data,
  inquiries,
  onDataUpdate,
  onInquiriesUpdate,
  onClose,
  onReset,
}: EditorPanelProps) {
  const [activeTab, setActiveTab ] = useState<"profile" | "layout" | "skills" | "projects" | "experience" | "inbox">("profile");

  const handleExportData = () => {
    const cleanData = {
      profile: data.profile,
      skills: data.skills,
      projects: data.projects,
      experiences: data.experiences,
      sectionsVisibility: data.sectionsVisibility || {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        contact: true
      }
    };
    
    const fileContent = `import { PortfolioData } from "./types";

export const initialPortfolioData: PortfolioData = ${JSON.stringify(cleanData, null, 2)};
`;

    const blob = new Blob([fileContent], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "initialData.ts";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper selectors for inline additions
  const [newSkill, setNewSkill] = useState({ name: "", category: "Frontend", proficiency: 85 });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "Web Application",
    techStack: "",
    demoUrl: "",
    sourceUrl: "",
    imageUrl: "",
    featured: false,
  });
  const [newExp, setNewExp] = useState({
    company: "",
    role: "",
    duration: "",
    location: "",
    bullets: "",
    type: "work" as "work" | "education",
  });

  // State handles mapping profile changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onDataUpdate({
      ...data,
      profile: {
        ...data.profile,
        [name]: value,
      },
    });
  };

  // SKILLS ACTIONS
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    const item: Skill = {
      id: "skill-" + Date.now(),
      category: newSkill.category,
      name: newSkill.name,
      proficiency: newSkill.proficiency,
    };
    onDataUpdate({
      ...data,
      skills: [...data.skills, item],
    });
    setNewSkill({ name: "", category: "Frontend", proficiency: 85 });
  };

  const handleDeleteSkill = (id: string) => {
    onDataUpdate({
      ...data,
      skills: data.skills.filter((sk) => sk.id !== id),
    });
  };

  const handleSkillProficiencyChange = (id: string, value: number) => {
    onDataUpdate({
      ...data,
      skills: data.skills.map((sk) => (sk.id === id ? { ...sk, proficiency: value } : sk)),
    });
  };

  // PROJECTS ACTIONS
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    const item: Project = {
      id: "project-" + Date.now(),
      title: newProject.title,
      description: newProject.description,
      longDescription: newProject.longDescription,
      category: newProject.category,
      techStack: newProject.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      demoUrl: newProject.demoUrl || undefined,
      sourceUrl: newProject.sourceUrl || undefined,
      imageUrl: newProject.imageUrl || undefined,
      featured: newProject.featured,
    };
    onDataUpdate({
      ...data,
      projects: [...data.projects, item],
    });
    setNewProject({
      title: "",
      description: "",
      longDescription: "",
      category: "Web Application",
      techStack: "",
      demoUrl: "",
      sourceUrl: "",
      imageUrl: "",
      featured: false,
    });
  };

  const handleDeleteProject = (id: string) => {
    onDataUpdate({
      ...data,
      projects: data.projects.filter((pr) => pr.id !== id),
    });
  };

  // EXPERIENCE ACTIONS
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.company || !newExp.role || !newExp.duration) return;
    const item: Experience = {
      id: "exp-" + Date.now(),
      company: newExp.company,
      role: newExp.role,
      duration: newExp.duration,
      location: newExp.location || undefined,
      description: newExp.bullets.split("\n").map((b) => b.trim()).filter(Boolean),
      type: newExp.type,
    };
    onDataUpdate({
      ...data,
      experiences: [...data.experiences, item],
    });
    setNewExp({
      company: "",
      role: "",
      duration: "",
      location: "",
      bullets: "",
      type: "work",
    });
  };

  const handleDeleteExperience = (id: string) => {
    onDataUpdate({
      ...data,
      experiences: data.experiences.filter((ex) => ex.id !== id),
    });
  };

  // INBOX ACTIONS
  const handleMarkAsRead = (id: string) => {
    onInquiriesUpdate(
      inquiries.map((inq) => (inq.id === id ? { ...inq, read: true } : inq))
    );
  };

  const handleDeleteInquiry = (id: string) => {
    onInquiriesUpdate(inquiries.filter((inq) => inq.id !== id));
  };

  const handleMarkAllRead = () => {
    onInquiriesUpdate(inquiries.map((inq) => ({ ...inq, read: true })));
  };

  const handleClearAllInquiries = () => {
    onInquiriesUpdate([]);
  };

  const unreadCount = inquiries.filter((inq) => !inq.read).length;

  return (
    <div
      id="customizer-panel-drawer"
      className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-2xl bg-white shadow-2xl flex flex-col border-l border-zinc-200"
    >
      {/* Panel Sticky Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
        <div className="flex items-center gap-2">
          <Settings2 size={18} className="text-zinc-900" />
          <h2 className="font-display font-bold text-zinc-900 tracking-tight text-base sm:text-lg">
            Site Personalizer & Inbox
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="panel-reset-defaults-btn"
            onClick={() => {
              if (window.confirm("Restore premium baseline default developer data? This overrides any custom inputs.")) {
                onReset();
              }
            }}
            title="Restore Defaults"
            className="p-1.5 text-zinc-500 hover:text-[#e11d48] hover:bg-zinc-100 rounded-md transition-colors"
          >
            <RotateCcw size={16} />
          </button>
          <button
            id="panel-close-btn"
            onClick={onClose}
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Configuration Tabs Menu Scrollable horizontally on small screen */}
      <div className="flex bg-white border-b border-zinc-100 overflow-x-auto select-none no-scrollbar shrink-0">
        {[
          { key: "profile", label: "Profile", icon: <User size={14} /> },
          { key: "layout", label: "Layout & Deletions", icon: <Eye size={14} /> },
          { key: "skills", label: "Skills", icon: <Code2 size={14} /> },
          { key: "projects", label: "Projects", icon: <Settings2 size={14} /> },
          { key: "experience", label: "History", icon: <Briefcase size={14} /> },
          {
            key: "inbox",
            label: "Inbox",
            icon: <Inbox size={14} />,
            badge: unreadCount > 0 ? unreadCount : undefined,
          },
        ].map((tab) => (
          <button
            id={`tab-btn-${tab.key}`}
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-1.5 px-5 py-3 border-b-2 text-xs font-semibold tracking-tight cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "border-zinc-900 text-zinc-900 bg-zinc-50/50"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 bg-zinc-900 text-white rounded-full text-[9px] font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Configurations Fields Block Scroll Area */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-8">
        
        {/* TAB 1: USER PROFILE FORM */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-6">
            <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase">
              Core Identity Specs
            </h3>

            {/* Brand Logo & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Logo Brand Term</label>
                <input
                  type="text"
                  name="brandName"
                  value={data.profile.brandName || ""}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                  placeholder="Wasiu.M"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">My Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.profile.name}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            {/* Job Title & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Engineering Role</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={data.profile.jobTitle}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Base Coordinates</label>
                <input
                  type="text"
                  name="location"
                  value={data.profile.location}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Contact coordinates</label>
                <input
                  type="email"
                  name="email"
                  value={data.profile.email}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Direct Phone Line</label>
                <input
                  type="text"
                  name="phone"
                  value={data.profile.phone || ""}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                  placeholder="+44 (0) 7700..."
                />
              </div>
            </div>

            {/* Brief Pitch and Narrative Statement */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Pitch Introduction</label>
              <input
                type="text"
                name="subTitle"
                value={data.profile.subTitle}
                onChange={handleProfileChange}
                className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
              />
            </div>

            {/* Biography narrative */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Detailed Philosophy narrative</label>
              <textarea
                name="aboutText"
                rows={5}
                value={data.profile.aboutText}
                onChange={handleProfileChange}
                className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900 resize-none font-sans leading-relaxed"
              />
            </div>

            {/* Custom Section & Card Headings */}
            <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase pt-4 border-t border-zinc-55/10">
              Customizable Card & Headings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Graphic Book/Card Title</label>
                <input
                  type="text"
                  name="cardBookTitle"
                  value={data.profile.cardBookTitle || ""}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                  placeholder="Portfolio"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Skills Section Header</label>
                <input
                  type="text"
                  name="headingSkills"
                  value={data.profile.headingSkills || ""}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                  placeholder="Skills"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Graphic Card Quote</label>
                <input
                  type="text"
                  name="cardBookQuote"
                  value={data.profile.cardBookQuote || ""}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                  placeholder="A"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-550 font-semibold uppercase">Graphic Card Quote Author</label>
                <input
                  type="text"
                  name="cardBookQuoteAuthor"
                  value={data.profile.cardBookQuoteAuthor || ""}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                  placeholder="— W. M., Scholar Notes"
                />
              </div>
            </div>

            {/* Social handles */}
            <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase pt-4 border-t border-zinc-55/10">
              External Social links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-500">GitHub Link</label>
                <input
                  type="text"
                  name="github"
                  value={data.profile.github}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-xs border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-950"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-500">LinkedIn Link</label>
                <input
                  type="text"
                  name="linkedin"
                  value={data.profile.linkedin}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-xs border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-950"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-zinc-500">Twitter Link</label>
                <input
                  type="text"
                  name="twitter"
                  value={data.profile.twitter || ""}
                  onChange={handleProfileChange}
                  className="px-3 py-1.5 text-xs border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-950"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: SECTION DELETIONS & TOGGLES */}
        {activeTab === "layout" && (
          <div className="flex flex-col gap-6">
            <h3 className="font-display font-bold text-sm tracking-widest text-[#2E2C29] uppercase">
              Sections Display & Deletions
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed -mt-4 font-sans">
              Control which sections appear on your live site. Toggle a section <strong className="text-red-500 font-bold">OFF to delete/hide</strong> it from the page DOM. These state flags will persist inside your site localstorage export.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "hero", label: "Introduction Banner (Hero Section)", desc: "Main entry point, greetings text, social links, and the 3D specimen graphic." },
                { key: "about", label: "About & Essences (Biography Section)", desc: "Literary philosophy narrative, reading desk graphic, and scholarly values cards." },
                { key: "skills", label: "Skills & Competency Matrix", desc: "Categorized skills bars tracking research, editorial, and digital proficiencies." },
                { key: "projects", label: "Project Case Studies Catalog", desc: "Showcases research archives, monographs, acoustic text systems, and interactive previews." },
                { key: "experience", label: "Timeline / Trajectory Records", desc: "Chronicles academic background, past workspace directories, fellowships, and study nodes." },
                { key: "contact", label: "Get in Touch (Contact Section)", desc: "Direct inquiries submission box and email/coordinates metadata card." }
              ].map((section) => {
                const isVisible = data.sectionsVisibility?.[section.key as keyof typeof data.sectionsVisibility] ?? true;
                return (
                  <div key={section.key} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col justify-between gap-3 shadow-3xs hover:border-[#4E5B4F]/40 transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-zinc-950">{section.label}</span>
                      <p className="text-[10.5px] text-zinc-500 leading-normal">{section.desc}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-zinc-200 pt-2.5">
                      <span className={`text-[10px] font-mono font-bold ${isVisible ? "text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100" : "text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200"}`}>
                        {isVisible ? "● ACTIVE DISPLAY" : "○ DELETED/HIDDEN"}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentVisibility = data.sectionsVisibility || {
                            hero: true,
                            about: true,
                            skills: true,
                            projects: true,
                            experience: true,
                            contact: true
                          };
                          const newVisibility = {
                            ...currentVisibility,
                            [section.key]: !isVisible
                          };
                          onDataUpdate({
                            ...data,
                            sectionsVisibility: newVisibility
                          });
                        }}
                        className={`px-3 py-1 text-[11px] font-mono font-extrabold rounded-full transition-all border shrink-0 cursor-pointer ${
                          isVisible
                            ? "bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800"
                            : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-100"
                        }`}
                      >
                        {isVisible ? "Delete Section" : "Restore Section"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Premium Deployment & Packaging Exporter Card */}
            <div className="p-5 bg-amber-50/75 border border-[#4E5B4F]/15 rounded-xl flex flex-col gap-3 mt-4">
              <span className="text-xs font-bold text-[#2E2C29] flex items-center gap-1.5 font-sans">
                <Sparkles size={14} className="text-amber-700 animate-pulse" />
                Durable static serialization for wasiu.tech (GitHub Pages)
              </span>
              <p className="text-[11.5px] text-zinc-700 leading-relaxed font-sans">
                Your alterations are currently saved in your browser's persistent sandbox. To merge these updates permanently into your codebase for deployment on GitHub Pages (<strong className="text-zinc-900">wasiu.tech</strong>):
              </p>
              <div className="flex flex-col gap-2 pl-1 bg-white/40 p-3 rounded-lg border border-amber-200/40">
                {[
                  "Click 'Export initialData.ts' to compile your customized text, skills, experiences, and layouts.",
                  "Drop the downloaded 'initialData.ts' directly into your local codebase mapping: /src/initialData.ts.",
                  "Package the production bundle by running the terminal build order: npm run build.",
                  "Take all output files from your local /dist/ folder and commit/push them directly to the main root of your GitHub Pages branch!"
                ].map((step, sIdx) => (
                  <div key={sIdx} className="flex gap-2 items-start text-[11px] text-zinc-700 font-sans leading-normal">
                    <span className="font-mono font-extrabold text-[#4E5B4F]/90 bg-[#FAF6EE] border border-[#E5DDD0] w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px]">{sIdx + 1}</span>
                    <span className="pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 items-center border-t border-amber-200/50 pt-3.5 mt-1">
                <button
                  type="button"
                  onClick={handleExportData}
                  className="px-4.5 py-2 bg-[#2E2C29] hover:bg-[#3E3A35] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#E5DDD0]/15 shadow-sm active:scale-95"
                >
                  <Save size={13} />
                  <span>Export initialData.ts</span>
                </button>
                <span className="text-[10px] text-zinc-500 italic font-mono">
                  *Self-contained dataset ready for static binding.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TECH SKILLS CONSOLE */}
        {activeTab === "skills" && (
          <div className="flex flex-col gap-6">
            {/* Add New Skill Form */}
            <form onSubmit={handleAddSkill} className="flex flex-col gap-4 p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
              <span className="text-[11px] font-mono tracking-wider font-semibold text-zinc-900 uppercase">Register New Competency</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Skill Title</label>
                  <input
                    type="text"
                    required
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="e.g. Next.js, Docker, Kubernetes"
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Category</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none h-[30px]"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Tools & DevOps">Tools & DevOps</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-grow flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                    <span>Proficiency Index</span>
                    <span>{newSkill.proficiency}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={newSkill.proficiency}
                    onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                    className="w-full accent-zinc-900 h-1 bg-zinc-200 rounded-lg cursor-pointer"
                  />
                </div>

                <button
                  id="add-skill-button"
                  type="submit"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  <Plus size={11} /> Add Skill
                </button>
              </div>
            </form>

            {/* List and Modify Current Skillsets */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase">
                Active Skill Inventory
              </h3>

              <div className="flex flex-col gap-4 divide-y divide-zinc-150">
                {data.skills.map((sk) => (
                  <div key={sk.id} className="flex flex-col gap-2 pt-3 first:pt-0 bg-zinc-50/45 p-3 rounded-lg border border-zinc-150">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-grow">
                        <input
                          type="text"
                          value={sk.name}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              skills: data.skills.map((s) => s.id === sk.id ? { ...s, name: e.target.value } : s)
                            });
                          }}
                          className="px-2 py-1 text-xs font-bold text-zinc-900 border border-zinc-200 focus:border-zinc-900 bg-white rounded focus:outline-none flex-grow"
                        />
                        <select
                          value={sk.category}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              skills: data.skills.map((s) => s.id === sk.id ? { ...s, category: e.target.value } : s)
                            });
                          }}
                          className="px-2 py-1 text-[10px] font-mono text-zinc-500 border border-zinc-200 bg-white rounded focus:outline-none"
                        >
                          <option value="Scholarship">Scholarship</option>
                          <option value="Digital Methods">Digital Methods</option>
                          <option value="Editorial & Craft">Editorial & Craft</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Tools & DevOps">Tools & DevOps</option>
                        </select>
                      </div>
                      <button
                        id={`delete-skill-${sk.id}`}
                        onClick={() => handleDeleteSkill(sk.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
                        title="Delete Skill"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={sk.proficiency || 80}
                        onChange={(e) => handleSkillProficiencyChange(sk.id, parseInt(e.target.value))}
                        className="flex-grow accent-zinc-850 h-1 bg-zinc-100 rounded-lg cursor-pointer"
                      />
                      <span className="text-[11px] font-mono text-zinc-500 w-8 text-right shrink-0 font-bold">
                        {sk.proficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS INCUBATOR */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-6">
            {/* Add New Case Study Form */}
            <form onSubmit={handleAddProject} className="flex flex-col gap-4 p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
              <span className="text-[11px] font-mono tracking-wider font-semibold text-zinc-900 uppercase">Deploy Project Study</span>
              
              {/* Project Title and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder="OmniChannel App"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Filter Category</label>
                  <input
                    type="text"
                    required
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder="Web Application"
                  />
                </div>
              </div>

              {/* Stack Comma Separated */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-zinc-400">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                  placeholder="React, TypeScript, Recharts, Express"
                />
              </div>

              {/* Demo URL & source links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Live Demo URL</label>
                  <input
                    type="url"
                    value={newProject.demoUrl}
                    onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder="https://example.com/demo"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Code Source Repository URL</label>
                  <input
                    type="url"
                    value={newProject.sourceUrl}
                    onChange={(e) => setNewProject({ ...newProject, sourceUrl: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Graphics placeholder image */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-zinc-400">Showcase Image URL</label>
                <input
                  type="url"
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                  className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-zinc-400">Quick Description Summary</label>
                <input
                  type="text"
                  required
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                  placeholder="Aggregates customers tracking coordinates in real time."
                />
              </div>

              {/* Extended Case Study Description */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-zinc-400">Extended Case Study Details (Paragraphs)</label>
                <textarea
                  rows={3}
                  value={newProject.longDescription}
                  onChange={(e) => setNewProject({ ...newProject, longDescription: e.target.value })}
                  className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none resize-none"
                  placeholder="This analytical platform aggregates conversion funnels..."
                />
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                    className="rounded text-zinc-900 focus:ring-zinc-900 border-zinc-300 pointer-events-auto"
                  />
                  <span className="text-[12px] font-semibold text-zinc-700">Tag as Featured Project</span>
                </label>

                <button
                  id="add-project-button"
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold cursor-pointer"
                >
                  <Plus size={11} /> Deploy Project
                </button>
              </div>
            </form>

            {/* List Current Projects */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase">
                Active Projects Catalog
              </h3>

              <div className="flex flex-col gap-5">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex flex-col gap-3 p-4 border border-zinc-200 rounded-xl bg-zinc-50/30 hover:bg-zinc-50/70 transition-colors animate-fadeIn"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-grow flex flex-col gap-1">
                        <label className="text-[9px] font-mono text-zinc-400 font-bold uppercase">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              projects: data.projects.map((p) => p.id === proj.id ? { ...p, title: e.target.value } : p)
                            });
                          }}
                          className="px-2 py-0.5 text-xs font-bold text-zinc-900 border border-zinc-200 focus:border-zinc-900 bg-white rounded focus:outline-none w-full"
                        />
                      </div>
                      <button
                        id={`delete-project-${proj.id}`}
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 mt-4 text-zinc-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded transition-colors cursor-pointer shrink-0"
                        title="Delete Project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] font-mono text-zinc-450 uppercase">Category Tag</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              projects: data.projects.map((p) => p.id === proj.id ? { ...p, category: e.target.value } : p)
                            });
                          }}
                          className="px-1.5 py-0.5 text-[10.5px] leading-tight text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] font-mono text-zinc-450 uppercase">Tech Stack (comma split)</label>
                        <input
                          type="text"
                          value={proj.techStack.join(", ")}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              projects: data.projects.map((p) => p.id === proj.id ? { ...p, techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } : p)
                            });
                          }}
                          className="px-1.5 py-0.5 text-[10.5px] leading-tight font-mono text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] font-mono text-zinc-450 uppercase">Tagline / Short description</label>
                      <input
                        type="text"
                        value={proj.description}
                        onChange={(e) => {
                          onDataUpdate({
                            ...data,
                            projects: data.projects.map((p) => p.id === proj.id ? { ...p, description: e.target.value } : p)
                          });
                        }}
                        className="px-1.5 py-0.5 text-[11px] text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white focus:outline-none w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] font-mono text-zinc-450 uppercase">Extended Case Study Details</label>
                      <textarea
                        rows={2}
                        value={proj.longDescription || ""}
                        onChange={(e) => {
                          onDataUpdate({
                            ...data,
                            projects: data.projects.map((p) => p.id === proj.id ? { ...p, longDescription: e.target.value } : p)
                          });
                        }}
                        className="px-1.5 py-1 text-[10.5px] text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white resize-none focus:outline-none w-full leading-normal"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] font-mono text-zinc-450 uppercase">Live Custom Demo Link</label>
                        <input
                          type="text"
                          value={proj.demoUrl || ""}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              projects: data.projects.map((p) => p.id === proj.id ? { ...p, demoUrl: e.target.value || undefined } : p)
                            });
                          }}
                          className="px-1.5 py-0.5 text-[10px] text-zinc-700 border border-[#E5DDD0] rounded focus:border-zinc-900 bg-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] font-mono text-zinc-450 uppercase">Showcase Image URL</label>
                        <input
                          type="text"
                          value={proj.imageUrl || ""}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              projects: data.projects.map((p) => p.id === proj.id ? { ...p, imageUrl: e.target.value || undefined } : p)
                            });
                          }}
                          className="px-1.5 py-0.5 text-[10px] text-zinc-700 border border-[#E5DDD0] rounded focus:border-zinc-900 bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MILESTONES HISTORY */}
        {activeTab === "experience" && (
          <div className="flex flex-col gap-6">
            {/* Add New Milestone Form */}
            <form onSubmit={handleAddExperience} className="flex flex-col gap-4 p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
              <span className="text-[11px] font-mono tracking-wider font-semibold text-zinc-900 uppercase">Log Milestone Node</span>
              
              {/* Type Switch / Work or School */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewExp({ ...newExp, type: "work" })}
                  className={`py-1 rounded text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${
                    newExp.type === "work"
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  <Briefcase size={11} /> Work Role
                </button>
                <button
                  type="button"
                  onClick={() => setNewExp({ ...newExp, type: "education" })}
                  className={`py-1 rounded text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${
                    newExp.type === "education"
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  <GraduationCap size={11} /> Education Track
                </button>
              </div>

              {/* Company & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">
                    {newExp.type === "work" ? "Company / Agency" : "University / School"}
                  </label>
                  <input
                    type="text"
                    required
                    value={newExp.company}
                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder={newExp.type === "work" ? "InnovateTech Solutions" : "University of Birmingham"}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">
                    {newExp.type === "work" ? "Active Role Title" : "Degree / Course Title"}
                  </label>
                  <input
                    type="text"
                    required
                    value={newExp.role}
                    onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder={newExp.type === "work" ? "Lead Full-Stack Engineer" : "B.Sc. in Computer Science"}
                  />
                </div>
              </div>

              {/* Duration & Location coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Duration Range</label>
                  <input
                    type="text"
                    required
                    value={newExp.duration}
                    onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder="e.g. 2023 - Present"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-zinc-400">Physical Location</label>
                  <input
                    type="text"
                    value={newExp.location}
                    onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                    className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none"
                    placeholder="London, UK (Hybrid)"
                  />
                </div>
              </div>

              {/* Achievements details lines */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-zinc-400">Achievements Bullets (One per line)</label>
                <textarea
                  rows={3}
                  required
                  value={newExp.bullets}
                  onChange={(e) => setNewExp({ ...newExp, bullets: e.target.value })}
                  className="px-3 py-1.5 text-xs border bg-white border-zinc-250 rounded focus:outline-none resize-none"
                  placeholder="Architected mission-critical React apps.&#10;Mentored 5 junior developers.&#10;Reduced deployment logs latency by 12%."
                />
              </div>

              <button
                id="add-milestone-button"
                type="submit"
                className="flex items-center justify-center gap-1.5 px-4 py-2 mt-1 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold cursor-pointer text-center sm:self-end"
              >
                <Plus size={11} /> Register Milestone Node
              </button>
            </form>

            {/* List current History */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase">
                Active Trajectory Timeline
              </h3>

              <div className="flex flex-col gap-5">
                {data.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex flex-col gap-3 p-4 border border-zinc-200 rounded-xl bg-zinc-50/30 hover:bg-zinc-50/70 transition-colors"
                  >
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex-grow flex flex-col gap-1">
                        <label className="text-[9px] font-mono text-zinc-450 uppercase font-bold">Milestone Title / Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              experiences: data.experiences.map((ex) => ex.id === exp.id ? { ...ex, role: e.target.value } : ex)
                            });
                          }}
                          className="px-2 py-0.5 text-xs font-bold text-zinc-900 border border-zinc-200 focus:border-zinc-900 bg-white rounded focus:outline-none w-full"
                        />
                      </div>
                      <button
                        id={`delete-milestone-${exp.id}`}
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="p-1.5 mt-4 text-zinc-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded transition-colors cursor-pointer shrink-0"
                        title="Delete Milestone"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] font-mono text-[#7A7366]">Institution / Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              experiences: data.experiences.map((ex) => ex.id === exp.id ? { ...ex, company: e.target.value } : ex)
                            });
                          }}
                          className="px-1.5 py-0.5 text-[10.5px] text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] font-mono text-[#7A7366]">Duration Period</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              experiences: data.experiences.map((ex) => ex.id === exp.id ? { ...ex, duration: e.target.value } : ex)
                            });
                          }}
                          className="px-1.5 py-0.5 text-[10.5px] font-mono text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] font-mono text-[#7A7366]">Milestone Type</label>
                        <select
                          value={exp.type}
                          onChange={(e) => {
                            onDataUpdate({
                              ...data,
                              experiences: data.experiences.map((ex) => ex.id === exp.id ? { ...ex, type: e.target.value as any } : ex)
                            });
                          }}
                          className="px-1.5 py-1 text-[10.5px] font-sans text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white focus:outline-none"
                        >
                          <option value="work">Work Role</option>
                          <option value="education">Education Track</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] font-mono text-[#7A7366] ">Physical Coordinates</label>
                      <input
                        type="text"
                        value={exp.location || ""}
                        onChange={(e) => {
                          onDataUpdate({
                            ...data,
                            experiences: data.experiences.map((ex) => ex.id === exp.id ? { ...ex, location: e.target.value || undefined } : ex)
                          });
                        }}
                        className="px-1.5 py-0.5 text-[10px] text-zinc-700 border border-zinc-200 rounded focus:border-zinc-900 bg-white focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] font-mono text-[#7A7366] ">Achievements Bullets (newline split)</label>
                      <textarea
                        rows={2}
                        value={exp.description.join("\n")}
                        onChange={(e) => {
                          onDataUpdate({
                            ...data,
                            experiences: data.experiences.map((ex) => ex.id === exp.id ? { ...ex, description: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) } : ex)
                          });
                        }}
                        className="px-1.5 py-1 text-[10.5px] text-zinc-650 border border-zinc-200 rounded focus:border-zinc-900 bg-white resize-none focus:outline-none w-full leading-normal"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INCOMING MESSAGES INBOX */}
        {activeTab === "inbox" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase">
                Inbox Management
              </h3>
              
              {inquiries.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    id="inbox-mark-all-read"
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 px-2 py-1 hover:bg-zinc-100 rounded transition-colors cursor-pointer"
                  >
                    Mark All Read
                  </button>
                  <button
                    id="inbox-clear-all"
                    onClick={() => {
                      if (window.confirm("Permantely clear entire received inquiries inbox logs?")) {
                        handleClearAllInquiries();
                      }
                    }}
                    className="text-[11px] font-semibold text-red-500 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  >
                    Purge Inbox
                  </button>
                </div>
              )}
            </div>

            {/* Inboxes Message List */}
            <div className="flex flex-col gap-4">
              {inquiries.length === 0 ? (
                <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 flex flex-col items-center gap-3">
                  <Inbox className="text-zinc-300" size={32} />
                  <p className="text-zinc-400 text-xs sm:text-sm">Inbox is empty. No contact requests logged.</p>
                  <span className="text-[11px] text-zinc-350">
                    Use the contact form below to test saving inquiries!
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {inquiries.map((inq) => (
                    <div
                      id={`inquiry-message-${inq.id}`}
                      key={inq.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col gap-3 relative ${
                        inq.read
                          ? "bg-white border-zinc-150 shadow-2xs opacity-85"
                          : "bg-emerald-50/20 border-emerald-100 shadow-xs"
                      }`}
                    >
                      {/* Read status dot indicator */}
                      {!inq.read && (
                        <div className="absolute top-5 right-5 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      )}

                      {/* Header Info */}
                      <div className="flex flex-col gap-1 pr-6 border-b border-zinc-100 pb-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-zinc-900">{inq.name}</span>
                          <span className="text-[10px] font-mono text-zinc-400">({inq.email})</span>
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-700 tracking-tight">
                          Subject: {inq.subject}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400 mt-1">{inq.date}</span>
                      </div>

                      {/* Message Content */}
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans italic bg-zinc-50 p-2.5 rounded-md border text-zinc-550 border-zinc-100">
                        "{inq.message}"
                      </p>

                      {/* Controller Actions */}
                      <div className="flex items-center justify-end gap-3 pt-1">
                        {!inq.read && (
                          <button
                            id={`mark-read-btn-${inq.id}`}
                            onClick={() => handleMarkAsRead(inq.id)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-0.5 rounded cursor-pointer"
                          >
                            <Check size={12} /> Mark Read
                          </button>
                        )}
                        <button
                          id={`delete-inq-btn-${inq.id}`}
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-red-500 hover:bg-zinc-100 px-2 py-0.5 rounded cursor-pointer"
                        >
                          <Trash2 size={12} /> Delete Log
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Persistent Static Actions Footer */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row gap-3 sm:items-center justify-between select-none shrink-0">
        <span className="text-[10px] font-mono text-zinc-400">
          *All alterations persist in browser storage.
        </span>
        <div className="flex items-center gap-2">
          <button
            id="panel-btn-export-data"
            type="button"
            onClick={handleExportData}
            title="Download initialData.ts with all current custom inputs"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FAF6EE] hover:bg-[#EBE5D8] text-[#2E2C29] border border-[#E5DDD0] rounded-md text-xs font-bold cursor-pointer transition-all shadow-2xs active:scale-95 text-center"
          >
            <Save size={13} />
            <span>Export for GitHub</span>
          </button>
          <button
            id="panel-btn-close-and-save"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold cursor-pointer shadow-xs border border-zinc-900 active:scale-95 text-center"
          >
            <Check size={13} />
            <span>Close Workspace</span>
          </button>
        </div>
      </div>
    </div>
  );
}
