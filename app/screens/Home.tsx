import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import HymnCard from "../components/HymnCard";
import { getFavoritesLocal, getHistoryLocal } from "../services/offlineSync";

export default function Home() {
  const nav = useNavigation<any>();
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      api.get("/favorites").then((r) => r.data).catch(async () => await getFavoritesLocal()),
      api.get("/history").then((r) => r.data).catch(async () => await getHistoryLocal()),
    ]).then(([f, h]) => {
      setFavorites(f);
      setRecent(h);
      setLoading(false);
    });
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>SDA Hymnal</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search hymns"
          placeholderTextColor="#888"
          style={{ marginTop: 12, backgroundColor: "#111", color: "#fff", padding: 12, borderRadius: 12 }}
        />
        <TouchableOpacity onPress={() => nav.navigate("Search", { q: query })} style={{ marginTop: 8 }}>
          <Text style={{ color: "#1db954" }}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 8 }}>Favorites</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View style={{ flexDirection: "row" }}>
            <HymnCard item={{ hymn_number: "", title: "" }} onPress={() => {}} />
            <HymnCard item={{ hymn_number: "", title: "" }} onPress={() => {}} />
          </View>
        ) : (
          favorites.map((f) => (
            <HymnCard key={f.id} item={f} onPress={() => nav.navigate("Hymn", { id: f.id })} />
          ))
        )}
      </ScrollView>
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", marginVertical: 8 }}>Recently Played</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View style={{ flexDirection: "row" }}>
            <HymnCard item={{ hymn_number: "", title: "" }} onPress={() => {}} />
            <HymnCard item={{ hymn_number: "", title: "" }} onPress={() => {}} />
          </View>
        ) : (
          recent.map((r) => (
            <HymnCard key={r.id} item={r} onPress={() => nav.navigate("Hymn", { id: r.id })} />
          ))
        )}
      </ScrollView>
    </ScrollView>
  );
}
