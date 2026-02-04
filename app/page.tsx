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
    const parts = u.pathname.split("/").filter(Boolean);
    const id = parts[1];
    if (!id) return playlistUrl;
    return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator`;
  } catch {
    return playlistUrl;
  }
}

function SpotifyMark() {
  return (
    <span className="spotifyMark" aria-label="Spotify">
      S
    </span>
  );
}

export default function Page() {
  const city = "Milano";
  const displayName = "Diego";
  const spotifyUserHandle = "nome_user"; // placeholder

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

  const [tuning, setTuning] = useState(false);
  const [idx, setIdx] = useState(0);
  const current = stations[idx];

  function showTuning(text?: string) {
    setTuning(true);
    const el = document.getElementById("tuningLine");
    if (el && text) el.textContent = text;
    setTimeout(() => setTuning(false), 550);
  }

  function onNext() {
    showTuning("Tuning…");
    setIdx((prev) => (prev + 1) % stations.length);
  }

  return (
    <main className="hero">
      <div className="bg cv-bgMotion" aria-hidden="true" />
<div className="cv-noisePage" aria-hidden="true" />


      {/* TOP BAR MINIMA */}
      <header className="top">
        <div className="brand">
          <b>CityVibe</b>
          <small>global people vibes</small>
        </div>
        <div className="pill">Guest · {current.cityLabel}</div>
      </header>

      {/* SOLO PLAYER */}
      <section className="wrap">
        <aside className="radio" aria-label="Player">
          <div className="radioHead">
            <div className="radioTitle">
              <b>
                {current.cityLabel} — {current.stationLabel}
              </b>
              <span>
                Public playlist {displayName} (@{spotifyUserHandle} on Spotify)
              </span>
            </div>

            <div className="headRight">
              <div className="badge">
                <SpotifyMark />
                <span>Spotify</span>
              </div>
              <button className="nextBtn" onClick={onNext} aria-label="Next station">
                NEXT
              </button>
            </div>
          </div>

          {/* MINI RADIO ELEMENTS */}
          <div className="radioFace">
            <div className="freq">
              <span className="freqLabel">TUNE</span>
              <span className="freqValue">97.3</span>
              <span className="freqCity">{current.cityLabel.toUpperCase()}</span>
            </div>

            <div className="knobs">
              <div className="knob" aria-hidden="true">
                <span>VOL</span>
                <i />
              </div>
              <div className="knob" aria-hidden="true">
                <span>MOOD</span>
                <i />
              </div>
            </div>
          </div>

          {/* EMBED SEMPRE VISIBILE */}
          <div className="playerWrap">
            <iframe
              title="Spotify Embed"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              src={current.embedUrl}
            />
          </div>

          {/* TUNING OVERLAY */}
          <div className={`tuning ${tuning ? "on" : ""}`}>
            <div className="noise" aria-hidden="true" />
            <div className="tuningText">
              <b>Tuning…</b>
              <span id="tuningLine">Loading station</span>
            </div>
          </div>
        </aside>
      </section>

      {/* SCORE / TICKER BAR */}
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

      <style jsx>{`
        .hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: clamp(14px, 3vw, 24px);
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

  z-index: 0;
  will-change: transform, filter;
}
.cv-noisePage {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: cvNoise 1.2s steps(2) infinite;
}


        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 70% at 50% 30%, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.8)),
            linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.22));
          pointer-events: none;
          z-index: 1;
        }

        /* TOP */
        .top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 3;
        }
        .brand {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .brand b {
          font-size: 16px;
          letter-spacing: 0.2px;
        }
        .brand small {
          color: rgba(238, 242, 255, 0.75);
          font-size: 12px;
        }
        .pill {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          padding: 8px 10px;
          border-radius: 999px;
          color: rgba(238, 242, 255, 0.78);
          font-size: 12px;
        }

        /* WRAP */
.wrap {
  position: relative;
  z-index: 3;
  width: 100%;
  margin: 0;
}

        /* RADIO CARD */
.radio {
  position: fixed;
  right: 16px;
  bottom: 56px; /* sopra ticker (40px) + respiro */
  z-index: 6;

  width: 420px;
  max-width: calc(100vw - 32px);

  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(14px);
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}

        .radioHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .radioTitle {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .radioTitle b {
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .radioTitle span {
          font-size: 12px;
          color: rgba(238, 242, 255, 0.7);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .headRight {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
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
          font-weight: 900;
          font-size: 12px;
          line-height: 1;
        }
        .nextBtn {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(238, 242, 255, 0.92);
          padding: 8px 10px;
          border-radius: 12px;
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.06em;
          cursor: pointer;
          user-select: none;
        }

        /* RADIO FACE */
        .radioFace {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
        }
        .freq {
          display: grid;
          grid-template-columns: auto auto;
          grid-template-rows: auto auto;
          gap: 2px 10px;
          padding: 9px 10px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.22);
          min-width: 150px;
        }
        .freqLabel {
          font-size: 10px;
          color: rgba(238, 242, 255, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .freqValue {
          font-size: 16px;
          font-weight: 900;
        }
        .freqCity {
          grid-column: 1 / -1;
          font-size: 10px;
          color: rgba(238, 242, 255, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .knobs {
          display: flex;
          gap: 10px;
        }
        .knob {
          width: 54px;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .knob span {
          position: absolute;
          top: 6px;
          left: 10px;
          font-size: 9px;
          color: rgba(238, 242, 255, 0.55);
          letter-spacing: 0.12em;
        }
        .knob i {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.06);
        }

        /* EMBED */
        .playerWrap {
          position: relative;
          height: 0;
          padding-bottom: 72%;
          background: rgba(0, 0, 0, 0.18);
        }
        iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* TUNING */
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
          z-index: 6;
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
          color: rgba(238, 242, 255, 0.7);
        }

        /* TICKER */
        .ticker {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 7;
          height: 40px;
          background: #d11f1f;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
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
          font-weight: 900;
          font-size: 14px;
          padding-left: 16px;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* MOBILE */
        @media (max-width: 880px) {
          .wrap {
            margin: 64px 0 48px 0;
          }
          .playerWrap {
            padding-bottom: 120%; /* embed grande su mobile */
          }
          .freq {
            min-width: 132px;
          }
          .knob {
            width: 50px;
            height: 38px;
          }
          .nextBtn {
            padding: 8px 9px;
          }
          .badge span {
            display: none; /* su mobile: solo logo/placeholder */
          }
          .radio {
    left: 12px;
    right: 12px;
    bottom: 56px;
    width: auto;              /* full width mobile */
    max-width: none;
    border-radius: 16px;
  }
        }
      `}</style>
    </main>
  );
}
