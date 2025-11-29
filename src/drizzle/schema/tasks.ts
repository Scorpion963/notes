import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { notes } from "./notes";

export const TASK_STATUSES = ["pending", "completed"] as const;
export type TaskStatusesType = (typeof TASK_STATUSES)[number];
export const taskStatusesEnum = pgEnum("task_statuses", TASK_STATUSES);

export const tasks = pgTable("tasks_table", {
  id: uuid("task_id").notNull().defaultRandom(),
  name: text().notNull(),
  status: taskStatusesEnum().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  noteId: uuid("note_id").notNull(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  note: one(notes, {
    fields: [tasks.noteId],
    references: [notes.id],
  }),
}));
