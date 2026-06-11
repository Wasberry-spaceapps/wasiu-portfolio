import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface AboutProps {
  aboutText: string;
  bio: string;
}

export default function About({ aboutText, bio }: AboutProps) {
  const defaultText =
    "I am an explorer of digital and written language. My work focuses on close reading, curation of digital humanities databases, and writing essays that traverse past historical records and future text archives.";

  const textToRender = aboutText || bio || defaultText;
  const paragraphs = textToRender.split("\n\n");

  return (
    <section id="about" className="py-24 bg-[#FBF9F4] border-t border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#7A7366] uppercase flex items-center gap-1.5 font-bold">
            <Sparkles size={11} className="text-[#7A7366]" />
            01 / About Me
          </span>
        </div>

        {/* Content Layout */}
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {paragraphs.map((para, idx) => (
            <p
              key={idx}
              className="text-[#5D574F] leading-relaxed text-[17px] font-medium"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
