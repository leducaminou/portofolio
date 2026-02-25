import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please provide a valid image URL").optional().nullable(),
  liveUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")).nullable(),
  githubUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")).nullable(),
  published: z.boolean(),
  performanceScore: z.number().min(0).max(100),
  seoScore: z.number().min(0).max(100),
  uptimeScore: z.number().min(0).max(100),
  implementations: z.array(z.string()),
});

export type ProjectInput = z.infer<typeof projectSchema>;
