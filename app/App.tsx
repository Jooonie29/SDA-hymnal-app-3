import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Hymn from "./screens/Hymn";
import Player from "./screens/Player";
import TOC from "./screens/TOC";
import Index from "./screens/Index";
import Settings from "./screens/Settings";
import MiniPlayer from "./components/MiniPlayer";
import { useEffect } from "react";
import { usePlayerStore } from "./store/playerStore";
import { init as initSync, sync as runSync } from "./services/offlineSync";

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  useEffect(() => {
    usePlayerStore.getState().setup();
    initSync();
    runSync();
  }, []);
  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Hymn" component={Hymn} />
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="TOC" component={TOC} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      <MiniPlayer />
    </NavigationContainer>
  );
}
