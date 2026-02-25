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
    { name: "Vue/Nuxt", level: 78, category: "frontend" },
    { name: "Tailwind CSS", level: 94, category: "frontend" },
  ],
  backend: [
    { name: "Node.js", level: 90, category: "backend" },
    { name: "REST/GraphQL", level: 88, category: "backend" },
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
    { name: "iOS/Swift", level: 60, category: "mobile" },
    { name: "Android/Kotlin", level: 58, category: "mobile" },
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
    id: "1",
    title: "E-commerce PWA",
    description:
      "High-performance Progressive Web App for e-commerce with offline capabilities and push notifications.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    metrics: { performance: 100, seo: 100, uptime: 99.9 },
    implementations: [
      "Server-side rendering for SEO",
      "Stripe integration for payments",
      "Redis caching for product data",
      "Incremental Static Regeneration",
      "Image optimization with WebP/AVIF",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "2",
    title: "Real-time Collaboration Platform",
    description:
      "WebSocket-based collaborative workspace for remote teams with real-time editing and video calls.",
    image: "/projects/collaboration.jpg",
    tags: ["React", "Socket.io", "WebRTC", "MongoDB"],
    metrics: { performance: 98, seo: 95, uptime: 100 },
    implementations: [
      "WebSocket bi-directional communication",
      "CRDT conflict resolution",
      "Custom video streaming",
      "End-to-end encryption",
      "Mobile-first responsive design",
    ],
    liveUrl: "https://example.com",
  },
  {
    id: "3",
    title: "AI Analytics Dashboard",
    description:
      "Machine learning powered analytics platform with predictive insights and automated reporting.",
    image: "/projects/analytics.jpg",
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
