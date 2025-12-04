import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { api } from "./api";

const db = SQLite.openDatabase("sda-hymnal.db");

export function init() {
  db.transaction((tx) => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS cache_songs (id INTEGER PRIMARY KEY NOT NULL, hymn_number INTEGER, title TEXT)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS favorites (song_id INTEGER PRIMARY KEY NOT NULL)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS history (song_id INTEGER, viewed_at TEXT)");
  });
}

export async function sync() {
  const r = await api.get(`/sync/local`).catch(() => ({ data: { songs: [] } }));
  const songs = r.data.songs as any[];
  db.transaction((tx) => {
    songs.forEach((s) => {
      tx.executeSql("INSERT OR REPLACE INTO cache_songs (id, hymn_number, title) VALUES (?, ?, ?)", [s.id, s.hymn_number, s.title]);
    });
  });
}

export async function downloadAudio(id: number, url: string) {
  const dir = FileSystem.documentDirectory + "audio";
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true }).catch(() => {});
  const file = dir + `/${id}.mp3`;
  await FileSystem.downloadAsync(url, file).catch(() => {});
  return file;
}

export function getFavoritesLocal(): Promise<any[]> {
  return new Promise((resolve) => {
    db.readTransaction((tx) => {
      tx.executeSql("SELECT f.song_id as id, s.hymn_number, s.title FROM favorites f JOIN cache_songs s ON s.id=f.song_id", [], (_t, rs) => {
        const rows = [] as any[];
        for (let i = 0; i < rs.rows.length; i++) rows.push(rs.rows.item(i));
        resolve(rows);
      });
    });
  });
}

export function getHistoryLocal(): Promise<any[]> {
  return new Promise((resolve) => {
    db.readTransaction((tx) => {
      tx.executeSql("SELECT h.song_id as id, s.hymn_number, s.title, h.viewed_at FROM history h JOIN cache_songs s ON s.id=h.song_id ORDER BY h.viewed_at DESC LIMIT 50", [], (_t, rs) => {
        const rows = [] as any[];
        for (let i = 0; i < rs.rows.length; i++) rows.push(rs.rows.item(i));
        resolve(rows);
      });
    });
  });
}

export function toggleFavoriteLocal(songId: number, favored: boolean) {
  db.transaction((tx) => {
    if (favored) tx.executeSql("INSERT OR REPLACE INTO favorites (song_id) VALUES (?)", [songId]);
    else tx.executeSql("DELETE FROM favorites WHERE song_id=?", [songId]);
  });
}
