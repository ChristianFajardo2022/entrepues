const VideoBackground = ({ src }) => (
  <>
    <video
      className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
      src={src}
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-15"></div>
  </>
);

export default VideoBackground;
