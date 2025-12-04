import React, { useEffect, useState } from "react";
import { View, Text, SectionList, TouchableOpacity } from "react-native";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const nav = useNavigation<any>();
  const [sections, setSections] = useState<any[]>([]);
  useEffect(() => {
    api.get(`/index`).then((r) => {
      const list = r.data as any[];
      const grouped: Record<string, any[]> = {};
      list.forEach((s) => {
        const key = s.title[0].toUpperCase();
        grouped[key] = grouped[key] || [];
        grouped[key].push(s);
      });
      setSections(Object.keys(grouped).sort().map((k) => ({ title: k, data: grouped[k] })));
    });
  }, []);
  return (
    <SectionList
      style={{ backgroundColor: "#000" }}
      sections={sections}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => nav.navigate("Hymn", { id: item.id })} style={{ padding: 12 }}>
          <Text style={{ color: "#fff" }}>#{item.hymn_number} {item.title}</Text>
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ backgroundColor: "#111", padding: 8 }}>
          <Text style={{ color: "#1db954", fontWeight: "700" }}>{title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled
    />
  );
}

