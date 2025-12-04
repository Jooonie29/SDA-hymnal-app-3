import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";

export default async function playbackService() {
  TrackPlayer.setRepeatMode(RepeatMode.Off);
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteSeek, (e) => TrackPlayer.seekTo(e.position));
}

