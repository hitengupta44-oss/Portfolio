export const profile = {
  name: "Hiten Gupta",
  role: "Computer Science student building AI products",
  shortRole: "AI, data and backend",
  availability: "Open to AI/ML, data and backend internships",
  location: "New Delhi 110074, India",
  email: "hitengupta44@gmail.com",
  phone: "+91 9891119021",
  linkedin: "https://www.linkedin.com/in/hiten-gupta-260624384",
  github: "https://github.com/hitengupta44-oss",
  githubUser: "hitengupta44-oss",
  resumeUrl: "/Hiten_Gupta_Resume.pdf",
  summary:
    "BSc (Hons) Computer Science student at Delhi University (2028) building AI products with Python, LLMs and NLP. Shipped two deployed chatbots during a data analyst internship at HiveRift Software.",
  focus:
    "9x national hackathon finalist and President of the department's Techathon Society. Seeking an AI/ML, data or backend internship.",
};

export const experience = [
  {
    id: "hiverift",
    role: "Data Analyst Intern",
    company: "HiveRift Software Pvt. Ltd.",
    period: "Apr 2026 – Jul 2026",
    type: "Internship",
    highlights: [
      "Built and deployed a Search Automation Chatbot for the company website, enabling natural-language discovery of products and services.",
      "Built a Sales Automation Chatbot with a custom knowledge base to handle lead qualification, FAQs and customer follow-ups.",
      "Scraped, cleaned and processed millions of records from multiple external sources using Scrapy and Pandas.",
      "Ran EDA on large datasets and presented trends, anomalies and business insights to stakeholders.",
    ],
    stack: ["Python", "NLP", "Scrapy", "Pandas", "EDA"],
  },
  {
    id: "freelance",
    role: "Machine Learning Projects",
    company: "Freelance",
    period: "",
    type: "Freelance",
    highlights: [
      "Built supervised and unsupervised models for predictive analytics and business forecasting.",
      "Engineered features and automated preprocessing, training and evaluation pipelines.",
    ],
    stack: ["Scikit-learn", "TensorFlow", "Feature engineering", "ML pipelines"],
  },
];

export const leadership = [
  {
    id: "techathon",
    role: "President, Techathon Society",
    organisation: "Dept. of Computer Science, ARSD College",
    period: "2026 – Present",
    highlights: [
      "Lead the department's technical society, organising hackathons, workshops and coding events for CS students.",
      "Coordinate the core team across event planning, outreach and collaborations with other societies.",
    ],
  },
  {
    id: "techathon-coordinator",
    role: "Team Coordinator, Techathon Society",
    organisation: "Dept. of Computer Science, ARSD College",
    period: "2024 – 2025",
    highlights: ["Coordinated the society's team and helped run its technical events and hackathons."],
  },
];

export const skillGroups = [
  { id: "lang", title: "Languages", items: ["Python", "SQL", "TypeScript"] },
  {
    id: "ml",
    title: "AI and machine learning",
    items: ["Scikit-learn", "TensorFlow", "LangChain", "LLMs", "Agentic AI", "NLP"],
  },
  {
    id: "data",
    title: "Data",
    items: ["Pandas", "NumPy", "Scrapy", "ETL pipelines", "EDA", "Statistical modelling"],
  },
  {
    id: "tools",
    title: "Tools",
    items: ["FastAPI", "Next.js", "Docker", "Git", "GitHub Actions", "Power BI", "Matplotlib", "Seaborn"],
  },
];

export const education = [
  {
    id: "bsc",
    title: "BSc (Hons) Computer Science",
    institution: "Atma Ram Sanatan Dharma College, University of Delhi",
    detail: "Expected 2028",
    extra: "CGPA 8.27 (Year 2) · 7.95 (Year 1)",
  },
  {
    id: "hsc",
    title: "Class XII (CBSE)",
    institution: "Ryan International School",
    detail: "90.8%",
  },
  {
    id: "ssc",
    title: "Class X (CBSE)",
    institution: "Ryan International School",
    detail: "93.8%",
  },
];

export const achievements = [
  { id: "payload", title: "2nd Runner-Up, PAYLOAD 2026 Hackathon" },
  { id: "finalist", title: "Grand Finalist in 9 national-level hackathons" },
  { id: "production", title: "Deployed two production AI chatbots (search and sales automation) at HiveRift Software" },
];

export const projects = [
  {
    id: "genhive",
    slug: "genhive-ai-sales-assistant",
    title: "GenHive – AI Sales Assistant",
    context: "Python, LLMs, Docker",
    status: "Deployed",
    overview:
      "An AI chatbot that answers customer queries from a company knowledge base and qualifies leads.",
    highlights: [
      "Answers customer questions from a company knowledge base.",
      "Qualifies leads during the conversation.",
      "Python backend with a web frontend, containerised with Docker and deployed live.",
    ],
    stack: ["Python", "LLMs", "Docker"],
    sourceUrl: "https://github.com/hitengupta44-oss/GENHIVE02",
    liveUrl: "https://genhive-02.vercel.app",
  },
  {
    id: "hive-search",
    slug: "hive-search-bot",
    title: "Hive Search Bot",
    context: "TypeScript, Next.js, GitHub Actions",
    status: "Deployed",
    overview:
      "Conversational search for the HiveRift website, letting visitors find products and services in plain language.",
    highlights: [
      "Lets visitors find products and services by asking in plain language.",
      "Built in Next.js with CI through GitHub Actions.",
      "60+ commits to production.",
    ],
    stack: ["TypeScript", "Next.js", "GitHub Actions"],
    sourceUrl: "https://github.com/hitengupta44-oss/hive_search_bot",
    liveUrl: "https://hive-search-bot.vercel.app",
  },
];

export const projectMap = Object.fromEntries(projects.map((project) => [project.id, project]));
