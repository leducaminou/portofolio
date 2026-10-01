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
export type StackCategory =
  | "all"
  | "frontend"
  | "backend"
  | "devops"
  | "mobile"
  | "design";

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
    { name: "HTML/CSS/JS", level: 90, category: "frontend" },
  ],
  backend: [
    { name: "Python", level: 90, category: "backend" },
    { name: "FastAPI", level: 90, category: "backend" },
    { name: "Node.js", level: 90, category: "backend" },
    { name: "Laravel", level: 85, category: "backend" },
    { name: "REST APIs", level: 90, category: "backend" },
    { name: "PostgreSQL", level: 85, category: "backend" },
  ],
  devops: [
    { name: "Git & GitHub", level: 92, category: "devops" },
    { name: "CI/CD (GitHub Actions)", level: 85, category: "devops" },
    { name: "Docker", level: 85, category: "devops" },
    { name: "Deployment (Vercel, VPS, AWS)", level: 88, category: "devops" },
    { name: "Monitoring", level: 78, category: "devops" },
  ],
  mobile: [
    { name: "React Native", level: 82, category: "mobile" },
    { name: "Flutter", level: 75, category: "mobile" },
  ],
  design: [
    { name: "UI/UX Design", level: 85, category: "design" },
    { name: "Figma & Prototyping", level: 85, category: "design" },
    { name: "Code Review & QA", level: 85, category: "design" },
  ],
};

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
