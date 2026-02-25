import Constants from "expo-constants";

export function getApiKey(): string {
  return (Constants.expoConfig?.extra as any)?.lastfmApiKey as string;
}