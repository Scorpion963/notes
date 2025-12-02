"use server";

import { db } from "@/drizzle/drizzle";
import {
  notes,
  TASK_STATUSES,
  tasks,
  TaskStatusesType,
} from "@/drizzle/schema";
import z from "zod";

const TaskSchema = z.object({
  name: z.string().min(1),
  status: z.enum(TASK_STATUSES),
});

const EMPTY_TASK_ERROR_MESSAGE = "The note is empty! Add description or a task";
const noteSchema = z
  .object({
    name: z.string().min(1),
    description: z.string(),
    tasks: z.array(TaskSchema).default([]),
  })
  .superRefine((val, ctx) => {
    if (!val.description && (!val.tasks || val.tasks.length < 1)) {
      ctx.addIssue({
        code: "custom",
        message: EMPTY_TASK_ERROR_MESSAGE,
        path: ["description"],
      });

      ctx.addIssue({
        code: "custom",
        message: EMPTY_TASK_ERROR_MESSAGE,
        path: ["tasks"],
      });
    }
  });

export async function addNote(unknownData: unknown) {
  const { success, error, data } = noteSchema.safeParse(unknownData);
  if (!success) {
    return { error: "Validation failed", success: false };
  }
  try {
    await addNoteDB(data!);
  } catch {
    return {error: "500 Internal Error", success: false}
  }

  return {success: true}
}

async function addNoteDB(note: z.infer<typeof noteSchema>) {
  return await db.transaction(async (tx) => {
    const noteStatus: TaskStatusesType = note.tasks.some(
      (item) => item.status === "pending"
    )
      ? "pending"
      : "completed";
    const [noteId] = await tx
      .insert(notes)
      .values({
        description: note.description,
        name: note.name,
        status: noteStatus,
      })
      .returning({ id: notes.id });

    if (noteId.id === null) throw new Error("Error adding note to DB");

    const newTasks: (typeof tasks.$inferInsert)[] = note.tasks.map((item) => {
      return {
        name: item.name,
        noteId: noteId.id!,
        status: item.status,
      };
    });
    await tx.insert(tasks).values(newTasks);
  });
}
