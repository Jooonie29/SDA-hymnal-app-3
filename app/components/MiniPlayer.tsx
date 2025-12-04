import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePlayerStore } from "../store/playerStore";

export default function MiniPlayer() {
  const nav = useNavigation<any>();
  const { currentTitle, isPlaying, play, pause } = usePlayerStore();
  return (
    <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#111", padding: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text style={{ color: "#fff", fontWeight: "600" }}>{currentTitle || "No track"}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => nav.navigate("Player")} style={{ marginRight: 12 }}>
          <Text style={{ color: "#1db954" }}>Open</Text>
        </TouchableOpacity>
        {isPlaying ? (
          <TouchableOpacity onPress={pause}><Text style={{ color: "#fff" }}>Pause</Text></TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={play}><Text style={{ color: "#1db954" }}>Play</Text></TouchableOpacity>
        )}
      </View>
    </View>
  );
}

