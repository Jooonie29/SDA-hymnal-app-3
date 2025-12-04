import TrackPlayer from 'react-native-track-player';
TrackPlayer.registerPlaybackService(() => require('./app/services/trackPlayerService').default);
export { default } from './App';

