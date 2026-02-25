import React, { useState } from "react";
import { Button, Image, Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { YearSelect } from "./stuffs/other/YearSelect";
import { getTargetDate } from "./stuffs/util/getTargetDate";
import { getScrobble, Track } from "./stuffs/api/getScrobble";

import { LASTFM_NO_ART, pickBestImageUrl } from "./stuffs/util/albumCover";




export default function App() {
  const [username, setUsername] = useState("");
  const [yearsAgo, setYearsAgo] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [debugTarget, setDebugTarget] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<Track | null>(null);


  async function fetchOne() {
    try {
      Keyboard.dismiss();

      setStatus("Fetching...");

      setResult(null);

      const { target } = getTargetDate(yearsAgo);
      setDebugTarget(target.toLocaleString());


      const track = await getScrobble({
        username,
        target,
      });

      if (track) {
        const pickedCover = pickBestImageUrl(track);
        if (pickedCover) {
          console.log("Album cover found, using it");
        } else {
          console.log("Cover not found, default image used for: ", track.artist?.["#text"], "- ", track.name);
        }
      }

      setResult(track);
      setStatus(track ? "Done" : "No scrobble found");
    } catch (e: any) {
      console.log("Fetch error:", e?.message ?? e);
      setStatus(`Error: ${e?.message ?? String(e)}`);
    }
  }

  const scrobbleLocalTime = result?.date?.uts ? new Date(Number(result.date.uts) * 1000).toLocaleString() : ""; 


  const pickedCover = pickBestImageUrl(result);
  const artUrl = pickedCover || LASTFM_NO_ART;


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ paddingTop: 12, paddingHorizontal: 16, flex: 1 }}>
        <View style={{ gap: 12 }}>
          <Text>Last.fm username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={{ borderWidth: 1, padding: 8 }}
          />

          <YearSelect value={yearsAgo} onChange={setYearsAgo} />

          <Button title="Fetch" onPress={fetchOne} color="#d92323" />

          <Text>{status}</Text>
          <Text>Target (local): {debugTarget}</Text>

          <View style={{ marginTop: 12, gap: 6 }}>
            {result ? (
              <>
                <Text>{result.name}</Text>
                <Text>{result.artist?.["#text"]}</Text>

                <Image
                  source={{ uri: artUrl }}
                  style={{ width: 160, height: 160 }}
                  resizeMode="cover"
                />

                <Text>{scrobbleLocalTime}</Text>
              </>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>


      </SafeAreaView>
    </SafeAreaProvider>
  );
}