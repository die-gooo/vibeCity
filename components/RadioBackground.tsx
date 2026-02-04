export function RadioBackground({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div
        className="cv-bgMotion absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="cv-noise absolute inset-0 pointer-events-none" />
      <div className="cv-vignette absolute inset-0 pointer-events-none" />
    </div>
  );
}
