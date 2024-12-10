-- CreateEnum
CREATE TYPE "roles" AS ENUM ('CLIENT', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "roles" NOT NULL DEFAULT 'CLIENT';
