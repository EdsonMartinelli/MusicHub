import ErrorPage from "@/client/components/ErrorPage/ErrorPage";
import { ProviderWrapperYoutube } from "@/client/components/Providers/ProviderWrapperYoutube";
import { ENV_TYPE, YT_PLAYLIST_ID } from "@/env";
import { dataMultiSource, dataYT } from "@/fakeData";
import { youtubeFindPlaylist } from "@/server/youtube/youtubeFindPlaylist";
import { PlaylistInfo } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Hub - Youtube",
  description: "A simple site for my favorites songs",
  icons: {
    icon: ["/icon.png"],
    apple: ["/icon.png"],
    shortcut: ["/icon.png"],
  },
};

export default async function Teste() {
  const playlistInfo = await getPlaylistYT();
  console.log(playlistInfo);

  if (!(playlistInfo.error == null)) return <ErrorPage />;

  return (
    <>
      <ProviderWrapperYoutube playlist={playlistInfo.songs} />
    </>
  );
}

async function getPlaylistYT(): Promise<PlaylistInfo> {
  if (ENV_TYPE == "development") {
    return {
      songs: dataMultiSource,
    };
  }

  const promisedPlaylists = YT_PLAYLIST_ID.map((playlistId) =>
    youtubeFindPlaylist(playlistId)
  );
  const responsedPlaylists = await Promise.all(promisedPlaylists);

  const infoPlaylists = responsedPlaylists.reduce(
    (acc, playlist) => {
      if (!(acc.error == null)) return { songs: [], error: acc.error };
      if (!(playlist.error == null))
        return { songs: [], error: playlist.error };
      return {
        songs: [...acc.songs, ...playlist.songs],
      };
    },
    { songs: [] } as PlaylistInfo
  );

  return infoPlaylists;
}
