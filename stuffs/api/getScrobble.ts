import { getApiKey } from "./getApiKey";
import { toUnixSeconds } from "../util/getTargetDate";

export type Track = {
  name: string;
  artist: { ["#text"]: string };
  date?: { uts: string; ["#text"]: string };
  ["@attr"]?: { nowplaying?: "true" };
  image?: Array<{ ["#text"]: string; size: string }>;
};

export async function getScrobble(params: {
  username: string;
  target: Date;
}): Promise<Track | null> {
  const apiKey = getApiKey();
  const to = toUnixSeconds(params.target);

  console.log("Fetching Last.fm with to =", to);

  const url =
    "https://ws.audioscrobbler.com/2.0/" +
    `?method=user.getrecenttracks` +
    `&user=${encodeURIComponent(params.username)}` +
    `&to=${to}` +
    `&limit=5` +
    `&api_key=${encodeURIComponent(apiKey)}` +
    `&format=json`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json?.error) {
    throw new Error(json.message ?? `Last.fm error ${json.error}`);
  }

  const tracks = json?.recenttracks?.track ?? [];
  const arr = Array.isArray(tracks) ? tracks : [tracks];
  const match = arr.find(
    (t: any) => t?.date?.uts && t?.["@attr"]?.nowplaying !== "true"
  );

  return match ?? null;
}