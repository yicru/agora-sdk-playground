import React, { useState } from "react";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import { useAgora } from "../hooks/useAgora";

type Props = {
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  setStart: (value: boolean) => void;
  setInCall: (value: boolean) => void;
};

export const Controls: React.VFC<Props> = ({
  audioTrack,
  videoTrack,
  setStart,
  setInCall,
}) => {
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const { client } = useAgora();

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await audioTrack.setEnabled(!trackState.audio);
      setTrackState((ps) => ({ ...ps, audio: !ps.audio }));
    }

    if (type === "video") {
      await videoTrack.setEnabled(!trackState.video);
      setTrackState((ps) => ({ ...ps, video: !ps.video }));
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    audioTrack.close();
    videoTrack.close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};
