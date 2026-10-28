export const profile = {
  name: "Zarak Ahmad",
  word: "PORTFOLIO",
  nameWord: "ZARAK",
  role: "Full-Stack Developer",
  location: "Islamabad, Pakistan",
  phoneDisplay: "+92 321 6271021",
  phoneHref: "tel:+923216271021",
  whatsapp: "https://wa.me/923216271021",
  email: "zarakahmad0@gmail.com",
  linkedin: "https://www.linkedin.com/in/zarak-ahmad/",
  github: "https://github.com/zarak-ahmad",
  upwork: "https://www.upwork.com/freelancers/~017b2827d3829ff4a1",
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const skillGroups = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "Laravel", "PHP", "REST APIs"],
  },
  {
    label: "Data & auth",
    items: ["MongoDB", "MySQL", "SQLite", "JWT", "Role-based access"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Docker", "Vite"],
  },
];

export const projects = [
  {
    index: "01",
    title: "Library Management System",
    image: "/library-boks-module.png",
    stack: "React · Node.js · Express · MongoDB",
    summary:
      "A MERN library platform with Admin, Librarian, and Student portals. Students browse, request, and reserve books. Staff issue and return them, and the system tracks fines, overdue items, support tickets, and reports. Sign-in uses JWT, and each role only sees what it is allowed to use.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/zarak-ahmad/library-management-system",
      },
      {
        label: "Upwork",
        href: "https://www.upwork.com/freelancers/~017b2827d3829ff4a1",
      },
    ],
  },
  {
    index: "02",
    title: "Inventory Management System",
    image: "/inventory-dashboard.png",
    stack: "Laravel · PHP · Bootstrap · SQLite",
    summary:
      "A Laravel shop system with role-based access for admins, managers, inventory staff, and cashiers. The point of sale takes a sale by name, SKU, or barcode and reduces stock as the invoice is saved. It also covers suppliers, low-stock alerts, reports, backups, and audit logs.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/zarak-ahmad/inventory-management-system",
      },
      {
        label: "Upwork",
        href: "https://www.upwork.com/freelancers/~017b2827d3829ff4a1",
      },
    ],
  },
];

export const experience = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Upwork",
    when: "Current",
    points: [
      "Laravel, PHP, and MERN work: web applications, web stores with admin panels, mobile applications, REST APIs, dashboards, and SaaS features.",
      "Portfolio projects are the library system and the Laravel inventory system with role-based access.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Naxovate Technologies",
    when: "April 2026 — Present",
    points: [
      "Building web applications, including AI-integrated features.",
      "Working across MERN and Laravel, from the interface through the API.",
      "Using Git and GitHub for version control and collaboration.",
    ],
  },
  {
    role: "Media & Tech Volunteer",
    company: "Agile Pakistan — ACP26",
    when: "2026",
    points: [
      "Volunteered on the media and tech team for Agile Conference Pakistan.",
      "Contributed as a full-stack MERN developer alongside the digital team.",
    ],
  },
];

export const education = [
  {
    title: "B.S. Computer Science",
    place: "Virtual University of Pakistan",
    when: "March 2023 — Present",
  },
  {
    title: "I.C.S.",
    place: "B.I.S.E Gujranwala",
    when: "2019 — 2021",
  },
  {
    title: "Matriculation",
    place: "B.I.S.E Gujranwala",
    when: "2017 — 2019",
  },
];

export const certificates = [
  {
    title: "IBM Full Stack Certificate",
    when: "September 2026",
  },
  {
    title: "Information Technology",
    place: "Professional Skills Science Council",
    when: "March 2022 — August 2022",
  },
];

export const languages = ["English", "Urdu", "Hindi"];
