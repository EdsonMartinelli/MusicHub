import { getSpotifyToken } from "./getSpotifyToken";

export async function spotifyFindPlaylist() {
  const playlistId = "37i9dQZF1DX0FOF1IUWK1W";
  const token = await getSpotifyToken();

  const fields = "items(track(name))";
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=BR&fields=${fields}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  const response = data.items.map((item: any) => item.track.name);
  return { list: response };
}
