import ErrorPage from "@/client/components/ErrorPage/ErrorPage";
import ProviderWrapperYoutube from "@/client/components/Providers/ProviderWrapperYoutube";
import { youtubeFindPlaylist } from "@/server/youtube/youtubeFindPlaylist";
import { handledResponse } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Hub - Youtube",
  description: "A simples site with my favorites songs",
  icons: {
    icon: ["/icon.png"],
    apple: ["/icon.png"],
    shortcut: ["/icon.png"],
  },
};

const data = [
  {
    id: "vO-6OWBUxxo",
    title: "Disco Metal",
    author: "Nanowar of Steel",
    createdAt: "Feb, 2023",
  },
  {
    id: "GiT7fhfTrPQ",
    title: "Strobe (Radio Edit)",
    author: "Deadmau5",
    createdAt: "Fev, 2017",
  },
  {
    id: "O5Hn0df4sda",
    title: "Teste",
    author: "Teste",
    createdAt: "Jul, 2023",
  },
  {
    id: "O5Hn0df4sdasdfsadfsdfsadfsadfsadfsfsadfsdf",
    title: "Teste2",
    author: "Teste2",
    createdAt: "Jul, 2023",
  },
  {
    id: "7QU1nvuxaMA",
    title: "Like a Stone",
    author: "Audioslave",
    createdAt: "Out, 2009",
  },
];

const playlistsId = [
  "PLY3DcCkHnjbGk0irgvqcLKRT2D5TdK_tL",
  "PLY3DcCkHnjbFYnB77TpHJ9KMPHZxyC0xw",
];

export default async function Youtube() {
  const env = process.env.NEXT_APP_ENV || "development";

  const infoPlaylists = await environmentLock(env);

  if (!(infoPlaylists.error == null)) return <ErrorPage />;

  return (
    <>
      <ProviderWrapperYoutube
        playlist={infoPlaylists.list}
        isInProduction={env == "development" ? false : true}
      />
    </>
  );
}

async function environmentLock(env: string): Promise<handledResponse> {
  if (env == "development") {
    return {
      list: data,
    };
  }

  const promisedPlaylists = playlistsId.map((playlistId) =>
    youtubeFindPlaylist(playlistId)
  );
  const responsedPlaylists = await Promise.all(promisedPlaylists);

  const infoPlaylists = responsedPlaylists.reduce(
    (acc, playlist) => {
      if (!(acc.error == null)) return { list: [], error: acc.error };
      if (!(playlist.error == null)) return { list: [], error: playlist.error };
      return {
        list: [...acc.list, ...playlist.list],
      };
    },
    { list: [] } as handledResponse
  );

  return infoPlaylists;
}
