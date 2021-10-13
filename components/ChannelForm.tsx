import React from "react";

type Props = {
  setInCall: (value: boolean) => void;
  setChannelName: (value: string) => void;
};

export const ChannelForm: React.VFC<Props> = ({
  setInCall,
  setChannelName,
}) => {
  return (
    <form className="join">
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};
