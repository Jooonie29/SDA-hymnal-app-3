BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  hymn_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  lyrics TEXT NOT NULL,
  author TEXT,
  composer TEXT,
  instrument_url TEXT,
  duration_seconds INTEGER,
  tsv tsvector
);

CREATE INDEX IF NOT EXISTS songs_hymn_number_idx ON songs(hymn_number);
CREATE INDEX IF NOT EXISTS songs_title_idx ON songs(title);
CREATE INDEX IF NOT EXISTS songs_tsv_idx ON songs USING GIN(tsv);

CREATE OR REPLACE FUNCTION songs_tsv_update() RETURNS trigger AS $$
BEGIN
  NEW.tsv := to_tsvector('english', coalesce(NEW.title,'') || ' ' || coalesce(NEW.lyrics,''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS songs_tsv_trigger ON songs;
CREATE TRIGGER songs_tsv_trigger BEFORE INSERT OR UPDATE ON songs FOR EACH ROW EXECUTE FUNCTION songs_tsv_update();

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  song_id INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT favorites_unique UNIQUE(user_id, song_id)
);

CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  song_id INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP NOT NULL
);

COMMIT;

