import React from "react";
import { View, Text } from "react-native";

export default function SearchResultItem({ item }: { item: any }) {
  return (
    <View style={{ paddingVertical: 12, borderBottomColor: "#111", borderBottomWidth: 1 }}>
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>#{item.hymn_number} {item.title}</Text>
      {item.snippet ? (
        <Text style={{ color: "#888", marginTop: 4 }} numberOfLines={2}>{item.snippet.replace(/<mark>/g, "").replace(/<\/mark>/g, "")}</Text>
      ) : null}
    </View>
  );
}

