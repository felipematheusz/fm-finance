const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[100]">
      <video
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
        style={{
          scale: '0.5',
        }}
      >
        <source type="video/webm; codecs=vp9" src="/videos/animation.webm" />
      </video>
    </div>
  );
};

export { Loading };
