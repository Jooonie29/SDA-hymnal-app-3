export interface UsersTable {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface SongsTable {
  id: number;
  hymn_number: number;
  title: string;
  lyrics: string;
  author: string | null;
  composer: string | null;
  instrument_url: string | null;
  duration_seconds: number | null;
  tsv: unknown;
}

export interface FavoritesTable {
  id: number;
  user_id: number;
  song_id: number;
  created_at: Date;
}

export interface HistoryTable {
  id: number;
  user_id: number;
  song_id: number;
  viewed_at: Date;
}

export interface Database {
  users: UsersTable;
  songs: SongsTable;
  favorites: FavoritesTable;
  history: HistoryTable;
}

