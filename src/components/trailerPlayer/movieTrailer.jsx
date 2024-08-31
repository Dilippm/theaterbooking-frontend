import React from 'react';
import YouTube from 'react-youtube';
import './TrailerPlayer.css'; // Import your CSS file here

const MovieTrailerPlayer = ({ videoId }) => {
  const onReady = (event) => {
    const player = event.target;
    player.playVideo(); // Start playback
    // player.unMute(); // Uncomment if you want to unmute
  };

  const onStateChange = (event) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      event.target.playVideo(); // Replay the video when it ends
    }
  };

  return (
    <div className="video-container" style={{ width: '100%', height: '50vh' }}>
      <YouTube
        videoId={videoId}
        opts={{
          height: '100%',
          width: '100%',
        }}
        onReady={onReady}
        onStateChange={onStateChange} // Handle state changes
      />
    </div>
  );
};

export default MovieTrailerPlayer;
