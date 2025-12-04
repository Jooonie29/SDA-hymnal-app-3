import { sql } from "kysely";
import { db } from "../db/kysely";

export async function getSongById(id: number) {
  return db.selectFrom("songs").selectAll().where("id", "=", id).executeTakeFirst();
}

export async function getSongByNumber(num: number) {
  return db.selectFrom("songs").selectAll().where("hymn_number", "=", num).executeTakeFirst();
}

export async function getTOC() {
  return db.selectFrom("songs").select(["id", "hymn_number", "title"]).orderBy("hymn_number").execute();
}

export async function getIndex() {
  return db.selectFrom("songs").select(["id", "hymn_number", "title"]).orderBy("title").execute();
}

export async function searchTitle(q: string) {
  return db
    .selectFrom("songs")
    .select(["id", "hymn_number", "title"])
    .where("title", "ilike", `%${q}%`)
    .orderBy("title")
    .execute();
}

export async function searchLyrics(q: string) {
  return db
    .selectFrom("songs")
    .select(["id", "hymn_number", "title", "lyrics"])
    .where(sql`tsv @@ plainto_tsquery('english', ${q})`)
    .limit(50)
    .execute();
}

export async function searchAdvanced(q: string) {
  return db
    .selectFrom("songs")
    .select(["id", "hymn_number", "title", "lyrics"])
    .where(sql`tsv @@ to_tsquery('english', ${q})`)
    .limit(50)
    .execute();
}

export async function headlineSnippet(q: string, lyrics: string) {
  const r = await db
    .selectFrom(sql`(SELECT ts_headline('english', ${sql.raw("$L$" + lyrics + "$L$")}, to_tsquery('english', ${q}), 'StartSel="<mark>",StopSel="</mark>",MaxFragments=1,MinWords=5,MaxWords=20') AS h) as t`)
    .select(sql`h`)
    .execute();
  return r[0] ? (r[0] as any).h : "";
}

