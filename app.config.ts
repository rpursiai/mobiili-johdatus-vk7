import fs from "fs";
import path from "path";
import type { ExpoConfig, ConfigContext } from "expo/config";

function readLastFmKey(): string {
  const p = path.join(__dirname, ".env");
  const raw = fs.readFileSync(p, "utf8");
  const m = raw.match(/"last_fm_api_key"\s*=\s*"([^"]+)"/);
  return m ? m[1] : "";
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const lastfmApiKey = readLastFmKey();

  return {
    ...config,
    name: config.name ?? "week7",
    slug: config.slug ?? "week7lastfmapi",
    extra: {
      ...(config.extra ?? {}),
      lastfmApiKey,
    },
  };
};