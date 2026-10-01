import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { usersData } from "./data";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  for (const u of usersData) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashedPassword },
      create: { email: u.email, password: hashedPassword },
    });
    console.log(`User created or updated: ${user.email}`);
  }

  // Real projects previously hardcoded in the front-end (the placeholder "AI Analytics" one is intentionally dropped)
  const projects = [
    {
      slug: "belair-sante",
      title: "Belair Santé — Health Insurance Management",
      description:
        "A comprehensive multi-role health insurance management platform enabling end-to-end management of insured members, healthcare providers, coverage approvals, medical billing, and reimbursements with high security and scalability.",
      image: "/projects/belair-sante.webp",
      liveUrl: "https://belairsante.com/",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Docker"],
      performanceScore: 85,
      seoScore: 65,
      uptimeScore: 87.9,
      implementations: [
        "Multi-role architecture (Administrator, Claims Manager, Healthcare Provider, Insured Member)",
        "Coverage request generation and validation with approval workflow",
        "Full medical invoice management (submission, review, validation, rejection)",
        "Reimbursement processing with detailed status tracking and history",
        "Real-time analytical dashboards and reporting",
        "Financial and operational report export (PDF/Excel)",
      ],
      fr: {
        title: "Belair Santé — Gestion d'Assurance Maladie",
        description:
          "Une plateforme complète de gestion d'assurance maladie multi-rôles permettant la gestion de bout en bout des assurés, prestataires de soins, approbations de couverture, facturation médicale et remboursements.",
        implementations: [
          "Architecture multi-rôles (Administrateur, Gestionnaire de sinistres, Prestataire, Assuré)",
          "Génération et validation des demandes de prise en charge avec workflow d'approbation",
          "Gestion complète des factures médicales (soumission, révision, validation, rejet)",
          "Traitement des remboursements avec suivi détaillé et historique",
          "Tableaux de bord analytiques en temps réel et rapports",
          "Export de rapports financiers et opérationnels (PDF/Excel)",
        ],
      },
      sortOrder: 1,
    },
    {
      slug: "crypcrypto",
      title: "Cr Crypto — Investment Platform",
      description:
        "A modern web-based investment platform designed to manage user portfolios, transactions, and financial growth with real-time analytics, secure authentication, and scalable infrastructure.",
      image: "/projects/crypcrypto.webp",
      liveUrl: "https://www.crypcrypto.com/",
      githubUrl: "https://github.com/leducaminou/crypcrypto",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Docker"],
      performanceScore: 84,
      seoScore: 75,
      uptimeScore: 88.7,
      implementations: [
        "Secure multi-role architecture (Administrator, Investor, Financial Manager)",
        "User onboarding with KYC verification workflow",
        "Investment plan management with dynamic return calculation",
        "Portfolio tracking with real-time profit/loss analytics",
        "Transaction management (deposits, withdrawals, transfers)",
        "Automated earnings distribution system",
      ],
      fr: {
        title: "Cr Crypto — Plateforme d'Investissement",
        description:
          "Une plateforme d'investissement web moderne conçue pour gérer les portefeuilles, transactions et croissance financière avec des analyses en temps réel, une authentification sécurisée et une infrastructure évolutive.",
        implementations: [
          "Architecture multi-rôles sécurisée (Administrateur, Investisseur, Gestionnaire financier)",
          "Onboarding des utilisateurs avec workflow de vérification KYC",
          "Gestion des plans d'investissement avec calcul dynamique des rendements",
          "Suivi de portefeuille avec analyses profits/pertes en temps réel",
          "Gestion des transactions (dépôts, retraits, transferts)",
          "Système de distribution automatisée des gains",
        ],
      },
      sortOrder: 2,
    },
  ];

  for (const { fr, ...p } of projects) {
    const data = { ...p, category: "web", published: true };
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: data,
    });
    await prisma.projectTranslation.upsert({
      where: { projectId_locale: { projectId: project.id, locale: "fr" } },
      update: {},
      create: { projectId: project.id, locale: "fr", ...fr },
    });
  }
  console.log(`Projects seeded: ${projects.length}`);

  // Team members — image left null: the UI shows a 1:1 placeholder until a photo is uploaded from the admin.
  const team = [
    {
      name: "Aminou Mohamadou",
      role: "Senior Software Developer",
      sortOrder: 1,
    },
    {
      name: "Remy Nguela",
      role: "Software Developer",
      sortOrder: 2,
    },
    {
      name: "Adrien Mandak",
      role: "Software Developer",
      sortOrder: 3,
    },
  ];

  for (const m of team) {
    // No unique key on name: findFirst keeps the seed idempotent and never overwrites admin edits.
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!existing) await prisma.teamMember.create({ data: m });
  }
  console.log(`Team members seeded: ${team.length}`);
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
