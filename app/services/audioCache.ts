import * as FileSystem from "expo-file-system";

export async function hasAudio(id: number) {
  const file = FileSystem.documentDirectory + `audio/${id}.mp3`;
  const info = await FileSystem.getInfoAsync(file);
  return info.exists;
}

