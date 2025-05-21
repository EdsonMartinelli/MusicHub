import { PlaylistInfo, SongInfo, SongsPageInfo } from "@/types";
import { getShortDate } from "../utils";

type FileInfoDrive = {
  mimeType: string;
  id: string;
  name: string;
  createdTime: string;
};

type PageInfoDrive = {
  files: FileInfoDrive[];
  nextPageToken?: string;
};

export async function driveFindFiles(folderId: string): Promise<PlaylistInfo> {
  let nextPageToken: string | undefined = undefined;
  let songsList: SongInfo[] = [];

  do {
    const {
      songs,
      nextPageToken: newNextPageToken,
      error,
    } = await driveFetch(folderId, nextPageToken);

    if (error != null) {
      return { songs: songsList, error };
    }

    nextPageToken = newNextPageToken;
    songsList = [...songsList, ...songs];
  } while (nextPageToken != null);

  return { songs: songsList };
}

async function driveFetch(
  folderId: string,
  pageToken?: string
): Promise<SongsPageInfo> {
  const key = process.env.GOOGLE_KEY;
  const corpora = "user";
  const q = `'${folderId}' in parents`;
  const fields = "nextPageToken%2Cfiles(id%2Cname%2CmimeType%2CcreatedTime)";
  const url = `https://www.googleapis.com/drive/v3/files?corpora=${corpora}&q=${q}&&fields=${fields}&key=${key}`;
  const pageInfo = await fetch(
    pageToken == null ? url : `${url}&pageToken=${pageToken}`,
    { next: { revalidate: 60 * 60 * 24 * 15 } } // 15 days in seconds
  );

  if (!pageInfo.ok) return { songs: [], error: "URLError" };

  let pageInfoJSON: PageInfoDrive;

  try {
    pageInfoJSON = await pageInfo.json();
  } catch (exception) {
    return { songs: [], error: "JSONParseError" };
  }

  const filteredSongs = pageInfoJSON.files.filter(
    (file) => file.mimeType == "audio/mpeg"
  );

  const songs = filteredSongs.map((song) => {
    const [author, title] = song.name.replace(".mp3", "").split(" - ");
    return {
      id: song.id,
      title: title ?? "",
      author: author ?? "",
      createdAt: getShortDate(song.createdTime),
      source: "drive",
    } satisfies SongInfo;
  });

  if (pageInfoJSON.nextPageToken == null) return { songs };

  return {
    songs,
    nextPageToken: pageInfoJSON.nextPageToken,
  };
}
