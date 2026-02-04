export default function HomePage() {
  return (
    <main className="hero">
      {/* BACKGROUND ANIMATO */}
      <div className="bg" aria-hidden="true" />

      {/* CONTENUTO */}
      <div className="content">
        <h1>CityVibe</h1>
        <p>Global people vibes</p>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        /* === BACKGROUND === */
        .bg {
          position: absolute;
          inset: 0;
          background-image: url("/pov.png");
          background-size: cover;
          background-position: center;

          /* animazione FORZATA */
          animation: bgDrift 4s linear infinite;
          will-change: transform;
        }

        /* === CONTENUTO SOPRA === */
        .content {
          position: relative;
          z-index: 10;
          padding: 40px;
          color: white;
        }

        /* === KEYFRAMES === */
        @keyframes bgDrift {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.1) translate(-2%, -2%);
          }
          100% {
            transform: scale(1) translate(0, 0);
          }
        }
      `}</style>
    </main>
  );
}
