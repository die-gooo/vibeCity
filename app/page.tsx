"use client";

import { useMemo, useState } from "react";

type Station = {
  cityLabel: string;
  stationLabel: string;
  embedUrl: string;
};

function toEmbedUrl(playlistUrl: string) {
  try {
    const u = new URL(playlistUrl);
    const parts = u.pathname.split("/").filter(Boolean); // ["playlist", "<id>"]
    const id = parts[1];
    if (!id) return playlistUrl;
    return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator`;
  } catch {
    return playlistUrl;
  }
}

// Placeholder “Spotify logo” (se poi vuoi, lo sostituiamo con una svg in /public)
function SpotifyMark() {
  return (
    <span className="spotifyMark" aria-label="Spotify">
      S
    </span>
  );
}

export default function Page() {
  // Personalizzazioni MVP (hardcoded)
  const city = "Milano";
  const displayName = "Diego"; // "Public playlist Diego ..."
  const spotifyUserHandle = "nome_user"; // placeholder: sostituisci con @diegoRandazzo o quello che vuoi

  const stations: Station[] = useMemo(() => {
    return [
      {
        cityLabel: city,
        stationLabel: "Station A",
        embedUrl: toEmbedUrl(
          "https://open.spotify.com/playlist/3WWGsRoU65tU0g9bLATQMw?si=PAJQJG7BRkyjMMMCO9fG3Q"
        )
      },
      {
        cityLabel: city,
        stationLabel: "Station B",
        embedUrl: toEmbedUrl(
          "https://open.spotify.com/playlist/1D3IkjrQv7TPcfwyplb4Hf?si=60335457bcc74407"
        )
      }
    ];
  }, []);

  // Player aperto di default
  const [isOpen, setIsOpen] = useState(true);
  const [tuning, setTuning] = useState(false);
  const [idx, setIdx] = useState(0);

  const current = stations[idx];

  function showTuning(text?: string) {
    setTuning(true);
    const el = document.getElementById("tuningLine");
    if (el && text) el.textContent = text;
    setTimeout(() => setTuning(false), 750);
  }

  function onTuneIn() {
    // lascio il bottone: utile per chiudere/aprire, ma di default è già open
    if (!isOpen) {
      showTuning("Loading player");
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }

  function onSwap() {
    if (!isOpen) setIsOpen(true);
    showTuning("Tuning to next station");
    setIdx((prev) => (prev + 1) % stations.length);
  }

  return (
    <main className="hero">
      <div className="bg" aria-hidden="true" />

      <header className="top">
        <div className="brand">
          <b>CityVibe</b>
          <small>global people vibes</small>
        </div>

        <div className="pill">Guest mode · {current.cityLabel}</div>
      </header>

      <section className="content">
        <div className="card copy">
          <h1>Sintonizzati sul mood della tua città.</h1>
          <p>
            Demo MVP (guest). Il player è già pronto: cambia stazione e ascolta via Spotify Embed.
            Spotify potrebbe chiedere login per ascolto completo.
          </p>

          <div className="row">
            <button className="btn primary" onClick={onTuneIn}>
              {isOpen ? "Hide player" : "Tune in"}
            </button>
            <button className="btn" onClick={onSwap}>
              Cambia stazione
            </button>
            <span className="meta">
              {current.cityLabel} · {stations.length} stations
            </span>
          </div>
        </div>

        {/* RADIO-STYLE FRAME */}
        <aside className="card radio" aria-label="Player">
          <div className="radioHead">
            <div className="radioTitle">
              <b>
                {current.cityLabel} — {current.stationLabel}
              </b>
              <span>
                Public playlist {displayName} (@{spotifyUserHandle} on Spotify)
              </span>
            </div>

            {/* “Spotify embed” → Spotify mark */}
            <div className="badge">
              <SpotifyMark />
              <span>Spotify</span>
            </div>
          </div>

          {/* “radio faceplate” */}
          <div className="radioFace">
            <div className="freq">
              <span className="freqLabel">TUNE</span>
              <span className="freqValue">97.3</span>
              <span className="freqCity">{current.cityLabel.toUpperCase()}</span>
            </div>

            <div className="knobs">
              <div className="knob">
                <span>VOL</span>
                <i />
              </div>
              <div className="knob">
                <span>BASS</span>
                <i />
              </div>
              <div className="knob">
                <span>MOOD</span>
                <i />
              </div>
            </div>
          </div>

          <div className={`playerWrap ${isOpen ? "" : "hidden"}`}>
            <iframe
              title="Spotify Embed"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              src={current.embedUrl}
            />
          </div>

          <div className={`tuning ${tuning ? "on" : ""}`}>
            <div className="noise" aria-hidden="true" />
            <div className="tuningText">
              <b>Tuning…</b>
              <span id="tuningLine">Loading station</span>
            </div>
          </div>
        </aside>
      </section>

      {/* TICKER ROSSO IN BASSO */}
      <div className="ticker" role="status" aria-label="News ticker">
        <div className="tickerTrack">
          <div className="tickerItem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit — sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="tickerItem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit — sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>

      <div className="foot">
        Tip: metti la tua immagine POV in <code>/public/pov.png</code>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: clamp(16px, 3vw, 32px);
          background: #000;
        }
        .bg {
          position: absolute;
          inset: 0;
          background-image: url("/pov.png");
          background-size: cover;
          background-position: center;
          filter: saturate(1.05) contrast(1.05);
          transform: scale(1.03);
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 70% at 50% 30%, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.78)),
            linear-gradient(to top, rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.2));
          pointer-events: none;
          z-index: 1;
        }

        .top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: clamp(14px, 2.5vw, 22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 3;
        }
        .brand {
          display: flex;
          align-items: baseline;
          gap: 10px;
          letter-spacing: 0.2px;
        }
        .brand b {
          font-size: 18px;
        }
        .brand small {
          color: var(--muted);
          font-size: 13px;
        }
        .pill {
          border: 1px solid var(--stroke);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          padding: 10px 12px;
          border-radius: 999px;
          color: var(--muted);
          font-size: 13px;
        }

        .content {
          position: relative;
          z-index: 3;
          width: min(980px, 100%);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 18px;
          align-items: end;
          padding-bottom: 54px; /* lascia spazio al ticker */
        }
        @media (max-width: 880px) {
          .content {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        .card {
          border: 1px solid var(--stroke);
          background: var(--glass);
          backdrop-filter: blur(14px);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        .copy {
          padding: clamp(16px, 2.5vw, 22px);
        }
        h1 {
          margin: 0 0 8px 0;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        p {
          margin: 0 0 14px 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.45;
        }
        .row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }
        .btn {
          border: 1px solid var(--stroke);
          background: rgba(255, 255, 255, 0.08);
          color: var(--fg);
          padding: 11px 14px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.12s ease, background 0.12s ease;
          user-select: none;
        }
        .btn:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }
        .btn.primary {
          background: rgba(255, 255, 255, 0.16);
        }
        .meta {
          font-size: 12px;
          color: rgba(238, 242, 255, 0.6);
        }

        /* RADIO STYLE */
        .radio {
          position: relative;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.32));
        }
        .radioHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .radioTitle {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .radioTitle b {
          font-size: 13px;
        }
        .radioTitle span {
          font-size: 12px;
          color: var(--muted);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(238, 242, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
        }
        .spotifyMark {
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(0, 0, 0, 0.22);
          color: rgba(238, 242, 255, 0.9);
          font-weight: 800;
          font-size: 12px;
          line-height: 1;
        }

        .radioFace {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
        }
        .freq {
          display: grid;
          grid-template-columns: auto auto;
          grid-template-rows: auto auto;
          gap: 2px 10px;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.22);
          min-width: 168px;
        }
        .freqLabel {
          font-size: 10px;
          color: rgba(238, 242, 255, 0.65);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .freqValue {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .freqCity {
          grid-column: 1 / -1;
          font-size: 10px;
          color: rgba(238, 242, 255, 0.65);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .knobs {
          display: flex;
          gap: 10px;
        }
        .knob {
          width: 58px;
          height: 44px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .knob span {
          position: absolute;
          top: 6px;
          left: 10px;
          font-size: 9px;
          color: rgba(238, 242, 255, 0.62);
          letter-spacing: 0.12em;
        }
        .knob i {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 0 0 2px rgba(0,0,0,0.25);
          transform: rotate(-20deg);
        }

        .playerWrap {
          position: relative;
          height: 0;
          padding-bottom: 56%;
          background: rgba(0, 0, 0, 0.18);
        }
        @media (max-width: 880px) {
          .playerWrap {
            padding-bottom: 70%;
          }
        }
        iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .hidden {
          display: none;
        }

        /* TUNING overlay */
        .tuning {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.55);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease;
        }
        .tuning.on {
          opacity: 1;
          pointer-events: auto;
        }
        .noise {
          position: absolute;
          inset: -40px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          animation: drift 1.2s linear infinite;
        }
        @keyframes drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-40px, 25px, 0); }
        }
        .tuningText {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 14px 16px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.35);
          border-radius: 14px;
        }
        .tuningText b {
          display: block;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .tuningText span {
          display: block;
          font-size: 12px;
          color: var(--muted);
        }

        /* TICKER ROSSO */
        .ticker {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 4;
          height: 40px;
          background: #d11f1f;
          border-top: 1px solid rgba(255,255,255,0.20);
          overflow: hidden;
        }
        .tickerTrack {
          display: flex;
          height: 100%;
          align-items: center;
          gap: 48px;
          white-space: nowrap;
          will-change: transform;
          animation: marquee 18s linear infinite;
        }
        .tickerItem {
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.01em;
          padding-left: 16px;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .foot {
          position: absolute;
          bottom: 50px; /* sopra il ticker */
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          font-size: 12px;
          color: rgba(238, 242, 255, 0.55);
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(12px);
        }
      `}</style>
    </main>
  );
}
