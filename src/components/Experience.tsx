import { motion } from "motion/react";
import { Experience } from "../types";
import { Sparkles, Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  // Sort experiences chronological (typically newest first is standard)
  const sortedExperiences = [...experiences];

  return (
    <section id="experience" className="py-24 bg-[#FBF9F4] border-t border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#7A7366] uppercase flex items-center gap-1.5 font-bold">
            <Sparkles size={11} className="text-[#7A7366]" />
            Education
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#2E2C29]">
            Curriculum Vitae
          </h2>
          <div className="w-16 h-[2.5px] bg-[#4E5B4F] mt-1.5"></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto pl-4 sm:pl-8 flex flex-col gap-12">
          {/* Vertical Timeline Thread Line */}
          <div className="absolute left-6 sm:left-[39px] top-4 bottom-4 w-[1px] bg-[#D0C4AF]"></div>

          {sortedExperiences.map((milestone, idx) => (
            <motion.div
              id={`experience-node-${milestone.id}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              key={milestone.id}
              className="relative flex gap-6 sm:gap-10 sm:items-start"
            >
              {/* Timeline Indicator Hub */}
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#E5DDD0] shadow-3xs shrink-0 select-none text-[#4E5B4F]">
                {milestone.type === "work" ? (
                  <Briefcase size={16} />
                ) : (
                  <GraduationCap size={16} />
                )}
              </div>

              {/* Milestone Content Box */}
              <div className="flex flex-col gap-4 bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl p-6 sm:p-7 shadow-2xs hover:shadow-xs hover:border-[#D0C4AF] transition-all duration-300 w-full">
                {/* Header Information */}
                <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-2 ${milestone.description && milestone.description.length > 0 ? "pb-3 border-b border-[#E5DDD0]" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-extrabold text-base sm:text-lg text-[#2E2C29] tracking-tight leading-snug">
                      {milestone.role}
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-[#4E5B4F] tracking-tight">
                      {milestone.company}
                    </span>
                  </div>

                  {/* Badges Duration & Location */}
                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3 sm:gap-1 text-[11px] font-mono text-[#5D574F] font-bold whitespace-nowrap">
                    <span className="flex items-center gap-1 bg-[#FAF6EE] border border-[#E5DDD0] px-2 py-0.5 rounded">
                      <Calendar size={11} className="text-[#7A7366]" />
                      {milestone.duration}
                    </span>
                    {milestone.location && (
                      <span className="flex items-center gap-1 text-[#7A7366]">
                        <MapPin size={11} />
                        {milestone.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Achievements Accomplishments Bullet List */}
                {milestone.description && milestone.description.length > 0 && (
                  <ul className="flex flex-col gap-3 pl-4 list-disc text-[#5D574F] font-sans text-xs sm:text-sm leading-relaxed">
                    {milestone.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="marker:text-[#4E5B4F]">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
