export const profile = {
  name: "Hiten Gupta",
  role: "Machine Learning Engineer & Data Analyst",
  shortRole: "ML Engineer · Data Analyst",
  location: "New Delhi 110074, India",
  email: "hitengupta44@gmail.com",
  phone: "+91 9891119021",
  linkedin: "https://www.linkedin.com/in/hiten-gupta-260624384",
  github: "https://github.com/hitengupta44-oss",
  githubUser: "hitengupta44-oss",
  summary:
    "Results-driven Machine Learning Engineer and Data Analyst with demonstrated experience designing AI-powered solutions, building end-to-end ML pipelines, and processing large-scale datasets. Adept at translating complex data into actionable business insights and deploying intelligent systems that solve real-world problems.",
  focus:
    "Proficient in Python, NLP, Agentic AI, and modern data engineering practices, with a strong foundation in statistical modelling and predictive analytics.",
};

export const experience = [
  {
    id: "hiverift",
    role: "Data Analyst Intern",
    company: "HiveRift Software Pvt. Ltd.",
    type: "Internship",
    highlights: [
      "Designed and deployed a Search Automation Chatbot for the company website using Python and NLP, enabling natural language discovery of products and services.",
      "Built a Sales Automation Chatbot handling lead qualification, FAQs, and customer follow-ups, streamlining the end-to-end sales pipeline.",
      "Scraped, cleaned, and processed millions of records from multiple external sources using Scrapy and Pandas, ensuring data quality for analytics.",
      "Conducted EDA on large datasets to surface trends, anomalies, and business insights presented directly to stakeholders.",
    ],
    stack: ["Python", "NLP", "Scrapy", "Pandas", "EDA"],
  },
  {
    id: "freelance",
    role: "Machine Learning Engineer",
    company: "Freelance / Project-based",
    type: "Independent",
    highlights: [
      "Developed supervised and unsupervised ML models for predictive analytics and business forecasting.",
      "Conducted feature engineering, data preprocessing, and built automated pipelines for model training and evaluation.",
      "Analysed large-scale datasets to identify actionable patterns and correlations supporting strategic decisions.",
    ],
    stack: ["Scikit-learn", "TensorFlow", "Feature Engineering", "ML Pipelines"],
  },
];

export const skillGroups = [
  {
    id: "ml",
    title: "Languages & ML",
    items: ["Python", "SQL", "Scikit-learn", "TensorFlow", "LangChain", "NLP", "Agentic AI", "LLMs"],
  },
  {
    id: "data",
    title: "Data Engineering",
    items: ["Pandas", "NumPy", "ETL Pipelines", "Data Wrangling & Cleaning"],
  },
  {
    id: "analytics",
    title: "Analytics & Tools",
    items: ["EDA", "Statistical Modelling", "Power BI", "Matplotlib", "Seaborn", "Git", "FastAPI"],
  },
];

export const education = [
  {
    id: "bsc",
    title: "BSc (Hons) Computer Science",
    institution: "Atma Ram Sanatan Dharma College, University of Delhi",
    detail: "Expected 2027",
  },
  {
    id: "hsc",
    title: "Higher Secondary (CBSE)",
    institution: "Ryan International School",
    detail: "90.8%",
  },
  {
    id: "ssc",
    title: "Matriculation (CBSE)",
    institution: "Ryan International School",
    detail: "93.8%",
  },
];

export const achievements = [
  { id: "payload", title: "2nd Runner-Up, PAYLOAD 2026 Hackathon" },
  { id: "finalist", title: "9x Hackathon Grand Finalist across national-level competitions" },
  { id: "production", title: "Deployed production AI chatbots (search + sales automation) at HiveRift Software Pvt. Ltd." },
];

export const projects = [
  {
    id: "search-chatbot",
    slug: "search-automation-chatbot",
    title: "Search Automation Chatbot",
    context: "HiveRift Software Pvt. Ltd.",
    status: "Deployed to production",
    overview:
      "A conversational search layer for the company website that lets visitors discover products and services in natural language instead of navigating menus and filters.",
    highlights: [
      "Natural language understanding of product and service queries with Python and NLP.",
      "Designed and deployed on the live company website.",
      "Turns open-ended questions into direct routes to the right offering.",
    ],
    stack: ["Python", "NLP", "Chatbot", "Search"],
    sourceUrl: "https://github.com/hitengupta44-oss",
  },
  {
    id: "sales-chatbot",
    slug: "sales-automation-chatbot",
    title: "Sales Automation Chatbot",
    context: "HiveRift Software Pvt. Ltd.",
    status: "Deployed to production",
    overview:
      "An automated sales assistant that qualifies leads, answers frequently asked questions, and runs customer follow-ups, streamlining the end-to-end sales pipeline.",
    highlights: [
      "Lead qualification flow that captures and scores prospect intent.",
      "FAQ handling to resolve common questions without human hand-off.",
      "Automated customer follow-ups to keep the pipeline moving.",
    ],
    stack: ["Python", "NLP", "Automation", "Sales Ops"],
    sourceUrl: "https://github.com/hitengupta44-oss",
  },
  {
    id: "data-pipeline",
    slug: "large-scale-data-pipeline",
    title: "Large-Scale Data Ingestion Pipeline",
    context: "HiveRift Software Pvt. Ltd.",
    status: "Internal analytics",
    overview:
      "A scraping and cleaning pipeline that collected and processed millions of records from multiple external sources, feeding quality-checked data into analytics and stakeholder reporting.",
    highlights: [
      "Multi-source crawling with Scrapy.",
      "Cleaning, deduplication and validation with Pandas to ensure data quality.",
      "EDA on the resulting datasets to surface trends and anomalies for stakeholders.",
    ],
    stack: ["Scrapy", "Pandas", "NumPy", "ETL", "EDA"],
    sourceUrl: "https://github.com/hitengupta44-oss",
  },
  {
    id: "predictive-ml",
    slug: "predictive-analytics-models",
    title: "Predictive Analytics & Forecasting Models",
    context: "Freelance / Project-based",
    status: "Client delivery",
    overview:
      "Supervised and unsupervised machine learning models for predictive analytics and business forecasting, backed by automated training and evaluation pipelines.",
    highlights: [
      "Feature engineering and preprocessing tailored to each dataset.",
      "Automated pipelines for model training and evaluation.",
      "Pattern and correlation analysis to support strategic decisions.",
    ],
    stack: ["Scikit-learn", "TensorFlow", "Python", "Statistical Modelling"],
    sourceUrl: "https://github.com/hitengupta44-oss",
  },
];

export const projectMap = Object.fromEntries(projects.map((project) => [project.id, project]));
