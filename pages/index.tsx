import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import type { VideoCallProps } from "../components/VideoCall";
import { ChannelForm } from "../components/ChannelForm";

const VideoCall = dynamic<VideoCallProps>(
  () => import("../components/VideoCall").then((mod) => mod.VideoCall),
  { ssr: false }
);

const Home: NextPage = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};

export default Home;
