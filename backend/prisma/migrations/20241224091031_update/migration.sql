/*
  Warnings:

  - You are about to drop the column `posterImg` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `FavoriteMovie` table. All the data in the column will be lost.
  - Added the required column `posterUrl` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FavoriteMovie_title_key";

-- AlterTable
ALTER TABLE "FavoriteMovie" DROP COLUMN "posterImg",
DROP COLUMN "releaseYear",
ADD COLUMN     "posterUrl" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
