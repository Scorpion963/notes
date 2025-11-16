import { pgTable, uuid } from "drizzle-orm/pg-core";

export const noteTable = pgTable('notes_table', {
    id: uuid("note_id").defaultRandom()
})

