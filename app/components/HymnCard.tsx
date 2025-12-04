import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default function HymnCard({ item, onPress }: { item: any; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: 200, marginRight: 12 }}>
      <View style={{ backgroundColor: "#111", padding: 12, borderRadius: 12 }}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>#{item.hymn_number}</Text>
        <Text style={{ color: "#888" }} numberOfLines={2}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

