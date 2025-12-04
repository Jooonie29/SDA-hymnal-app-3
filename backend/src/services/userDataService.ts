import { db } from "../db/kysely";

export async function addFavorite(userId: number, songId: number) {
  await db
    .insertInto("favorites")
    .values({ user_id: userId, song_id: songId, created_at: new Date() })
    .onConflict((oc) => oc.columns(["user_id", "song_id"]).doNothing())
    .execute();
}

export async function removeFavorite(userId: number, songId: number) {
  await db.deleteFrom("favorites").where("user_id", "=", userId).where("song_id", "=", songId).execute();
}

export async function listFavorites(userId: number) {
  return db
    .selectFrom("favorites")
    .innerJoin("songs", "songs.id", "favorites.song_id")
    .select(["songs.id as id", "songs.hymn_number as hymn_number", "songs.title as title"])
    .where("favorites.user_id", "=", userId)
    .orderBy("favorites.created_at", "desc")
    .execute();
}

export async function addHistory(userId: number, songId: number, viewedAt: Date) {
  await db.insertInto("history").values({ user_id: userId, song_id: songId, viewed_at: viewedAt }).execute();
}

export async function listHistory(userId: number) {
  return db
    .selectFrom("history")
    .innerJoin("songs", "songs.id", "history.song_id")
    .select(["songs.id as id", "songs.hymn_number as hymn_number", "songs.title as title", "history.viewed_at as viewed_at"])
    .where("history.user_id", "=", userId)
    .orderBy("history.viewed_at", "desc")
    .limit(100)
    .execute();
}

