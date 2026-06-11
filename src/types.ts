export interface UserProfile {
  name: string;
  jobTitle: string;
  subTitle: string;
  bio: string;
  aboutText: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  phone?: string;
  resumeUrl?: string;
  brandName?: string;
  cardBookTitle?: string;
  cardBookQuote?: string;
  cardBookQuoteAuthor?: string;
  headingSkills?: string;
}

export interface Skill {
  id: string;
  category: string; // e.g. "Frontend", "Backend", "Tools"
  name: string;
  proficiency?: number; // 0 to 100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string; // e.g. "Web Application", "Mobile App", "Open Source"
  techStack: string[];
  demoUrl?: string;
  sourceUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string; // e.g. "2024 - Present"
  location?: string;
  description: string[];
  type: "work" | "education";
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SectionsVisibility {
  hero: boolean;
  about: boolean;
  skills: boolean;
  projects: boolean;
  experience: boolean;
  contact: boolean;
}

export interface PortfolioData {
  profile: UserProfile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  sectionsVisibility?: SectionsVisibility;
}
