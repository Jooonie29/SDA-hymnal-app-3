import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import SegmentedControl from "../components/SegmentedControl";
import SearchResultItem from "../components/SearchResultItem";
import { api } from "../services/api";
import ErrorBanner from "../components/ErrorBanner";

const modes = ["NUMBER", "TITLE", "LYRICS", "ADVANCED"] as const;

export default function Search() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const [q, setQ] = useState(route.params?.q || "");
  const [mode, setMode] = useState<typeof modes[number]>("TITLE");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      if (!q) {
        setResults([]);
        return;
      }
      setError("");
      if (mode === "NUMBER") {
        const r = await api.get(`/songs`, { params: { number: q } }).catch(() => null);
        if (!r) setError("Network error");
        setResults(r?.data ? [r.data] : []);
        return;
      }
      const type = mode === "TITLE" ? "title" : mode === "LYRICS" ? "lyrics" : "advanced";
      const r = await api.get(`/search`, { params: { q, type } }).catch(() => null);
      if (!r) {
        setError("Network error");
        setResults([]);
      } else {
        setResults(r.data);
      }
    };
    run();
  }, [q, mode]);

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search"
        placeholderTextColor="#888"
        style={{ backgroundColor: "#111", color: "#fff", padding: 12, borderRadius: 12, marginBottom: 12 }}
      />
      <SegmentedControl options={modes as unknown as string[]} value={mode} onChange={(m) => setMode(m as any)} />
      {error ? <ErrorBanner text={error} /> : null}
      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => nav.navigate("Hymn", { id: item.id })}>
            <SearchResultItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
