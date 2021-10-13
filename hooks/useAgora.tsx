import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { useMemo } from "react";

const useAgoraClient = createClient({
  mode: "rtc",
  codec: "vp8",
});

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export const useAgora = () => {
  const client = useAgoraClient();
  const tracks = useMicrophoneAndCameraTracks();

  const audioTrack = useMemo(() => {
    return tracks.tracks?.[0] ?? null;
  }, [tracks.tracks]);

  const videoTrack = useMemo(() => {
    return tracks.tracks?.[1] ?? null;
  }, [tracks.tracks]);

  return { client, tracks, audioTrack, videoTrack };
};
