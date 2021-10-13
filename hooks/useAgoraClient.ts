import { createClient } from "agora-rtc-react";

export const useAgoraClient = createClient({
  mode: "rtc",
  codec: "vp8",
});
