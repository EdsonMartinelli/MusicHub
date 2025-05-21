import ErrorPage from "@/client/components/ErrorPage/ErrorPage";
import { ProviderWrapperDrive } from "@/client/components/Providers/ProviderWrapperDrive";
import { DRIVE_FOLDER_ID, ENV_TYPE } from "@/env";
import { dataDrive } from "@/fakeData";
import { driveFindFiles } from "@/server/drive/driveFindFiles";
import { PlaylistInfo } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Hub - Drive",
  description: "A simple site for my favorites songs",
  icons: {
    icon: ["/icon.png"],
    apple: ["/icon.png"],
    shortcut: ["/icon.png"],
  },
};

export default async function Drive() {
  const playlistInfo = await getPlaylistDrive();

  if (!(playlistInfo.error == null)) return <ErrorPage />;

  return (
    <>
      <ProviderWrapperDrive playlist={playlistInfo.songs} />
    </>
  );
}

async function getPlaylistDrive(): Promise<PlaylistInfo> {
  if (ENV_TYPE == "development") {
    return {
      songs: dataDrive,
    };
  }

  const promisedPlaylists = DRIVE_FOLDER_ID.map((folderId) =>
    driveFindFiles(folderId)
  );

  const playlists = await Promise.all(promisedPlaylists);

  const infoFolders = playlists.reduce(
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

  return infoFolders;
}
