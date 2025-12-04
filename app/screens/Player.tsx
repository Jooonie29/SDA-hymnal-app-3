import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { usePlayerStore } from "../store/playerStore";

export default function Player() {
  const { currentTitle, pause, play } = usePlayerStore();
  return (
    <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 20 }}>{currentTitle || "Player"}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={play} style={{ backgroundColor: "#1db954", padding: 12, borderRadius: 24, marginRight: 12 }}>
          <Text style={{ color: "#000", fontWeight: "700" }}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pause} style={{ backgroundColor: "#111", padding: 12, borderRadius: 24 }}>
          <Text style={{ color: "#fff" }}>Pause</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

