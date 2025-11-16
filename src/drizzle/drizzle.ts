import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'
const db = drizzle("postgres://postgres:123123@localhost:5432/notes", {schema: schema});
 
