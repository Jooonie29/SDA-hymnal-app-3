import React from "react";
import { View, Text } from "react-native";

export default function ErrorBanner({ text }: { text: string }) {
  return (
    <View style={{ backgroundColor: "#330000", padding: 8, borderRadius: 8, marginBottom: 12 }}>
      <Text style={{ color: "#ff7676" }}>{text}</Text>
    </View>
  );
}

