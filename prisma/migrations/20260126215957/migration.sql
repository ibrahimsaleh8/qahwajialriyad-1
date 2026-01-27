/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "projects_id_idx";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_projectId_key" ON "projects"("projectId");

-- CreateIndex
CREATE INDEX "projects_projectId_idx" ON "projects"("projectId");
