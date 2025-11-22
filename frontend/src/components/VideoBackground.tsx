import videoSource from '../Dashboard_Pulse_Data_Driven_Insights.mp4';

export function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ minWidth: '100%', minHeight: '100%' }}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#2c4b52]/70" />
    </div>
  );
}
