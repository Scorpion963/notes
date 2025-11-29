import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tasks } from "./tasks";

export const NOTE_STATUSES = ["pending", "in_progress", "completed"] as const;
export type NoteStatusType = (typeof NOTE_STATUSES)[number];
export const noteStatusEnum = pgEnum("note_status", NOTE_STATUSES);

export const notes = pgTable("notes_table", {
  id: uuid("note_id").defaultRandom(),
  name: text("note_name").notNull(),
  status: noteStatusEnum().notNull(),
  description: text("note_description").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const notesRelations = relations(notes, ({ many }) => ({
  tasks: many(tasks),
}));
