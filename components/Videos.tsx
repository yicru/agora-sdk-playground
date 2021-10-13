import React, { useMemo } from "react";
import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IRemoteVideoTrack,
} from "agora-rtc-react";

type Props = {
  users: IAgoraRTCRemoteUser[];
  videoTrack: ICameraVideoTrack;
};

export const Videos: React.VFC<Props> = ({ users, videoTrack }) => {
  const hasVideoTrackUsers = useMemo(() => {
    return users.filter((user) => user.videoTrack);
  }, [users]);

  return (
    <div>
      <div id="videos">
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        <AgoraVideoPlayer
          style={{ height: "95%", width: "95%" }}
          className="vid"
          videoTrack={videoTrack}
        />
        {users.length > 0 &&
          hasVideoTrackUsers.map((user) => (
            <AgoraVideoPlayer
              style={{ height: "95%", width: "95%" }}
              className="vid"
              videoTrack={user.videoTrack as IRemoteVideoTrack}
              key={user.uid}
            />
          ))}
      </div>
    </div>
  );
};
