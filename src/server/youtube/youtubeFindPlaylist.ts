import { SongInfo, handledResponse } from "@/types";
import { getShortDate } from "../utils";
import { URLError } from "../errors/URLError";

type responseYoutubeItem = {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    videoOwnerChannelTitle: string;
  };
};

type responseYoutube = {
  nextPageToken?: string;
  items: responseYoutubeItem[];
};

type videosWithNextPage = {
  videos: SongInfo[];
  nextPageToken?: string;
};

export async function youtubeFindPlaylist(
  playlistId: string
): Promise<handledResponse> {
  try {
    const { videos, nextPageToken } = await youtubeFetch(playlistId);
    let newPageToken = nextPageToken;
    let list = videos;

    while (newPageToken != null) {
      const { videos: newVideos, nextPageToken: newNextPageToken } =
        await youtubeFetch(playlistId, newPageToken);
      newPageToken = newNextPageToken;
      list = [...list, ...newVideos];
    }
    return { list };
  } catch (error: any) {
    return { list: [], error: error.message };
  }
}

async function youtubeFetch(
  playlistId: string,
  pageToken?: string
): Promise<videosWithNextPage> {
  const key = process.env.GOOGLE_KEY;
  const part = "snippet";
  const maxResults = 50;
  const fields =
    "items/id, items/snippet/title, items/snippet/publishedAt, items/snippet/videoOwnerChannelTitle, nextPageToken";
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${key}&part=${part}&maxResults=${maxResults}&fields=${fields}`;
  const response = await fetch(
    pageToken == null ? url : `${url}&pageToken=${pageToken}`,
    { next: { revalidate: 60 * 60 * 24 * 15 } } // 15 days in seconds
  );

  if (!response.ok) throw new URLError();

  const responseJSON: responseYoutube = await response.json();

  const filteredResponse: responseYoutubeItem[] = responseJSON.items.filter(
    (item) => !(item.snippet.videoOwnerChannelTitle == undefined)
  );

  let videos = filteredResponse.map((item: responseYoutubeItem) => {
    return {
      title: item.snippet.title,
      author: item.snippet.videoOwnerChannelTitle,
      id: item.id,
      createdAt: getShortDate(item.snippet.publishedAt),
    };
  });

  if (responseJSON.nextPageToken == null) return { videos };

  return {
    videos,
    nextPageToken: responseJSON.nextPageToken,
  };
}
