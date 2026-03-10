export type Station = {
  id: string;
  cityLabel: string;
  stationLabel: string;
  embedUrl: string;
  freq: string;
};

export type SiteConfig = {
  stations: Station[];
  videoUrl: string; // empty string = use local /loops/pov.*
};

export function toEmbedUrl(playlistUrl: string): string {
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

export const defaultConfig: SiteConfig = {
  stations: [
    {
      id: "navigli-nights",
      cityLabel: "Milano",
      stationLabel: "Navigli Nights",
      freq: "97.3",
      embedUrl:
        "https://open.spotify.com/embed/playlist/4t7Kb2QEWCwt96CfsYHC7L?utm_source=generator",
    },
    {
      id: "duomo-drift",
      cityLabel: "Milano",
      stationLabel: "Duomo Drift",
      freq: "101.5",
      embedUrl:
        "https://open.spotify.com/embed/playlist/1D3IkjrQv7TPcfwyplb4Hf?utm_source=generator",
    },
    {
      id: "porta-romana",
      cityLabel: "Milano",
      stationLabel: "Porta Romana",
      freq: "88.7",
      embedUrl:
        "https://open.spotify.com/embed/playlist/3WWGsRoU65tU0g9bLATQMw?utm_source=generator",
    },
  ],
  videoUrl: "",
};
