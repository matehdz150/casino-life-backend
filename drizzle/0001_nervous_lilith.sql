ALTER TABLE "users" RENAME COLUMN "password" TO "password_hash";--> statement-breakpoint
ALTER TABLE "game_records" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "game_records" ALTER COLUMN "game" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "game_records" ALTER COLUMN "result" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "game_records" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "coins" SET DEFAULT 100;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;