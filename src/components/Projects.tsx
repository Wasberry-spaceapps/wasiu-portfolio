import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { Sparkles, ExternalLink, Github, X, Eye } from "lucide-react";
import { TiltContainer } from "./ThreeDInteraction";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#FAF6EE] border-t border-[#E5DDD0] relative overflow-hidden">
      {/* Absolute Decorative Geometric Grids */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none">
        <div className="absolute top-[20%] left-[5%] w-[800px] h-[800px] border border-stone-850 rounded-full animate-[spin_320s_linear_infinite]"></div>
        <div className="absolute top-[50%] right-[3%] w-[500px] h-[500px] border border-stone-850 rotate-45"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-mono tracking-widest text-[#7A7366] uppercase flex items-center gap-1.5 font-bold">
              <Sparkles size={11} className="text-[#7A7366] animate-pulse" />
              03 / Selected Works
            </span>
            <div className="w-16 h-[2.5px] bg-[#4E5B4F] mt-1.5"></div>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                id={`filter-btn-${category.toLowerCase().replace(/\s+/g, "-")}`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 text-xs sm:text-sm font-bold tracking-tight rounded-full transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#2E2C29] text-white shadow-md scale-102"
                    : "bg-[#EBE5D8] text-[#5D574F] hover:bg-[#DDD5C5] hover:scale-102"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Tilt on Mouse-Move */}
        <motion.div
          id="projects-grid"
          layout
          className="flex flex-col gap-8 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <TiltContainer
                key={project.id}
                id={`project-card-container-${project.id}`}
                className="w-full"
                maxTiltX={4}
                maxTiltY={4}
                scale={1.01}
              >
                <div
                  id={`project-card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-[#FBF9F4] border border-[#E5DDD0] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#4E5B4F] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 min-h-[200px] w-full"
                >
                  {/* Project Image Panel */}
                  <div className="md:col-span-5 relative overflow-hidden bg-[#FAF6EE] border-b md:border-b-0 md:border-r border-[#E5DDD0] aspect-video md:aspect-auto">
                    <img
                      src={project.imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out group-hover:scale-103"
                    />
                    
                    {/* Dark glass cover */}
                    <div className="absolute inset-0 bg-[#7A6354]/10 group-hover:bg-[#7A6354]/0 transition-colors duration-300"></div>
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="flex items-center gap-1.5 bg-[#FBF9F4]/95 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-[#2E2C29] shadow-md border border-[#E5DDD0]">
                        <Eye size={13} className="text-[#4E5B4F]" />
                        View Project Details
                      </span>
                    </div>

                    {project.featured && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold tracking-tight bg-[#4E5B4F]/90 backdrop-blur-xs text-white rounded">
                        FEATURED SELECTION
                      </span>
                    )}

                    <span className="absolute bottom-4 right-4 inline-flex items-center px-2 py-0.5 text-xs font-mono tracking-tight bg-[#FBF9F4] border border-[#E5DDD0] rounded text-[#7A7366] font-bold">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Content */}
                  <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-[#FBF9F4] group-hover:bg-[#FCFAF7] transition-all duration-300">
                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#2E2C29] group-hover:text-[#4E5B4F] transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-[#5D574F] text-sm sm:text-base leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer Tags */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-[#E5DDD0]">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-[#EBE5D8]/50 text-[#5D574F] rounded border border-[#E5DDD0]/40 text-xs font-mono font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltContainer>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-[#FBF9F4] rounded-xl border border-dashed border-[#E5DDD0]">
            <p className="text-[#7A7366] text-sm font-medium">No projects found in this archival category.</p>
          </div>
        )}

        {/* Case Study Details Modal: Redesigned and Streamlined */}
        <AnimatePresence>
          {selectedProject && (
            <div
              id="project-detail-modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 text-left"
              role="dialog"
              aria-modal="true"
            >
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#2D2A26]/85 backdrop-blur-xs"
              ></motion.div>

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 20 }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className="relative bg-[#FBF9F4] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#D5CBB8] flex flex-col z-10"
              >
                
                {/* Banner header badge */}
                <div className="bg-[#2E2C29] text-[#EBE5D8] px-6 py-4 flex justify-between items-center border-b border-stone-800">
                  <span className="text-xs font-mono tracking-widest text-[#C5B390] uppercase font-bold flex items-center gap-1.5">
                    <Sparkles size={11} className="text-amber-400 animate-spin" />
                    Project Details
                  </span>
                  <button
                    id="close-modal-btn"
                    onClick={() => setSelectedProject(null)}
                    className="p-1 text-[#EBE5D8] hover:text-white bg-zinc-855 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-6">
                  {/* Photo Banner without slider */}
                  <div className="w-full aspect-[21/9] rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#FAF6EE] relative shadow-inner">
                    <img
                      src={selectedProject.imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Project overview banner details */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#E5DDD0]">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-mono font-bold tracking-widest text-[#7A7366] uppercase">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2E2C29] tracking-tight">
                        {selectedProject.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedProject.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-0.5 text-xs font-mono bg-[#EBE5D8] text-[#5D574F] rounded border border-stone-300/60 font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interactive links on top of the card modal */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      {selectedProject.demoUrl && (
                        <a
                          id="modal-link-demo"
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-tight text-white bg-[#2E2C29] hover:bg-[#3E3A35] rounded-full transition-all shadow-md active:scale-97 cursor-pointer"
                        >
                          <ExternalLink size={13} />
                          <span>
                            {selectedProject.title.includes("YouTube") || selectedProject.title.includes("Video") || selectedProject.title.includes("flashcard")
                              ? "Watch Demo" 
                              : selectedProject.title.includes("blog") || selectedProject.title.includes("Blog") || selectedProject.title.includes("Substack")
                              ? "Read Articles"
                              : selectedProject.title.includes("A+") || selectedProject.title.includes("CompTIA")
                              ? "View Training Course"
                              : selectedProject.title.includes("R programming") || selectedProject.title.includes("R syntax")
                              ? "View CMU Course PDF"
                              : "View Live Project"}
                          </span>
                        </a>
                      )}
                      {selectedProject.sourceUrl && (
                        <a
                          id="modal-link-source"
                          href={selectedProject.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4.5 py-2.5 text-xs font-bold tracking-tight text-[#2E2C29] bg-[#FAF6EE] hover:bg-[#EBE5D8] border border-[#E5DDD0] rounded-full transition-all cursor-pointer hover:scale-103 active:scale-97"
                        >
                          {selectedProject.sourceUrl.includes("github") ? <Github size={13} /> : <ExternalLink size={13} />}
                          <span>
                            {selectedProject.sourceUrl.includes("github") 
                              ? "Source Code"
                              : selectedProject.sourceUrl.includes("google") 
                              ? "View Shared Material" 
                              : selectedProject.sourceUrl.includes("instagram")
                              ? "View Instagram Cut"
                              : selectedProject.sourceUrl.includes("comptia")
                              ? "CompTIA Core-1 Page"
                              : selectedProject.sourceUrl.includes("mega.nz")
                              ? "Codebase Download"
                              : "External Resource"}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Concept & Narrative Details */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-mono tracking-wider text-[#7A7366] uppercase font-bold">
                      Project Narrative & Summary
                    </h4>
                    <p className="text-[#5D574F] text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line leading-relaxed">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>

                    {/* Dedicated micro-actions for Substack links to match your blog project */}
                    {selectedProject.title.toLowerCase().includes("blog") && (
                      <div className="flex flex-col gap-3 mt-4 p-5 bg-[#FAFEEB]/45 border border-[#E5DDD0] rounded-xl">
                        <span className="text-xs font-mono tracking-widest text-[#7A7366] font-bold uppercase border-b border-[#E5DDD0] pb-1.5 mb-1">
                          Featured Substack Essays
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <a 
                            href="https://gracioushope.substack.com/p/be-silent" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-lg hover:border-[#4E5B4F] transition-colors flex flex-col gap-1 text-left"
                          >
                            <span className="text-sm font-bold text-[#2E2C29]">Be Silent</span>
                            <span className="text-xs font-mono text-[#7A7366]">gracioushope.substack.com</span>
                          </a>
                          <a 
                            href="https://gracioushope.substack.com/p/a-brief-history-of-trepanning" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-lg hover:border-[#4E5B4F] transition-colors flex flex-col gap-1 text-left"
                          >
                            <span className="text-sm font-bold text-[#2E2C29]">A Brief History of Trepanning</span>
                            <span className="text-xs font-mono text-[#7A7366]">gracioushope.substack.com</span>
                          </a>
                          <a 
                            href="https://gracioushope.substack.com/p/sweet-biscuit" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-lg hover:border-[#4E5B4F] transition-colors flex flex-col gap-1 text-left"
                          >
                            <span className="text-sm font-bold text-[#2E2C29]">Sweet Biscuit</span>
                            <span className="text-xs font-mono text-[#7A7366]">gracioushope.substack.com</span>
                          </a>
                          <a 
                            href="https://gracioushope.substack.com/p/on-the-importance-of-wisdom" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-lg hover:border-[#4E5B4F] transition-colors flex flex-col gap-1 text-left"
                          >
                            <span className="text-sm font-bold text-[#2E2C29]">On the Importance of Wisdom</span>
                            <span className="text-xs font-mono text-[#7A7366]">on-the-importance-of-wisdom</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Dedicated micro-actions for STEM Program log links */}
                    {selectedProject.title.toLowerCase().includes("stem") && (
                      <div className="flex flex-col gap-3 mt-4 p-5 bg-[#FAFEEB]/45 border border-[#E5DDD0] rounded-xl">
                        <span className="text-xs font-mono tracking-widest text-[#7A7366] font-bold uppercase border-b border-[#E5DDD0] pb-1.5 mb-1">
                          Select Interactive Experiment Documents
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <a 
                            href="https://drive.google.com/file/d/1bAVycxlVpaaYygnHKVMpxOlrQAMVwDi_/view?usp=sharing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-lg hover:border-[#4E5B4F] transition-colors flex flex-col gap-1 text-left"
                          >
                            <span className="text-sm font-bold text-[#2E2C29]">Experiment Video & Files</span>
                            <span className="text-xs font-mono text-[#7A7366]">Open Google Drive File</span>
                          </a>
                          <a 
                            href="https://docs.google.com/document/d/1y6pBl9x6j1uWpxx6kMfw9tg8WTdbBt8U3LIu9hCZ0Gk/edit?usp=sharing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-lg hover:border-[#4E5B4F] transition-colors flex flex-col gap-1 text-left"
                          >
                            <span className="text-sm font-bold text-[#2E2C29]">Project Summary Report</span>
                            <span className="text-xs font-mono text-[#7A7366]">Open Google Docs</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
