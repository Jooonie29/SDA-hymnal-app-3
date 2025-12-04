import React, { useEffect, useRef } from "react";
import { ScrollView, Text } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { useSettingsStore } from "../store/settingsStore";

export default function LyricsView({ text, fontSize, onFontSizeChange, autoScroll }: { text: string; fontSize: number; onFontSizeChange: (s: number) => void; autoScroll?: boolean }) {
  const ref = useRef<ScrollView>(null);
  const speed = useSettingsStore((s) => s.autoScrollSpeed);
  const onPinchEvent = (e: any) => {
    const scale = e.nativeEvent.scale;
    const fs = Math.min(28, Math.max(12, fontSize * scale));
    onFontSizeChange(fs);
  };
  useEffect(() => {
    if (!autoScroll || !ref.current) return;
    let y = 0;
    const id = setInterval(() => {
      y += speed;
      ref.current?.scrollTo({ y, animated: false });
    }, 30);
    return () => clearInterval(id);
  }, [autoScroll, speed]);
  return (
    <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={(e) => { if (e.nativeEvent.state === State.END) onFontSizeChange(fontSize); }}>
      <ScrollView ref={ref} style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontSize }}>{text}</Text>
      </ScrollView>
    </PinchGestureHandler>
  );
}

