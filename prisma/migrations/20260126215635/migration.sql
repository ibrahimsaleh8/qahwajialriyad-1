/*
  Warnings:

  - You are about to drop the column `projectId` on the `projects` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "projects_projectId_idx";

-- DropIndex
DROP INDEX "projects_projectId_key";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "projectId";

-- CreateIndex
CREATE INDEX "projects_id_idx" ON "projects"("id");
