import { create } from "zustand";
import TrackPlayer, { Capability } from "react-native-track-player";

type Track = { id: string; url: string; title: string; artist?: string };

export const usePlayerStore = create<{
  isReady: boolean;
  isPlaying: boolean;
  currentTitle: string | null;
  setup: () => Promise<void>;
  addTrack: (t: Track) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
}>(() => ({
  isReady: false,
  isPlaying: false,
  currentTitle: null,
  setup: async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo, Capability.SkipToNext, Capability.SkipToPrevious],
    });
  },
  addTrack: async (t) => {
    await TrackPlayer.reset();
    await TrackPlayer.add({ id: t.id, url: t.url, title: t.title, artist: t.artist });
    await TrackPlayer.play();
  },
  play: async () => {
    await TrackPlayer.play();
  },
  pause: async () => {
    await TrackPlayer.pause();
  },
}));

