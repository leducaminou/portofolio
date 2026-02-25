import {
  Globe,
  Smartphone,
  BarChart3,
  Layout,
  MonitorSmartphone,
  Zap,
  Shield,
  Code2,
  CheckCircle,
  Box,
} from "lucide-react";

// ═══════════════════════════════════════════════════════
// SERVICES DATA
// ═══════════════════════════════════════════════════════
export const servicesData = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Modern, responsive web apps built with Next.js, React, and TypeScript for optimal performance.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications with Flutter and React Native for iOS & Android.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: BarChart3,
    title: "SaaS Platforms",
    description:
      "Scalable SaaS solutions with multi-tenancy, billing, and analytics built-in.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Layout,
    title: "Dashboards",
    description:
      "Data-rich admin panels and dashboards with real-time updates and beautiful charts.",
    gradient: "from-amber-500 to-orange-600",
  },
];

// ═══════════════════════════════════════════════════════
// TECH STACK DATA
// ═══════════════════════════════════════════════════════
export type StackCategory = "all" | "frontend" | "backend" | "devops" | "mobile";

export interface TechItem {
  name: string;
  level: number;
  category: StackCategory;
}

export const techStackData: Record<string, TechItem[]> = {
  frontend: [
    { name: "React/Next.js", level: 95, category: "frontend" },
    { name: "TypeScript", level: 92, category: "frontend" },
    { name: "Tailwind CSS", level: 94, category: "frontend" },
    { name: "HTML/CSS/JS", level: 78, category: "frontend" },
  ],
  backend: [
    { name: "FastAPI", level: 90, category: "backend" },
    { name: "Node.js", level: 90, category: "backend" },
    { name: "Laravel", level: 90, category: "backend" },
    { name: "REST", level: 88, category: "backend" },
    { name: "PostgreSQL", level: 85, category: "backend" },
    { name: "Docker & DevOps", level: 80, category: "backend" },
  ],
  devops: [
    { name: "Full Performance", level: 92, category: "devops" },
    { name: "CI/CD", level: 85, category: "devops" },
    { name: "AWS/Vercel", level: 88, category: "devops" },
    { name: "Monitoring", level: 78, category: "devops" },
  ],
  mobile: [
    { name: "React Native", level: 82, category: "mobile" },
    { name: "Flutter", level: 75, category: "mobile" },
  ],
};

// ═══════════════════════════════════════════════════════
// PROJECTS DATA
// ═══════════════════════════════════════════════════════
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  metrics: {
    performance: number;
    seo: number;
    uptime: number;
  };
  implementations: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
  id: "2",
  title: "Belair Santé - Health Insurance Management Web Application",
  description:
    "A comprehensive multi-role health insurance management web application enabling end-to-end management of insured members, healthcare providers, coverage approvals, medical billing, and reimbursements with high security, scalability, and performance.",
  image: "/projects/belair-sante.webp",
  tags: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "PostgreSQL",
    "Docker",
  ],
  metrics: { performance: 85, seo: 65, uptime: 87.9 },
  implementations: [
    "Multi-role architecture (Administrator, Claims Manager, Healthcare Provider, Insured Member)",
    "Coverage request generation and validation with approval workflow",
    "Full medical invoice management (submission, review, validation, rejection)",
    "Reimbursement processing with detailed status tracking and history",
    "Real-time analytical dashboards and reporting",
    "Financial and operational report export (PDF/Excel)",
  ],
  liveUrl: "https://belairsante.com/"
},
  {
  id: "2",
  title: "Cr Crypto – Investment Platform",
  description:
    "A modern web-based investment platform designed to manage user portfolios, transactions, and financial growth with real-time analytics, secure authentication, and scalable infrastructure.",
  image: "/projects/crypcrypto.webp",
  tags: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "PostgreSQL",
    "Docker"
  ],
  metrics: { performance: 84, seo: 75, uptime: 88.7 },
  implementations: [
    "Secure multi-role architecture (Administrator, Investor, Financial Manager)",
    "User onboarding with KYC verification workflow",
    "Investment plan management with dynamic return calculation",
    "Portfolio tracking with real-time profit/loss analytics",
    "Transaction management (deposits, withdrawals, transfers)",
    "Automated earnings distribution system",
  ],
  liveUrl: "https://www.crypcrypto.com/",
  githubUrl: "https://github.com/leducaminou/crypcrypto"
},
  {
    id: "3",
    title: "AI Analytics Dashboard",
    description:
      "Machine learning powered analytics platform with predictive insights and automated reporting.",
    image: "",
    tags: ["Vue.js", "Python", "TensorFlow", "PostgreSQL"],
    metrics: { performance: 96, seo: 90, uptime: 99.8 },
    implementations: [
      "Real-time data visualization with D3.js",
      "ML model integration for predictions",
      "Automated PDF report generation",
      "Role-based access control",
      "Custom query builder UI",
    ],
  },
];

// ═══════════════════════════════════════════════════════
// CAPABILITIES DATA
// ═══════════════════════════════════════════════════════
export const capabilitiesData = [
  {
    icon: Box,
    title: "WebGL & 3D",
    items: ["Three.js", "React Three Fiber", "GLSL Shaders"],
  },
  {
    icon: MonitorSmartphone,
    title: "Progressive Web Apps",
    items: ["Offline support", "Push Notifications", "App-like experience"],
  },
  {
    icon: Zap,
    title: "Real-time Features",
    items: ["WebSockets", "Server-Sent Events", "Optimistic updates"],
  },
  {
    icon: CheckCircle,
    title: "Browser APIs",
    items: ["File System Access", "Web Bluetooth", "WebAssembly"],
  },
  {
    icon: BarChart3,
    title: "Performance",
    items: ["Code splitting", "Lazy loading", "Edge caching"],
  },
  {
    icon: Shield,
    title: "Security",
    items: ["OWASP Top 10", "CSP configuration", "Auth best practices"],
  },
];

// ═══════════════════════════════════════════════════════
// PROCESS STEPS
// ═══════════════════════════════════════════════════════
export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your business goals, target audience, and technical requirements.",
  },
  {
    step: "02",
    title: "Design",
    description: "Creating wireframes, UI/UX design and interactive prototypes for your approval.",
  },
  {
    step: "03",
    title: "Development",
    description: "Building with modern stack, clean code, and best practices for scalability.",
  },
  {
    step: "04",
    title: "Testing & Launch",
    description: "Rigorous QA, performance optimization, and smooth deployment to production.",
  },
];

// ═══════════════════════════════════════════════════════
// ADMIN FAKE DATA
// ═══════════════════════════════════════════════════════
export const adminStats = {
  totalProjects: 12,
  totalTechnologies: 24,
  totalMessages: 47,
  publishedProjects: 8,
};
