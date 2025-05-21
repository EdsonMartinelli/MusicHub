import { PlaylistInfo, SongInfo, SongsPageInfo } from "@/types";
import { getShortDate } from "../utils";

type VideoInfoYT = {
  snippet: {
    publishedAt: string;
    title: string;
    videoOwnerChannelTitle: string;
    resourceId: {
      videoId: string;
    };
  };
};

type PageInfoYT = {
  nextPageToken?: string;
  items: VideoInfoYT[];
};

export async function youtubeFindPlaylist(
  playlistId: string
): Promise<PlaylistInfo> {
  let nextPageToken: string | undefined = undefined;
  let songsList: SongInfo[] = [];

  do {
    const {
      songs,
      nextPageToken: newNextPageToken,
      error,
    } = await youtubeFetch(playlistId, nextPageToken);

    if (error != null) {
      return { songs: songsList, error };
    }

    nextPageToken = newNextPageToken;
    songsList = [...songsList, ...songs];
  } while (nextPageToken != null);

  return { songs: songsList };
}

async function youtubeFetch(
  playlistId: string,
  pageToken?: string
): Promise<SongsPageInfo> {
  const key = process.env.GOOGLE_KEY;
  const part = "snippet";
  const maxResults = 50;
  const fields =
    "items/snippet/resourceId/videoId, items/snippet/title, items/snippet/publishedAt, items/snippet/videoOwnerChannelTitle, nextPageToken";
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${key}&part=${part}&maxResults=${maxResults}&fields=${fields}`;
  const pageInfo = await fetch(
    pageToken == null ? url : `${url}&pageToken=${pageToken}`,
    { next: { revalidate: 60 * 60 * 24 * 15 } } // 15 days in seconds
  );

  if (!pageInfo.ok) return { songs: [], error: "URLError" };

  let pageInfoJSON: PageInfoYT;

  try {
    pageInfoJSON = await pageInfo.json();
  } catch (exception) {
    return { songs: [], error: "JSONParseError" };
  }

  const filteredVideos: VideoInfoYT[] = pageInfoJSON.items.filter(
    (item) => !(item.snippet.videoOwnerChannelTitle == undefined)
  );

  let songs = filteredVideos.map((video) => {
    return {
      title: video.snippet.title,
      author: video.snippet.videoOwnerChannelTitle,
      id: video.snippet.resourceId.videoId,
      createdAt: getShortDate(video.snippet.publishedAt),
      source: "youtube",
    } satisfies SongInfo;
  });

  if (pageInfoJSON.nextPageToken == null) return { songs };

  return {
    songs,
    nextPageToken: pageInfoJSON.nextPageToken,
  };
}
