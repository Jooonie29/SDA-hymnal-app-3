import React from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../store/settingsStore";

export default function Settings() {
  const dark = useSettingsStore((s) => s.darkMode);
  const setDark = useSettingsStore((s) => s.setDarkMode);
  const font = useSettingsStore((s) => s.fontSize);
  const setFont = useSettingsStore((s) => s.setFontSize);
  const scrollSpeed = useSettingsStore((s) => s.autoScrollSpeed);
  const setScrollSpeed = useSettingsStore((s) => s.setAutoScrollSpeed);
  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Text style={{ color: "#fff" }}>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={{ color: "#fff", marginBottom: 8 }}>Font Size {font}</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setFont(Math.max(12, font - 1))} style={{ backgroundColor: "#111", padding: 8, borderRadius: 8 }}>
          <Text style={{ color: "#fff" }}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFont(Math.min(28, font + 1))} style={{ backgroundColor: "#111", padding: 8, borderRadius: 8 }}>
          <Text style={{ color: "#fff" }}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: "#fff", marginVertical: 8 }}>Auto-scroll speed {scrollSpeed.toFixed(1)}</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity onPress={() => setScrollSpeed(Math.max(0.5, scrollSpeed - 0.1))} style={{ backgroundColor: "#111", padding: 8, borderRadius: 8 }}>
          <Text style={{ color: "#fff" }}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScrollSpeed(Math.min(3, scrollSpeed + 0.1))} style={{ backgroundColor: "#111", padding: 8, borderRadius: 8 }}>
          <Text style={{ color: "#fff" }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
