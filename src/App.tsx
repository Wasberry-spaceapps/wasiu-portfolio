import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Sparkles, Eye, Settings2 } from "lucide-react";

// Local Modules
import { PortfolioData, Inquiry } from "./types";
import { initialPortfolioData } from "./initialData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ExperienceSection from "./components/Experience";
import Contact from "./components/Contact";
import EditorPanel from "./components/EditorPanel";
import { FileFlowBackground } from "./components/ThreeDInteraction";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTipsBanner, setShowTipsBanner] = useState(true);

  // Load state coordinates from LocalStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("portfolio_data_v2");
      if (storedData) {
        const parsed = JSON.parse(storedData) as PortfolioData;
        if (!parsed.sectionsVisibility) {
          parsed.sectionsVisibility = {
            hero: true,
            about: true,
            skills: true,
            projects: true,
            experience: true,
            contact: true
          };
        }
        parsed.profile = {
          ...initialPortfolioData.profile,
          ...parsed.profile
        };
        setPortfolioData(parsed);
      }

      const storedInquiries = localStorage.getItem("portfolio_inquiries_v2");
      if (storedInquiries) {
        setInquiries(JSON.parse(storedInquiries));
      }
    } catch (e) {
      console.warn("Could not read local storage configurations, using initial datasets instead.", e);
    }
  }, []);

  // Monitor scroll for ScrollToTop capability
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dispatch details updates
  const handleDataUpdate = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem("portfolio_data_v2", JSON.stringify(newData));
  };

  const handleInquiriesUpdate = (newInquiries: Inquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem("portfolio_inquiries_v2", JSON.stringify(newInquiries));
  };

  // Append incoming message record
  const addInquiry = (name: string, email: string, subject: string, message: string) => {
    const newInq: Inquiry = {
      id: "inq-" + Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("portfolio_inquiries_v2", JSON.stringify(updated));
  };

  // Restore everything to initial database blueprints
  const handleReset = () => {
    setPortfolioData(initialPortfolioData);
    localStorage.setItem("portfolio_data_v2", JSON.stringify(initialPortfolioData));
    setIsEditModeOpen(false);
  };

  const toggleEditMode = () => {
    setIsEditModeOpen(!isEditModeOpen);
  };

  const unreadInquiriesCount = inquiries.filter((inq) => !inq.read).length;

  const isLocal = typeof window !== "undefined" && (
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname.includes("run.app") ||
    window.location.hostname.includes("aistudio") ||
    window.location.hostname === ""
  );

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2E2C29] font-sans selection:bg-[#2E2C29] selection:text-[white] flex flex-col relative">
      {/* Global Ambient Fluid Backdrop Tracker */}
      <FileFlowBackground />
      
      {/* Sticky Top Header */}
      <Header
        brandName={portfolioData.profile.brandName || "Portfolio"}
        onEditToggle={toggleEditMode}
        unreadCount={unreadInquiriesCount}
        isLocal={isLocal}
      />

      {/* Floating Instructions Tips Banner */}
      {showTipsBanner && isLocal && (
        <div id="floating-instructions-tips" className="fixed bottom-6 left-6 z-40 max-w-xs bg-zinc-900 text-white rounded-2xl shadow-xl p-4 border border-zinc-800 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-amber-400 uppercase flex items-center gap-1">
              <Sparkles size={10} /> Live Portfolio Preview
            </span>
            <button
              onClick={() => setShowTipsBanner(false)}
              className="text-zinc-400 hover:text-white text-xs cursor-pointer bg-zinc-800 hover:bg-zinc-700 w-5 h-5 rounded-full flex items-center justify-center font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-[12px] text-zinc-300 leading-relaxed">
            Click the <strong className="text-white">"Customize Site"</strong> button in the main menu to edit name, biography, skills, and projects!
          </p>
        </div>
      )}

      {/* Primary Landing Page Components */}
      <main className="flex-grow">
        
        {/* Dynamic Hero Area */}
        {(portfolioData.sectionsVisibility?.hero ?? true) && (
          <Hero
            name={portfolioData.profile.name}
            jobTitle={portfolioData.profile.jobTitle}
            subTitle={portfolioData.profile.subTitle}
            location={portfolioData.profile.location}
            github={portfolioData.profile.github}
            linkedin={portfolioData.profile.linkedin}
            twitter={portfolioData.profile.twitter}
            resumeUrl={portfolioData.profile.resumeUrl}
            cardBookTitle={portfolioData.profile.cardBookTitle}
            cardBookQuote={portfolioData.profile.cardBookQuote}
            cardBookQuoteAuthor={portfolioData.profile.cardBookQuoteAuthor}
          />
        )}

        {/* Philosophy Journey Section */}
        {(portfolioData.sectionsVisibility?.about ?? true) && (
          <About
            aboutText={portfolioData.profile.aboutText}
            bio={portfolioData.profile.bio}
          />
        )}

        {/* Skills Competencies Grid */}
        {(portfolioData.sectionsVisibility?.skills ?? true) && (
          <Skills
            skills={portfolioData.skills}
            headingSkills={portfolioData.profile.headingSkills}
          />
        )}

        {/* Case Studies Catalog Grid */}
        {(portfolioData.sectionsVisibility?.projects ?? true) && (
          <Projects
            projects={portfolioData.projects}
          />
        )}

        {/* Experience Timeline */}
        {(portfolioData.sectionsVisibility?.experience ?? true) && (
          <ExperienceSection
            experiences={portfolioData.experiences}
          />
        )}

        {/* Reach out & Contact Panel */}
        {(portfolioData.sectionsVisibility?.contact ?? true) && (
          <Contact
            email={portfolioData.profile.email}
            phone={portfolioData.profile.phone}
            location={portfolioData.profile.location}
            onInquirySubmit={addInquiry}
          />
        )}

      </main>

      {/* Aesthetic Minimal Footer */}
      <footer id="portfolio-footer" className="bg-[#2E2C29] text-[#EBE5D8]/80 border-t border-[#4E5B4F] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-display font-extrabold text-base tracking-widest uppercase text-white hover:text-[#C5B390] transition-colors">
              {portfolioData.profile.brandName || "Portfolio"}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm font-sans font-bold text-[#EBE5D8]/90">
            <a href="#about" className="hover:text-[#C5B390] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#C5B390] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#C5B390] transition-colors">Contact</a>
          </div>

          <div className="text-center md:text-right text-[11px] font-mono text-[#BCB5A8]/65 flex flex-col gap-1 font-bold">
            <span>© {new Date().getFullYear()} {portfolioData.profile.name}.</span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          id="btn-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#FAF6EE] hover:bg-[#EBE5D8] text-[#2E2C29] border border-[#E5DDD0] hover:border-[#D0C4AF] rounded-full shadow-lg transition-all cursor-pointer active:scale-90"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Personalizer Workspace Slide Drawer */}
      <AnimatePresence>
        {isEditModeOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModeOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-900/35 backdrop-blur-xs cursor-pointer select-none"
            />
            {/* Dynamic Drawer content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-2xl"
            >
              <EditorPanel
                data={portfolioData}
                inquiries={inquiries}
                onDataUpdate={handleDataUpdate}
                onInquiriesUpdate={handleInquiriesUpdate}
                onClose={() => setIsEditModeOpen(false)}
                onReset={handleReset}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
