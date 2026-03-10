"use client";

import { useEffect, useRef, useState } from "react";
import { defaultConfig, toEmbedUrl } from "@/lib/siteConfig";
import type { SiteConfig, Station } from "@/lib/siteConfig";

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // new station form
  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [newFreq, setNewFreq] = useState("");
  const [newCity, setNewCity] = useState("Milano");

  // video
  const [videoTab, setVideoTab] = useState<"url" | "upload">("url");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // load config once authed
  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        setVideoUrlInput(data.videoUrl ?? "");
      })
      .finally(() => setLoading(false));
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, ...defaultConfig }),
    });
    if (res.status === 401) {
      setAuthError("Password errata.");
      return;
    }
    // restore real config after auth test
    const r2 = await fetch("/api/admin/config");
    const data = await r2.json();
    setConfig(data);
    setVideoUrlInput(data.videoUrl ?? "");
    setAuthed(true);
  }

  async function save(cfg: SiteConfig) {
    setSaveMsg("");
    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, ...cfg }),
    });
    if (res.status === 401) { setAuthed(false); return; }
    if (res.ok) setSaveMsg("Salvato ✓");
    else setSaveMsg("Errore nel salvataggio.");
    setTimeout(() => setSaveMsg(""), 3000);
  }

  function addStation() {
    if (!newUrl || !newName || !newFreq) return;
    const station: Station = {
      id: genId(),
      cityLabel: newCity || "Milano",
      stationLabel: newName,
      freq: newFreq,
      embedUrl: toEmbedUrl(newUrl),
    };
    const next = { ...config, stations: [...config.stations, station] };
    setConfig(next);
    setNewUrl(""); setNewName(""); setNewFreq(""); setNewCity("Milano");
    save(next);
  }

  function removeStation(id: string) {
    const next = { ...config, stations: config.stations.filter((s) => s.id !== id) };
    setConfig(next);
    save(next);
  }

  function applyVideoUrl() {
    const next = { ...config, videoUrl: videoUrlInput.trim() };
    setConfig(next);
    save(next);
  }

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg("");
    const form = new FormData();
    form.append("video", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: form,
    });
    setUploading(false);
    if (!res.ok) { setUploadMsg("Errore upload."); return; }
    const { url } = await res.json();
    setVideoUrlInput(url);
    const next = { ...config, videoUrl: url };
    setConfig(next);
    save(next);
    setUploadMsg("Video caricato ✓");
  }

  if (!authed) {
    return (
      <main className="center">
        <form className="loginBox" onSubmit={handleLogin}>
          <h1>Admin</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {authError && <p className="err">{authError}</p>}
          <button type="submit">Accedi</button>
        </form>
        <style jsx>{`
          .center { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0a0a0a; }
          .loginBox { display:flex; flex-direction:column; gap:12px; width:280px; }
          h1 { color:#eef2ff; font-size:20px; margin:0 0 4px; }
          input { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.14); color:#eef2ff; padding:10px 12px; border-radius:10px; font-size:14px; outline:none; }
          input:focus { border-color:rgba(255,255,255,0.3); }
          button { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); color:#eef2ff; padding:10px; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; }
          button:hover { background:rgba(255,255,255,0.16); }
          .err { color:#f87171; font-size:12px; margin:0; }
        `}</style>
      </main>
    );
  }

  return (
    <main className="admin">
      <header className="hdr">
        <span className="brand">CityVibe <em>admin</em></span>
        {saveMsg && <span className="saveMsg">{saveMsg}</span>}
      </header>

      {loading ? (
        <p className="loading">Caricamento…</p>
      ) : (
        <div className="cols">

          {/* ── STAZIONI ── */}
          <section className="card">
            <h2>Stazioni</h2>

            <div className="stationList">
              {config.stations.map((s) => (
                <div key={s.id} className="stationRow">
                  <div className="stationInfo">
                    <b>{s.stationLabel}</b>
                    <span>{s.cityLabel} · {s.freq} MHz</span>
                  </div>
                  <button className="del" onClick={() => removeStation(s.id)} aria-label="Rimuovi">✕</button>
                </div>
              ))}
              {config.stations.length === 0 && <p className="empty">Nessuna stazione.</p>}
            </div>

            <div className="addForm">
              <h3>Aggiungi stazione</h3>
              <input
                placeholder="URL playlist Spotify"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <div className="row2">
                <input
                  placeholder="Nome stazione"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  placeholder="Città"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
                <input
                  placeholder="Freq es. 97.3"
                  value={newFreq}
                  onChange={(e) => setNewFreq(e.target.value)}
                  style={{ width: 90 }}
                />
              </div>
              <button
                className="addBtn"
                onClick={addStation}
                disabled={!newUrl || !newName || !newFreq}
              >
                + Aggiungi
              </button>
            </div>
          </section>

          {/* ── VIDEO ── */}
          <section className="card">
            <h2>Video background</h2>
            {config.videoUrl && (
              <p className="current">
                Attuale: <a href={config.videoUrl} target="_blank" rel="noreferrer">{config.videoUrl.slice(0, 50)}…</a>
              </p>
            )}
            {!config.videoUrl && <p className="current muted">Nessun override — usa il video locale.</p>}

            <div className="tabs">
              <button className={videoTab === "url" ? "tab active" : "tab"} onClick={() => setVideoTab("url")}>URL esterno</button>
              <button className={videoTab === "upload" ? "tab active" : "tab"} onClick={() => setVideoTab("upload")}>Upload file</button>
            </div>

            {videoTab === "url" && (
              <div className="tabContent">
                <input
                  placeholder="https://… (mp4, webm)"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                />
                <div className="btnRow">
                  <button className="addBtn" onClick={applyVideoUrl}>Applica URL</button>
                  {config.videoUrl && (
                    <button className="delBtn" onClick={() => {
                      setVideoUrlInput("");
                      const next = { ...config, videoUrl: "" };
                      setConfig(next);
                      save(next);
                    }}>Rimuovi override</button>
                  )}
                </div>
              </div>
            )}

            {videoTab === "upload" && (
              <div className="tabContent">
                <input ref={fileRef} type="file" accept="video/mp4,video/webm" className="fileInput" />
                <button className="addBtn" onClick={handleUpload} disabled={uploading}>
                  {uploading ? "Caricamento…" : "Carica video"}
                </button>
                {uploadMsg && <p className="uploadMsg">{uploadMsg}</p>}
              </div>
            )}
          </section>

        </div>
      )}

      <style jsx>{`
        .admin { min-height:100vh; background:#0a0a0a; color:#eef2ff; font-size:14px; padding:0 0 40px; }
        .hdr { display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .brand { font-size:15px; font-weight:700; }
        .brand em { font-style:normal; color:rgba(238,242,255,0.45); font-weight:400; margin-left:6px; }
        .saveMsg { background:#166534; color:#bbf7d0; font-size:12px; padding:4px 10px; border-radius:999px; }
        .loading { padding:20px; color:rgba(238,242,255,0.5); }
        .cols { display:grid; grid-template-columns:1fr 1fr; gap:16px; padding:20px; }
        @media(max-width:700px) { .cols { grid-template-columns:1fr; } }
        .card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:16px; display:flex; flex-direction:column; gap:14px; }
        h2 { margin:0; font-size:15px; }
        h3 { margin:0; font-size:13px; color:rgba(238,242,255,0.6); }
        .stationList { display:flex; flex-direction:column; gap:6px; }
        .stationRow { display:flex; align-items:center; justify-content:space-between; gap:8px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:8px 10px; }
        .stationInfo { display:flex; flex-direction:column; gap:2px; min-width:0; }
        .stationInfo b { font-size:13px; }
        .stationInfo span { font-size:11px; color:rgba(238,242,255,0.5); }
        .del { background:rgba(248,113,113,0.12); border:1px solid rgba(248,113,113,0.2); color:#f87171; width:26px; height:26px; border-radius:8px; cursor:pointer; flex-shrink:0; font-size:11px; }
        .del:hover { background:rgba(248,113,113,0.22); }
        .empty { color:rgba(238,242,255,0.4); font-size:13px; margin:0; }
        .addForm { display:flex; flex-direction:column; gap:8px; border-top:1px solid rgba(255,255,255,0.08); padding-top:12px; }
        input:not([type=file]) { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:#eef2ff; padding:8px 10px; border-radius:8px; font-size:13px; outline:none; width:100%; box-sizing:border-box; }
        input:focus:not([type=file]) { border-color:rgba(255,255,255,0.28); }
        .row2 { display:flex; gap:6px; }
        .row2 input { flex:1; }
        .addBtn { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.16); color:#eef2ff; padding:8px 14px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; align-self:flex-start; }
        .addBtn:disabled { opacity:0.4; cursor:not-allowed; }
        .addBtn:not(:disabled):hover { background:rgba(255,255,255,0.16); }
        .delBtn { background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.2); color:#f87171; padding:8px 14px; border-radius:8px; font-size:13px; cursor:pointer; }
        .delBtn:hover { background:rgba(248,113,113,0.2); }
        .current { font-size:12px; color:rgba(238,242,255,0.55); margin:0; word-break:break-all; }
        .current.muted { color:rgba(238,242,255,0.3); }
        .current a { color:rgba(138,180,248,0.9); }
        .tabs { display:flex; gap:6px; }
        .tab { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:rgba(238,242,255,0.6); padding:6px 12px; border-radius:8px; font-size:12px; cursor:pointer; }
        .tab.active { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); color:#eef2ff; }
        .tabContent { display:flex; flex-direction:column; gap:8px; }
        .btnRow { display:flex; gap:8px; flex-wrap:wrap; }
        .fileInput { color:rgba(238,242,255,0.7); font-size:13px; }
        .uploadMsg { font-size:12px; color:#86efac; margin:0; }
      `}</style>
    </main>
  );
}
