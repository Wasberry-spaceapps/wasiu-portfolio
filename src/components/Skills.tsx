import { motion } from "motion/react";
import { Skill } from "../types";
import { Braces, BookOpen, PenTool } from "lucide-react";
import { TiltContainer } from "./ThreeDInteraction";

interface SkillsProps {
  skills: Skill[];
  headingSkills?: string;
}

export default function Skills({ skills, headingSkills }: SkillsProps) {
  // Group skills by category
  const categories = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(skill);
    return acc;
  }, {});

  // Simple icon selector for publisher/academic categories
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "scholarship":
        return <BookOpen size={16} className="text-[#4E5B4F]" />;
      case "digital methods":
        return <Braces size={16} className="text-[#4E5B4F]" />;
      default:
        return <PenTool size={16} className="text-[#4E5B4F]" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#FAF6EE] border-t border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#2E2C29]">
            {headingSkills || "Skills"}
          </h2>
          <div className="w-16 h-[2.3px] bg-[#4E5B4F] mt-1.5"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([category, items], idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={category}
              className="h-full"
            >
              <TiltContainer maxTiltX={8} maxTiltY={8} scale={1.02}>
                <div className="bg-[#FBF9F4] border border-[#E5DDD0] rounded-xl p-6 sm:p-7 shadow-2xs hover:border-[#4E5B4F] hover:shadow-md transition-all duration-300 flex flex-col gap-6 h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5DDD0]">
                    <div className="p-2 bg-[#FAF6EE] border border-[#E5DDD0] rounded-lg">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="font-display font-bold text-[#2E2C29] tracking-tight text-base sm:text-lg">
                      {category}
                    </h3>
                  </div>

                  {/* Skills List in Category */}
                  <div className="flex flex-col gap-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm sm:text-base">
                          <span className="font-bold text-[#2E2C29] tracking-tight">
                            {item.name}
                          </span>
                          {item.proficiency && (
                            <span className="font-mono text-xs sm:text-sm text-[#7A7366] font-bold">
                              {item.proficiency}%
                            </span>
                          )}
                        </div>
                        {item.proficiency && (
                          <div className="h-1.5 w-full bg-[#EBE5D8]/55 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                              className="h-full bg-[#4E5B4F] rounded-full"
                            ></motion.div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TiltContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
