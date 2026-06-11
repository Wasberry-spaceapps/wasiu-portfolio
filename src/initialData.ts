import { PortfolioData } from "./types";

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Wasiu Mutairu",
    jobTitle: "Medical Student & Technology Enthusiast",
    subTitle: "Bridging the gap between clinical medicine, digital tools, IoT networks, and creative writing.",
    bio: "I am a 5th-year medical student at LASUCOM with diverse skills across writing, web development, IT troubleshooting, video editing, and IoT hardware calibration.",
    aboutText: "I've got diverse skills across various domains — from writing to IoT device setup, from IT helpdesk to programming languages. Luckily, med school ensured I can even learn new skills fast!\nAs such, I've learnt a lot and grown a lot too! I hope the projects below will serve as a brief glimpse into my abilities as a person.",
    location: "Lagos, Nigeria",
    email: "officialmutairu@gmail.com",
    github: "https://github.com/Wasberry-spaceapps/",
    linkedin: "",
    twitter: "",
    phone: "",
    resumeUrl: "#",
    brandName: "Wasiu.M",
    cardBookTitle: "Portfolio",
    cardBookQuote: "If I have seen further it is by standing on the sholders of Giants",
    cardBookQuoteAuthor: "— Isaac Newton",
    headingSkills: "Skills"
  },
  skills: [
    { id: "s1", category: "Technology & IT", name: "CompTIA A+ Systems Prep", proficiency: 94 },
    { id: "s2", category: "Technology & IT", name: "Virtualization & Networking", proficiency: 88 },
    { id: "s3", category: "Technology & IT", name: "Helpdesk IT Troubleshooting", proficiency: 92 },
    
    { id: "s4", category: "Programming & IoT", name: "Frontend Development (HTML/CSS)", proficiency: 40 },
    { id: "s5", category: "Programming & IoT", name: "Introduction to R Programming", proficiency: 85 },
    { id: "s6", category: "Programming & IoT", name: "ESP32 devices setup", proficiency: 60 },
    { id: "s7", category: "Programming & IoT", name: "Introductory TinyGS kit and LoRa Satellites training", proficiency: 70 },

    { id: "s8", category: "Media & Writing", name: "Video Timeline Editing (Filmora)", proficiency: 60 },
    { id: "s9", category: "Media & Writing", name: "Writing", proficiency: 60 }
  ],
  projects: [
    {
      id: "p1",
      title: "Interesting sparks: HTML and CSS",
      description: "High school was great. Messing around on the computer was greater. I had my...",
      longDescription: "High school was great. Messing around on the computer was greater. I had my first introduction to these languages in about grade 11, and it completely spurred my interest in wanting to personally learn more and more about them from the internet. I downloaded textbooks. I copied code from tutorial sites. And in the good ol' days when there were no AIs, I searched and searched the internet for how to get things right. I learnt more, became better, built more.",
      category: "Programming & Web",
      techStack: ["HTML5", "CSS3", "Semantic Web Layouts", "Browser Rendering"],
      demoUrl: "",
      sourceUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1545670723-196ed0954986?auto=format&fit=crop&w=1200&q=80",
      featured: false
    },
    {
      id: "p2",
      title: "Ambition: Video Editing",
      description: "I learnt and applied the principles of video editing. Wondershare Filmora was a great tool of choice! Eventually,...",
      longDescription: "I learnt and applied the principles of video editing. Wondershare Filmora was a great tool of choice! Eventually, I ended up running a YouTube channel during the pandemic lockdown.\nLink - https://www.youtube.com/@spookystories5087\nSome video works - https://www.instagram.com/wasberry4/",
      category: "Media & Video",
      techStack: ["Wondershare Filmora", "Audio Compression", "YouTube Optimization", "Timeline Keyframing"],
      demoUrl: "https://www.youtube.com/@spookystories5087",
      sourceUrl: "https://www.instagram.com/wasberry4/",
      imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: "p3",
      title: "Hope...: LASUSU",
      description: "I began writing in 2021, and luckily, won 1st place in the LASUSU Essay Competition. This...",
      longDescription: "I began writing in 2021, and luckily, won 1st place in the LASUSU Essay Competition. This early validation of my growing literary voice created a surge in confidence — confidence that I could try my best, and perhaps my best could lead me somewhere.",
      category: "Prose & Writing",
      techStack: ["Narrative Prose", "Critical Inquiry", "Archival Analysis", "Expository Writing"],
      demoUrl: "",
      sourceUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: "p4",
      title: "A temper against pain: Intelsat Space STEM Programs",
      description: "I was part of the 30 students selected for the 2023 Intelsat Space STEM Program.\n\nI learnt about environmental...",
      longDescription: "I was part of the 30 students selected for the 2023 Intelsat Space STEM Program.\n\nI learnt about environmental variables here on Earth, their relation to space technologies, and how satellites can be used to track these variables.\n\nI performed hands-on scientific experiments using an ESP32-based kit to capture variables like humidity and light intensity. I took this further by enrolling in the practical Intelsat TinyGS program, whose aim was to assemble a TinyGS kit, learning to receive data packets directly from LoRa satellites.\nSome experiments I worked on:\nhttps://drive.google.com/file/d/1bAVycxlVpaaYygnHKVMpxOlrQAMVwDi_/view?usp=sharing\n\nhttps://docs.google.com/document/d/1y6pBl9x6j1uWpxx6kMfw9tg8WTdbBt8U3LIu9hCZ0Gk/edit?usp=sharing",
      category: "IoT & Electronics",
      techStack: ["ESP32 Hardware", "LoRa Node Calibration", "TinyGS Satellite Network", "Atmospheric Sensors"],
      demoUrl: "https://drive.google.com/file/d/1bAVycxlVpaaYygnHKVMpxOlrQAMVwDi_/view?usp=sharing",
      sourceUrl: "https://docs.google.com/document/d/1y6pBl9x6j1uWpxx6kMfw9tg8WTdbBt8U3LIu9hCZ0Gk/edit?usp=sharing",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: "p5",
      title: "...To aspire: CompTIA A+ IT certification",
      description: "To land a helpdesk role, I decided to study the comprehensive CompTIA A+ curriculum. The 220-1101 curriculum focuses on hardware,...",
      longDescription: "To land a helpdesk role, I decided to study the comprehensive CompTIA A+ curriculum. The 220-1101 curriculum focuses on hardware, networking, mobile devices, and virtualization, and includes Motherboards & Internal Components, Wireless Standards, Tools & Cabling, etc. While I ultimately chose not to sit for the exam, I absorbed the theoretical troubleshooting models. Understanding the mechanics of how IT systems fail and are systematically repaired proved far more valuable than the certificate itself.\n\nThe training course I used for preparation - https://www.professormesser.com/free-a-plus-training/220-1101/220-1101-video/220-1101-training-course/\n\nOfficial CompTIA A+ site - https://www.comptia.org/en/certifications/a/core-1-v15/",
      category: "IT Infrastructure",
      techStack: ["TCP/IP Networking", "VM Virtualization", "Hardware Systems", "Workspace Troubleshooting"],
      demoUrl: "https://www.professormesser.com/free-a-plus-training/220-1101/220-1101-video/220-1101-training-course/",
      sourceUrl: "https://www.comptia.org/en/certifications/a/core-1-v15/",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      featured: false
    },
    {
      id: "p6",
      title: "Getting better every day: Building a personal flashcard system",
      description: "Anki (a flashcard program) is great. For a person ‘like me,’ however, it could be better. Late last year, Anki wasn’t...",
      longDescription: "Anki (a flashcard program) is great. For a person ‘like me,’ however, it could be better. Late last year, Anki wasn’t cutting it — I needed to review about 16 individual cards in one single screen (rather than the 1 card per screen that Anki natively serves us) to be faster. So I vibecoded a flashcard application (HTML-based) that runs in a browser and whose progress is saved and persistent, even across PC shutdowns, via a server.\n\nDetails\nI also developed a system to convert my existing Anki cards (with links to embedded media) to a .txt file. Then, the .txt file could be imported straight into the flashcard application. A local server system then serves the right images to the right individual cards in the browser as I review my cards, whilst also ensuring that the images load almost instantaneously, all in a single HTML file.\n\nYoutube video demo - https://youtu.be/hGAVUHDFObY\n\nLink to codebase:\nhttps://mega.nz/file/ijZVmABQ#Zk2iYT6rHNXrAVK7eyvwc9m16GsFb0vRPXR9WwaLwzY",
      category: "Programming & Web",
      techStack: ["Anki Text Parser", "Active Recall System", "Local Server Environment", "HTML5 Offline Engine"],
      demoUrl: "https://youtu.be/hGAVUHDFObY",
      sourceUrl: "https://mega.nz/file/ijZVmABQ#Zk2iYT6rHNXrAVK7eyvwc9m16GsFb0vRPXR9WwaLwzY",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: "p7",
      title: "Ambition: R programming language course",
      description: "Earlier this year, I undertook an introductory R programming course by Carnegie Mellon University. It provided me with...",
      longDescription: "Earlier this year, I undertook an introductory R programming course by Carnegie Mellon University. It provided me with basic information about R syntax and the RStudio interface. I learned how to import CSV files, the structure of data frames, how to deal with factors, how to add/remove rows and columns, and how to calculate summary statistics from a data frame. It was my first step into the environment of statistical computing and structured analysis.\n\nLink to CMU course - https://cmu-lib.github.io/os-workshops/reproducible-research/Introduction%20to%20R.pdf",
      category: "Data Analysis",
      techStack: ["R Programming", "RStudio", "CSV Pruning", "Summary Stat Charting"],
      demoUrl: "https://cmu-lib.github.io/os-workshops/reproducible-research/Introduction%20to%20R.pdf",
      sourceUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      featured: false
    },
    {
      id: "p8",
      title: "Hope: Writing a blog",
      description: "Ryan Holiday wrote that great entrepreneurs don't go searching the streets for opportunities; they open themselves to...",
      longDescription: "Ryan Holiday wrote that great entrepreneurs don't go searching the streets for opportunities; they open themselves to noticing the little things around them. I needed a job, and I could write! So I channeled my time and stillness toward crafting pieces from truths I had been learning. I established my blog as a curated space for exploring the intersections of medicine, poetry, history, and philosophy. Hosting pieces like 'Be Silent' and 'Hercules' Odyssey,' the minimalist focus prioritizes deep reading over fleeting engagement. By living and breathing the art of writing in this space, I aim to continuously refine my voice and produce greater works.\n\nSelected works:\nBe Silent - https://gracioushope.substack.com/p/be-silent\nA Brief History of Trepanning - https://gracioushope.substack.com/p/a-brief-history-of-trepanning\nSweet Biscuit - https://gracioushope.substack.com/p/sweet-biscuit\nOn the Importance of Wisdom - https://gracioushope.substack.com/p/on-the-importance-of-wisdom",
      category: "Prose & Writing",
      techStack: ["Digital Publishing", "Newsletter Editorial", "Medical Archaeology", "Socio-Ethics Insights"],
      demoUrl: "https://gracioushope.substack.com/p/be-silent",
      sourceUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
      featured: true
    }
  ],
  experiences: [
    {
      id: "e1",
      company: "LASUCOM",
      role: "Medical Student (MB;BS path)",
      duration: "2021 - Present",
      location: "",
      description: [],
      type: "education"
    }
  ],
  sectionsVisibility: {
    hero: true,
    about: true,
    skills: true,
    projects: true,
    experience: true,
    contact: true
  }
};
