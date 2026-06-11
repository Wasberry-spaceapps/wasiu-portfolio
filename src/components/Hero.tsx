import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Github, Linkedin, Twitter, MapPin, FileText, Sparkles } from "lucide-react";
import { TiltContainer } from "./ThreeDInteraction";

interface HeroProps {
  name: string;
  jobTitle: string;
  subTitle: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl?: string;
  cardBookTitle?: string;
  cardBookQuote?: string;
  cardBookQuoteAuthor?: string;
}

export default function Hero({
  name,
  jobTitle,
  subTitle,
  location,
  github,
  linkedin,
  twitter,
  resumeUrl,
  cardBookTitle,
  cardBookQuote,
  cardBookQuoteAuthor,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // High performance spring variables for interactive cursor particle tracking
  const mouseX = useSpring(0, { damping: 40, stiffness: 100 });
  const mouseY = useSpring(0, { damping: 40, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Normalizing displacement relative to core dimensions
      mouseX.set(x * 0.08); 
      mouseY.set(y * 0.08);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Inertial typography glyphs representing literary and humanities archives
  const GLYPHS = [
    { char: "¶", xOffset: -120, yOffset: -80, scale: 1.2, speed: 0.6, rotation: 12, color: "text-[#4E5B4F]/10" },
    { char: "§", xOffset: 240, yOffset: -140, scale: 1.5, speed: -0.4, rotation: -18, color: "text-amber-500/10" },
    { char: "Ω", xOffset: -220, yOffset: 120, scale: 1.8, speed: 0.8, rotation: 45, color: "text-[#2E2C29]/5" },
    { char: "✒️", xOffset: 180, yOffset: 180, scale: 1.0, speed: -0.9, rotation: 10, color: "text-[#5D574F]/10" },
    { char: "α", xOffset: -50, yOffset: -190, scale: 1.3, speed: 0.3, rotation: -30, color: "text-amber-600/5" },
  ];

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 bg-[#FAF6EE] overflow-hidden"
    >
      {/* 3D Typographic Particle Field that follows cursor movement with spring physics */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
        {GLYPHS.map((glyph, index) => {
          // Custom mapping for fluid spring lag per coordinate
          return (
            <motion.div
              key={index}
              style={{
                x: mouseX,
                y: mouseY,
                translateX: glyph.xOffset,
                translateY: glyph.yOffset,
                scale: glyph.scale,
                rotate: glyph.rotation,
              }}
              className={`absolute left-1/2 top-1/2 font-sans font-extrabold text-6xl ${glyph.color} select-none pointer-events-none`}
              transition={{ ease: "linear" }}
            >
              {glyph.char}
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Background Pattern elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(227, 218, 201, 0.5) 0%, rgba(227, 218, 201, 0) 70%)" }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(235, 229, 216, 0.5) 0%, rgba(235, 229, 216, 0) 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">

          {/* Hero Name & Title */}
          <div className="flex flex-col gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#2E2C29]"
            >
              Hi, I'm <span className="text-[#2E2C29] border-b-3 border-[#4E5B4F]/35 pb-1">{name || "Wasiu Mutairu"}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg sm:text-xl font-display font-bold text-[#4E5B4F] mt-1"
            >
              {jobTitle || "Writer, Critic & Scholar"}
            </motion.p>
          </div>

          {/* Subtitle / Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#5D574F] leading-relaxed max-w-xl font-medium"
          >
            {subTitle || "Weaving critical research, historical text analyses, and narrative systems."}
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <a
              id="hero-cta-projects"
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-tight text-white bg-[#2E2C29] hover:bg-[#3E3A35] rounded-full transition-all shadow-md hover:scale-103 active:scale-98"
            >
              <span>View Projects</span>
              <ArrowRight size={15} />
            </a>

            <a
              id="hero-cta-contact"
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-tight text-[#2E2C29] bg-[#FAF9F4] hover:bg-[#EBE5D8] border border-[#E5DDD0] rounded-full transition-all hover:scale-103 active:scale-98"
            >
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Social Links & Resume */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-5 mt-6 pt-6 border-t border-[#E5DDD0] w-full max-w-md"
          >
            <span className="text-[11px] font-mono tracking-wider text-[#7A7366] uppercase font-bold">Connect</span>
            <div className="flex items-center gap-3">
              {github && (
                <a
                  id="hero-social-github"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#5D574F] hover:text-[#2E2C29] hover:bg-[#EBE5D8]/50 rounded-full transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
              )}
              {resumeUrl && resumeUrl !== "#" && (
                <a
                  id="hero-social-resume"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#5D574F] hover:text-[#2E2C29] hover:bg-[#EBE5D8]/55 rounded-md transition-all ml-1.5"
                >
                  <FileText size={14} />
                  <span>Curriculum Vitae</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Graphic Column: Serene Poster/Journal Mockup wrapped in 3D perspective Tilt */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[380px]"
          >
            <TiltContainer maxTiltX={15} maxTiltY={15} scale={1.03}>
              {/* Elegant double-border literary card representing a printed journal spec sheet */}
              <div className="relative bg-[#FBF9F4] border-2 border-double border-[#D0C4AF] rounded-2xl p-5 shadow-lg flex flex-col gap-4 hover:border-[#4E5B4F] transition-all duration-300">
                
                {/* Header label coordinate */}
                <div className="flex justify-between items-center pb-2 border-b border-[#E5DDD0] text-[10px] font-mono tracking-wider text-[#7A7366] uppercase">
                  <span>{cardBookTitle || "Portfolio"}</span>
                  <span>NO. 026 / PRINT</span>
                </div>

                {/* SIDE-BY-SIDE Layout inside the card: Image beside Text */}
                <div className="grid grid-cols-12 gap-3.5 items-center my-2">
                  {/* Left: Atmospheric Ink & Paper Image */}
                  <div className="col-span-12 sm:col-span-5 aspect-[4/5] overflow-hidden rounded-md border border-[#E5DDD0] bg-[#FAF7F0] relative">
                    <img
                      src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80"
                      alt="Ink pen on paper"
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full grayscale opacity-80 mix-blend-multiply"
                    />
                    <div className="absolute inset-0 bg-[#7A6354]/10"></div>
                  </div>

                  {/* Right: Printed verse/quote */}
                  <div className="col-span-12 sm:col-span-7 flex flex-col gap-2">
                    <span className="font-display text-xs font-bold leading-normal text-[#2E2C29] tracking-tight">
                      "{cardBookQuote || "A"}"
                    </span>
                    <span className="text-[10px] font-mono tracking-tight text-[#7A7366] italic">
                      {cardBookQuoteAuthor || "— W. M., Scholar Notes"}
                    </span>
                  </div>
                </div>

                {/* Footer Coordinate details */}
                <div className="pt-2 border-t border-[#E5DDD0] flex justify-between items-center text-[10px] font-mono text-[#5D574F]">
                  <span className="flex items-center gap-1">
                    <Sparkles size={10} className="text-amber-500 animate-spin" />
                    COLLECTED FOLIO
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#EBE5D8] rounded font-semibold text-[#2E2C29]">
                    19.0.1
                  </span>
                </div>

                {/* Decorative vintage botanical leaf illustration as subtle watermark accent */}
                <div className="absolute -bottom-8 -right-8 w-16 h-16 opacity-15 pointer-events-none text-[#4E5B4F] select-none text-2xl">
                  🍃
                </div>
              </div>
            </TiltContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
