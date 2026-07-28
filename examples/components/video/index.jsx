const Video = ({
  video,
  showControls = true,
  autoplay = false,
  loop = false,
  muted = false,
  playsInline = false,
  preload = 'metadata',
}) => {
  return (
    <video
      className="w-full"
      controls={showControls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      poster={video.poster}
    >
      <source src={video.src} />
      <track kind="captions" />
    </video>
  );
};

export default Video;
