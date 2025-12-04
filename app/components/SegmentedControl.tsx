import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function SegmentedControl({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <View style={{ flexDirection: "row", backgroundColor: "#111", borderRadius: 12, marginBottom: 12 }}>
      {options.map((o) => (
        <TouchableOpacity key={o} onPress={() => onChange(o)} style={{ flex: 1, padding: 10, alignItems: "center" }}>
          <Text style={{ color: value === o ? "#1db954" : "#fff", fontWeight: value === o ? "700" : "400" }}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

