import { Track } from "../api/getScrobble";

export const LASTFM_NO_ART =
  "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";

export function pickBestImageUrl(track: Track | null): string {
  const imgs = track?.image ?? [];
  for (let i = imgs.length - 1; i >= 0; i--) {
    const url = imgs[i]?.["#text"];
    if (url) return url;
  }
  return "";
}