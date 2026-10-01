import { z } from "zod";
import { PROJECT_CATEGORIES } from "@/lib/config/site";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const optionalUrl = z.string().url("Invalid URL").or(z.literal("")).nullish();

export const projectSchema = z.object({
  // Default language (English)
  title: z.string().trim().min(2, "Title must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  implementations: z.array(z.string()),
  // French translation (optional, falls back to the English content)
  titleFr: z.string().trim().optional(),
  descriptionFr: z.string().trim().optional(),
  implementationsFr: z.array(z.string()),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Lowercase letters, numbers and hyphens only",
    ),
  image: z.string().nullish(),
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  category: z.enum(PROJECT_CATEGORIES),
  clientName: z.string().trim().nullish(),
  year: z.number().int().min(2000).max(2100).nullish(),
  tags: z.array(z.string()),
  published: z.boolean(),
  featured: z.boolean(),
  sortOrder: z.number().int(),
  performanceScore: z.number().min(0).max(100),
  seoScore: z.number().min(0).max(100),
  uptimeScore: z.number().min(0).max(100),
});

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  role: z.string().trim().min(2, "Role is required"),
  bioEn: z.string().trim(),
  bioFr: z.string().trim(),
  image: z.string().nullish(),
  skills: z.array(z.string()),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  twitterUrl: optionalUrl,
  published: z.boolean(),
  sortOrder: z.number().int(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
