export const siteConfig = {
  name: "Woptimoz Soft",
  shortName: "WS",
  email: "contact@woptimozsoft.com",
  whatsappNumber: "237654797781",
} as const;

export const PROJECT_CATEGORIES = [
  "web",
  "mobile",
  "saas",
  "dashboard",
  "other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** Turns "Belair Santé — Web App" into "belair-sante-web-app". */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
