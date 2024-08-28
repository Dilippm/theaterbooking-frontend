import React from 'react';
import YouTube from 'react-youtube';
import './TrailerPlayer.css'; // Import your CSS file here

const TrailerPlayer = ({ videoId }) => {
  const onReady = (event) => {
    const player = event.target;
    player.playVideo(); // Start playback
    // // Unmute after video starts to comply with autoplay policies
    // player.unMute();
  };

  const onStateChange = (event) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      event.target.playVideo(); // Replay the video when it ends
    }
  };

  return (
    <div className="video-container">
      <YouTube
        videoId={videoId}
        opts={{
          height: '50vh',
          width: '100%',
          playerVars: {
            autoplay: 1, // Autoplay the video
            controls: 0, // Hide the player controls
            modestbranding: 1, // Minimize the YouTube logo
            rel: 0, // Prevent related videos from appearing
            showinfo: 0, // Hide video title and player actions
            mute: 1, // Start with the video muted for autoplay
          },
        }}
        onReady={onReady}
        onStateChange={onStateChange} // Handle state changes
      />
    </div>
  );
};

export default TrailerPlayer;
