import React, { useCallback, useEffect, useState } from "react";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { useAgora } from "../hooks/useAgora";
import { Videos } from "./Videos";
import { Controls } from "./Controls";
import { Config } from "../config";

export type VideoCallProps = {
  channelName: string;
  setInCall: (value: boolean) => void;
};

export const VideoCall: React.VFC<VideoCallProps> = ({
  channelName,
  setInCall,
}) => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);

  const {
    client,
    tracks: { ready },
    audioTrack,
    videoTrack,
  } = useAgora();

  const init = useCallback(
    async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => [...prevUsers, user]);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) =>
            prevUsers.filter((User) => User.uid !== user.uid)
          );
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) =>
          prevUsers.filter((User) => User.uid !== user.uid)
        );
      });

      await client.join(Config.agora.appId, name, null, null);
      if (audioTrack && videoTrack) {
        await client.publish([audioTrack, videoTrack]);
      }
      setStart(true);
    },
    [audioTrack, client, videoTrack]
  );

  useEffect(() => {
    if (ready && audioTrack && videoTrack) {
      console.log("init ready");
      init(channelName);
    }
  }, [audioTrack, channelName, init, ready, videoTrack]);

  if (!audioTrack || !videoTrack) {
    return null;
  }

  return (
    <div className="App">
      {ready && (
        <Controls
          audioTrack={audioTrack}
          videoTrack={videoTrack}
          setStart={setStart}
          setInCall={setInCall}
        />
      )}
      {start && <Videos users={users} videoTrack={videoTrack} />}
    </div>
  );
};
