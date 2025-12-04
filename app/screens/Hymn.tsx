import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { usePlayerStore } from "../store/playerStore";
import * as Haptics from "expo-haptics";
import LyricsView from "../components/LyricsView";
import { toggleFavoriteLocal } from "../services/offlineSync";
import { hasAudio } from "../services/audioCache";
import { downloadAudio } from "../services/offlineSync";
import * as FileSystem from "expo-file-system";
import { useSettingsStore } from "../store/settingsStore";

export default function Hymn() {
  const route = useRoute<any>();
  const id = route.params?.id as number;
  const [song, setSong] = useState<any | null>(null);
  const addTrack = usePlayerStore((s) => s.addTrack);
  const fontDefault = useSettingsStore((s) => s.fontSize);
  const [fontSize, setFontSize] = useState(fontDefault);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [hasLocalAudio, setHasLocalAudio] = useState(false);

  useEffect(() => {
    api.get(`/songs/${id}`).then((r) => setSong(r.data));
  }, [id]);

  useEffect(() => {
    if (!song) return;
    timerRef.current = setTimeout(() => {
      api.post(`/history`, { songId: song.id, viewedAt: new Date().toISOString() }).catch(() => {});
    }, 20000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [song]);

  if (!song) return <View style={{ flex: 1, backgroundColor: "#000" }} />;

  const play = async () => {
    let url = song.instrument_url as string | undefined;
    if (hasLocalAudio) url = FileSystem.documentDirectory + `audio/${song.id}.mp3`;
    if (url) addTrack({ id: String(song.id), url, title: song.title, artist: "Instrumental" });
  };

  const fav = async () => {
    const ok = await api.post(`/favorites`, { songId: song.id }).then(() => true).catch(() => false);
    if (!ok) toggleFavoriteLocal(song.id, true);
    Haptics.selectionAsync();
  };

  const download = async () => {
    if (song.instrument_url) {
      await downloadAudio(song.id, song.instrument_url);
      setHasLocalAudio(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
      <Text style={{ color: "#fff", fontSize: 28, fontWeight: "800" }}>{song.title}</Text>
      <Text style={{ color: "#888", marginBottom: 12 }}>#{song.hymn_number}</Text>
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
        <TouchableOpacity onPress={play} style={{ backgroundColor: "#1db954", padding: 12, borderRadius: 24 }}>
          <Text style={{ color: "#000", fontWeight: "700" }}>{hasLocalAudio ? "Play (Offline)" : "Play"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={fav} style={{ backgroundColor: "#111", padding: 12, borderRadius: 24 }}>
          <Text style={{ color: "#fff" }}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={download} style={{ backgroundColor: "#111", padding: 12, borderRadius: 24 }}>
          <Text style={{ color: "#fff" }}>{hasLocalAudio ? "Downloaded" : "Download"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAutoScroll((v) => !v)} style={{ backgroundColor: "#111", padding: 12, borderRadius: 24 }}>
          <Text style={{ color: "#fff" }}>{autoScroll ? "Auto-scroll On" : "Auto-scroll Off"}</Text>
        </TouchableOpacity>
      </View>
      <LyricsView text={song.lyrics} fontSize={fontSize} onFontSizeChange={setFontSize} autoScroll={autoScroll} />
    </View>
  );
}
  useEffect(() => {
    (async () => {
      if (song) setHasLocalAudio(await hasAudio(song.id));
    })();
  }, [song]);
