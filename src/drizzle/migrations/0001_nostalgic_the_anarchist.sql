CREATE TYPE "public"."note_status" AS ENUM('pending', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."task_statuses" AS ENUM('pending', 'completed');--> statement-breakpoint
CREATE TABLE "tasks_table" (
	"task_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"status" "task_statuses" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"note_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notes_table" ADD COLUMN "note_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes_table" ADD COLUMN "status" "note_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "notes_table" ADD COLUMN "note_description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes_table" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "notes_table" ADD COLUMN "updatedAt" timestamp with time zone NOT NULL;