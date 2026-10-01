-- Team roles are always displayed in English: keep roleEn as "role", drop the French variant.
ALTER TABLE "TeamMember" RENAME COLUMN "roleEn" TO "role";
ALTER TABLE "TeamMember" DROP COLUMN "roleFr";
