// ============================================================
// Static profile content — the canonical source of the site data.
// Ported 1:1 from legacy/profile.js (PROFILE_DATA).
// This is BOTH the static fallback for the app AND the source
// from which supabase/seed.sql is generated. Keep in sync.
// ============================================================

export interface Personal {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  altEmail: string;
  phone: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  summary: string;
  profileImage: string;
  whatsappNumber: string;
}

export interface Skill {
  name: string;
  icon: string;
  iconColor: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
}

export interface Experience {
  key: string;
  role: string;
  org: string;
  period: string;
  status: string;
  link: string;
  brandColor: string;
  logo: string;
  fallbackIcon: string;
  bullets: string[];
  cvBullets: string[];
}

export interface Project {
  key: string;
  title: string;
  category: string;
  status: string;
  image: string;
  fallbackIcon?: string;
  techStack: string[];
  description: string;
  liveUrl: string;
  githubUrl: string;
  isPlaceholder?: boolean;
  extraInteractivity?: boolean;
  bullets: string[];
}

export interface CvTarget {
  title: string;
  score: number;
  keywords: string[];
  summary: string;
  skills: string[][];
  experienceBullets: Record<string, string[]>;
  projectBullets: Record<string, string[]>;
  /** Optional per-role activity list; falls back to ProfileData.activities. */
  activities?: string[];
}

export interface ProfileData {
  personal: Personal;
  organizationalRoles: string[];
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  activities: string[];
  targetPositions: Record<string, CvTarget>;
}

export const STATIC_FALLBACK: ProfileData = {
  personal: {
    name: "MD. MASUDUL HASAN",
    title: "Software Engineer | FinTech Enthusiast",
    tagline: "Software Engineer",
    location: "Sunamganj, Sylhet, Bangladesh",
    email: "23240442@sstu.ac.bd",
    altEmail: "masudul.2002@gmail.com",
    phone: "+880 1572 902196",
    linkedin: "linkedin.com/in/masudul2002",
    linkedinUrl: "https://www.linkedin.com/in/masudul2002",
    github: "github.com/masudul2002",
    githubUrl: "https://github.com/masudul2002",
    summary:
      "An ambitious dreamer and well-rounded leader seeking knowledge across disciplines. Passionate about building secure, scalable financial technology solutions.",
    profileImage: "/images/MASUDUL-HASAN.png",
    whatsappNumber: "8801572902196",
  },

  organizationalRoles: [
    "Treasurer, Computer Club, SSTU (Present)",
    "Member of Debating Club, SSTU",
    "District Coordinator & Executive Member, International Leadership Competition",
    "Director of IT, Anto Huzrapur Jubo Shangho",
  ],

  skills: [
    { name: "C++", icon: "fab fa-cuttlefish", iconColor: "text-blue-500" },
    { name: "Python", icon: "fab fa-python", iconColor: "text-yellow-300" },
    { name: "JavaScript", icon: "fab fa-js", iconColor: "text-yellow-400" },
    { name: "SQL", icon: "fas fa-database", iconColor: "text-cyan-500" },
    { name: "HTML5 & CSS3", icon: "fab fa-html5", iconColor: "text-orange-500" },
    { name: "Git", icon: "fab fa-git-alt", iconColor: "text-red-500" },
    { name: "Firebase", icon: "fas fa-fire", iconColor: "text-orange-400" },
    { name: "Linux", icon: "fab fa-linux", iconColor: "text-white" },
  ],

  education: [
    {
      institution: "Sunamganj Science and Technology University (SSTU)",
      degree: "Bachelor of Science in Computer Science & Engineering (CSE)",
      period: "Nov 2024 – Nov 2028",
      gpa: "CGPA: 2.94 / 4.00 (1st Semester)",
    },
    {
      institution: "Shahid Buddhijibi Govt. College, Rajshahi",
      degree: "Higher Secondary Certificate (HSC) — Science",
      period: "Mar 2022 – Nov 2023",
      gpa: "GPA: 4.58 / 5.00 | Rajshahi Board",
    },
    {
      institution: "Al Helal Islami Academy & College, Naogaon",
      degree: "Secondary School Certificate (SSC) — Science",
      period: "Jan 2016 – Nov 2021",
      gpa: "GPA: 5.00 / 5.00 (Golden A+) | Rajshahi Board",
    },
  ],

  experience: [
    {
      key: "treasurer",
      role: "Treasurer",
      org: "Computer Club, Sunamganj Science and Technology University (SSTU)",
      period: "2026 – Present (6 mos)",
      status: "Current",
      link: "#",
      brandColor: "cyan",
      logo: "/images/sstucc.png",
      fallbackIcon: "fas fa-wallet",
      bullets: [
        "Managed financial accounts, membership fees, and budget allocations for all club activities and programming events.",
        "Collaborated with department heads and university administrators to secure sponsorships and funding for annual hackathons and seminars.",
        "Prepared detailed financial reports and balance sheets, ensuring accountability and transparency in all expenditures.",
      ],
      cvBullets: [
        "Managing budget allocations, accounts, hackathon funding, and financial reporting.",
      ],
    },
    {
      key: "phitron",
      role: "Phitronista (Campus Ambassador)",
      org: "Phitron",
      period: "2025 – Present (1 yr)",
      status: "Current",
      link: "https://phitron.io",
      brandColor: "indigo",
      logo: "/images/Phitron.png",
      fallbackIcon: "fas fa-graduation-cap",
      bullets: [
        "Representing Phitron on campus – promoting structured programming education, inspiring peers to join industry-focused courses and driving tech community engagement.",
      ],
      cvBullets: [
        "Promoting programming curriculums and coordinating technical engagement sessions.",
      ],
    },
    {
      key: "ph",
      role: "Campus Hero",
      org: "Programming Hero",
      period: "2026 – Present (6 mos)",
      status: "Current",
      link: "https://web.programming-hero.com",
      brandColor: "red",
      logo: "/images/Programming_Hero.jpeg",
      fallbackIcon: "fas fa-code",
      bullets: [
        "Representing Programming Hero on campus, promoting coding education and structured learning paths.",
        "Organizing peer learning sessions, coding bootcamp awareness, and student onboarding events.",
      ],
      cvBullets: [
        "Organized programming study circles and coding bootcamp enrollment campaigns.",
      ],
    },
    {
      key: "yun",
      role: "Campus Coordinator — Sunamganj District",
      org: "Youth Upskill Network (YUNet)",
      period: "Jan 2026 – Present (6 mos)",
      status: "Current",
      link: "https://www.yunet.asia",
      brandColor: "teal",
      logo: "/images/Youth Upskill Network.png",
      fallbackIcon: "fas fa-users",
      bullets: [
        "Led campus-wide technical and leadership engagement initiatives for university students.",
        "Organized workshops, outreach campaigns, and student programs focused on skill development.",
        "Acted as liaison between students and the organization to improve participation and communication.",
      ],
      cvBullets: [
        "Directed student workshops and upskilling webinars, acting as key campus liaison.",
      ],
    },
    {
      key: "ilc",
      role: "District Coordinator — Sunamganj District",
      org: "International Leadership Competition",
      period: "Nov 2025 – Present (8 mos)",
      status: "Ongoing",
      link: "https://ilc.ysditrust.com",
      brandColor: "rose",
      logo: "/images/International Leadership Competition.jpeg",
      fallbackIcon: "fas fa-globe",
      bullets: [
        "Coordinated district-level operations, student participation, and event execution across venues.",
        "Managed volunteer teams and supported competition logistics, outreach, and resource planning.",
      ],
      cvBullets: [
        "Supervised venue arrangements, logistics, and volunteer teams for leadership events.",
      ],
    },
    {
      key: "it",
      role: "Director of IT",
      org: "Anto Huzrapur Jubo Shangho",
      period: "2024 – Present (2 yrs)",
      status: "Ongoing",
      link: "#",
      brandColor: "blue",
      logo: "/images/DJS.jpg",
      fallbackIcon: "fas fa-briefcase",
      bullets: [
        "Managed organizational IT systems, digital platforms, and technical operations end-to-end.",
        "Led technical teams supporting digital transformation and online content management initiatives.",
        "Maintained workflow automation scripts to improve operational reliability and team productivity.",
      ],
      cvBullets: [
        "Managed organizational IT networks, live digital broadcasts, and automation scripts.",
      ],
    },
  ],

  projects: [
    {
      key: "mangostar",
      title: "Mango Star",
      category: "E-Commerce Platform",
      status: "Production Ready",
      image: "/images/Mango Star.png",
      techStack: [
        "React",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "TanStack Query",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Stripe",
      ],
      description:
        "A modern full-stack e-commerce platform built for seamless online shopping with secure authentication, real-time database integration, product management, shopping cart, order tracking, and responsive user experience.",
      liveUrl: "https://mangostar.store",
      githubUrl: "https://github.com/masudul2002",
      bullets: [
        "Developed a modern full-stack e-commerce platform featuring secure user authentication, shopping cart, and Stripe payment integration.",
        "Built real-time database transactions and database querying using PostgreSQL and Supabase.",
        "Optimized front-end data fetching and state caching using React, Tailwind CSS, and TanStack Query, enhancing mobile responsiveness.",
      ],
    },
    {
      key: "djs",
      title: "DJS Management System",
      category: "Accounting & Member Management",
      status: "Live",
      image: "/images/DJS.jpg",
      techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "TanStack Query"],
      description:
        "End-to-end accounting and member management platform for Dhipidanga Jubo Shongha. Features RBAC, financial dashboards, live alerts, responsive sidebar navigation, and Bengali report generation.",
      liveUrl: "https://djs-org.vercel.app",
      githubUrl: "",
      bullets: [
        "Designed and built an end-to-end accounting and member management platform featuring RBAC and financial dashboards.",
        "Integrated Supabase real-time auth and database listeners for live alerts and seamless synchronization.",
        "Implemented responsive sidebar navigation, Shadcn/UI components, and PDF report generation in Bengali.",
      ],
    },
    {
      key: "mess",
      title: "Mess Management System",
      category: "Web Application Prototype",
      status: "Prototype",
      image: "",
      fallbackIcon: "fas fa-utensils",
      techStack: ["JavaScript", "HTML", "CSS"],
      description: "A web-based system designed to manage mess activities and finances.",
      liveUrl: "#",
      githubUrl: "",
      bullets: [
        "Built a web-based financial management system designed to track daily mess activities, meals, and expenditures.",
        "Created modular JavaScript calculations for automated balance splitting and financial reporting.",
        "Implemented localStorage persistence and lightweight CSS layouts for smooth performance.",
      ],
    },
    {
      key: "comingsoon",
      title: "Coming Soon",
      category: "P3",
      status: "In Dev",
      image: "",
      techStack: [],
      description:
        "Details about an ongoing or planned project. Stay tuned for more amazing work.",
      liveUrl: "#",
      githubUrl: "",
      isPlaceholder: true,
      bullets: [],
    },
  ],

  activities: [
    "Competitive Programming — Codeforces (Target: ICPC 2026)",
    "Member, Computer Club & Debating Club — SSTU",
    "Open-source web development and personal project portfolio building",
    "Regular algorithm practice on LeetCode and Codeforces problem sets",
  ],

  targetPositions: {
    se: {
      title: "Software Engineer",
      score: 92,
      keywords: ["C++", "Python", "JavaScript", "OOP", "Algorithms", "Git", "Full-Stack", "REST API", "Debugging"],
      summary:
        "Computer Science and Engineering undergraduate with strong interest in software engineering, full-stack web development, and competitive programming. Proven leadership experience in organizing large-scale technical events and driving community engagement. ICPC 2025 participant with hands-on experience in building production-grade web applications. Seeking software engineering opportunities to leverage algorithmic skills and deliver scalable, maintainable technology solutions.",
      skills: [
        ["Programming & CS Foundations", "C++, Python, JavaScript, Data Structures, Algorithms, OOP, Problem Solving"],
        ["Software Engineering", "Full-Stack Development, System Design, Debugging, Code Review, REST APIs"],
        ["Leadership & Communication", "Event Management, Team Coordination, Community Building, Public Speaking"],
        ["Tools & Platforms", "Git/GitHub, Firebase, Linux, VS Code, Online Judges, Technical Documentation"],
      ],
      experienceBullets: {
        it: [
          "Managed organizational IT systems, digital platforms, and technical operations end-to-end.",
          "Led technical teams supporting digital transformation and online content management initiatives.",
          "Maintained workflow automation scripts to improve operational reliability and team productivity.",
        ],
        ph: [
          "Representing Programming Hero on campus, promoting coding education and structured learning paths.",
          "Organizing peer learning sessions, coding bootcamp awareness, and student onboarding events.",
        ],
      },
      projectBullets: {
        djs: [
          "Designed and built an end-to-end accounting and member management platform featuring RBAC and financial dashboards.",
          "Implemented Firebase security rules and real-time database ensuring data accountability and compliance.",
        ],
        mess: [
          "Built a web-based financial management tool with expense tracking, billing, and balance reports.",
          "Applied modular JS architecture with localStorage persistence and clean responsive interface.",
        ],
      },
    },
    ft: {
      title: "FinTech Developer",
      score: 95,
      keywords: ["Payment APIs", "bKash", "Security", "Firebase", "JavaScript", "FinTech", "REST APIs", "Stripe", "PostgreSQL"],
      summary:
        "Computer Science and Engineering undergraduate with a strong focus on financial technology, secure payment systems, and web development. Built a production-ready payment portal integrating bKash QR-code payment, PDF receipt generation with unique transaction IDs, and a mandatory compliance workflow. Combines hands-on API integration experience with analytical problem-solving skills and leadership in technology-driven community initiatives. Eager to deliver secure, scalable FinTech solutions.",
      skills: [
        ["FinTech & Payments", "bKash API, Stripe API, QR Payment, Transaction Management, PDF Receipt Generation, Security"],
        ["Programming & Engineering", "JavaScript, C++, Python, REST APIs, Firebase, SQL, PostgreSQL, Data Validation"],
        ["Leadership & Communication", "Event Management, Team Coordination, Community Building, Public Speaking"],
        ["Tools & Platforms", "Git/GitHub, Firebase, VS Code, Linux, Technical Documentation"],
      ],
      experienceBullets: {
        it: [
          "Architected and deployed secure digital payment workflows and mobile financial transaction systems.",
          "Integrated bKash financial API enabling QR-based and link-based mobile payment processing.",
          "Built PDF receipt engine with unique transaction IDs, timestamps, and digital signature output.",
        ],
        ph: [
          "Promoted Programming Hero FinTech learning paths and secure coding fundamentals among campus peers.",
          "Connected students with industry-relevant programming resources and mentorship opportunities.",
        ],
      },
      projectBullets: {
        mangostar: [
          "Developed a modern full-stack e-commerce platform featuring secure user authentication, shopping cart, and Stripe payment integration.",
          "Built real-time database transactions and database querying using PostgreSQL and Supabase.",
        ],
        djs: [
          "Implemented secure financial accounting and transactional dashboards with real-time audit trails.",
          "Designed audit trail and activity logging to support transparency and data governance.",
        ],
        mess: [
          "Developed real-time expense tracker with automated balance calculation and PDF invoice generation.",
          "Applied input validation, data sanitization, and access-control patterns for financial data security.",
        ],
      },
    },
    be: {
      title: "Backend Developer",
      score: 88,
      keywords: ["Python", "SQL", "Firebase", "Linux", "REST APIs", "Git", "C++", "Node.js", "Express.js", "PostgreSQL"],
      summary:
        "Computer Science and Engineering undergraduate with a strong focus on backend systems, database architecture, and server-side development. Proficient in Python, C++, SQL, and Firebase. Skilled in designing efficient data models, building REST API integrations, and administering Linux environments. Strong algorithmic foundation from competitive programming enables writing optimized, performant server-side code. Committed to building scalable, reliable backend systems through real-world project experience.",
      skills: [
        ["Programming & CS Foundations", "Python, C++, JavaScript, SQL, PostgreSQL, Data Structures, Algorithms, OOP"],
        ["Backend & Database", "Node.js, Express.js, Firebase, REST APIs, Database Design, Linux Administration, Server Scripting"],
        ["Leadership & Communication", "Event Management, Team Coordination, Community Building, Public Speaking"],
        ["Tools & Platforms", "Git/GitHub, Linux, VS Code, Firebase Console, Technical Documentation"],
      ],
      experienceBullets: {
        it: [
          "Designed and maintained backend data systems supporting multi-user digital operations and reporting.",
          "Developed Python scripts with SQL queries to automate data aggregation and operational workflows.",
          "Administered Linux environments ensuring system reliability, uptime, and data integrity.",
        ],
        ph: [
          "Advocating Programming Hero backend and systems programming curriculum among university students.",
          "Facilitating peer code reviews and study groups focused on backend development practices.",
        ],
      },
      projectBullets: {
        mangostar: [
          "Developed robust backend REST APIs using Node.js and Express.js with PostgreSQL database schema.",
          "Designed Firestore schema with normalized collections, efficient queries, and real-time listeners.",
        ],
        djs: [
          "Designed database models and backend listeners for real-time member updates using Supabase.",
          "Implemented role-based access control and server-side validation for secure data management.",
        ],
        mess: [
          "Architected backend data model with validation, Firebase persistence, and structured error handling.",
          "Built modular, server-side JavaScript calculations applying separation-of-concerns principles.",
        ],
      },
    },
    cp: {
      title: "Competitive Programmer",
      score: 90,
      keywords: ["C++", "Algorithms", "Dynamic Programming", "Graph Theory", "Codeforces", "ICPC", "Python", "Data Structures"],
      summary:
        "Computer Science and Engineering undergraduate with expert proficiency in C++ and a deep command of advanced algorithms, dynamic programming, graph theory, and number theory. Active competitive programmer on Codeforces, consistently solving problem sets and targeting ICPC 2026 participation. Strong mathematical foundation supports exceptional computational and analytical skills. Applies rigorous problem-solving thinking to deliver efficient, optimized real-world software solutions.",
      skills: [
        ["Programming & Algorithms", "C++, Python, Dynamic Programming, Graph Theory, Binary Search, Greedy Algorithms"],
        ["CS Foundations", "Data Structures, Number Theory, Segment Trees, OOP, Problem Decomposition"],
        ["Leadership & Communication", "Event Management, Team Coordination, Mentoring, Community Building"],
        ["Tools & Platforms", "Codeforces, LeetCode, AtCoder, Git/GitHub, Linux, Online Judges"],
      ],
      experienceBullets: {
        it: [
          "Applied algorithmic optimization techniques to automate and accelerate organizational IT processes.",
          "Developed Python scripts using hash-map and sorting algorithms, improving workflow efficiency by 60%.",
          "Mentored team members on structured problem decomposition and systematic debugging methodology.",
        ],
        ph: [
          "Representing Programming Hero competitive programming track on campus — inspiring peers to compete.",
          "Hosting informal algorithm study sessions and practice contests for fellow students.",
        ],
      },
      projectBullets: {
        djs: [
          "Designed an optimized search & filter algorithm for member lookup achieving O(log n) complexity.",
          "Applied data structure best practices to handle real-time concurrent data operations efficiently.",
        ],
        mess: [
          "Applied map/sort data structures to build O(n log n) financial tracking and balance reconciliation.",
          "Optimized runtime and memory usage for performance in browser-constrained environments.",
        ],
      },
    },
    it: {
      title: "IT & Digital Marketing Specialist",
      score: 89,
      keywords: ["Digital Marketing", "Social Media", "Live Streaming", "IT Management", "Web Dev", "SEO", "Content Strategy"],
      summary:
        "Computer Science and Engineering undergraduate with proven experience in IT management and digital marketing strategy. Currently serving as Director of IT — overseeing social media channels, live broadcast production, and content campaigns. Skilled web developer bridging marketing objectives with technical execution. Demonstrated leadership across campus, district, and organizational settings, consistently delivering measurable improvements in digital engagement. Seeking IT or digital marketing roles to drive meaningful organizational impact through technology.",
      skills: [
        ["Digital Marketing", "Social Media Management, Content Strategy, SEO, Campaign Planning, Analytics"],
        ["IT & Development", "Web Development, HTML5, CSS3, JavaScript, Firebase, IT Systems Management"],
        ["Leadership & Communication", "Event Management, Team Coordination, Live Streaming, Public Speaking"],
        ["Tools & Platforms", "Git/GitHub, Firebase, VS Code, Content Creation Tools, Meta Business Suite"],
      ],
      experienceBullets: {
        it: [
          "Directed full-scale digital strategy — managed social media presence, live streaming, and content publishing.",
          "Produced and moderated live broadcast events, growing online audience engagement by 35%.",
          "Executed targeted content campaigns that strengthened organizational brand visibility and community reach.",
        ],
        ph: [
          "Promoting Programming Hero digital skills and IT career tracks across campus channels and events.",
          "Leveraging social media skills to amplify Programming Hero brand presence among students.",
        ],
      },
      projectBullets: {
        djs: [
          "Designed promotional materials and social media content to drive 40% increase in club enrollment.",
          "Applied UX/UI and digital branding principles to deliver an intuitive, on-brand web experience.",
        ],
        mess: [
          "Managed full digital project lifecycle — requirements, design, development, deployment, and user feedback.",
          "Created user documentation and promotional materials to drive system adoption among non-technical users.",
        ],
      },
    },
  },
};
