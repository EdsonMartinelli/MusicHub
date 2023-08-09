import { SongInfo } from "@/types";
import { getShortDate } from "../utils";

type responseYoutubeItem = {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    videoOwnerChannelTitle: string;
  };
};

type responseYoutubeType = {
  nextPageToken?: string;
  items: responseYoutubeItem[];
};

type pageSongInfo = {
  videos: SongInfo[];
  nextPageToken?: string;
};

export async function youtubeFindPlaylist(): Promise<{ list: SongInfo[] }> {
  const { videos, nextPageToken } = await youtubeFetch();
  let newPageToken = nextPageToken;
  let list = videos;

  while (newPageToken != null) {
    const { videos: newVideos, nextPageToken: newNextPageToken } =
      await youtubeFetch(newPageToken);
    newPageToken = newNextPageToken;
    list = [...list, ...newVideos];
  }
  return { list };
}

async function youtubeFetch(pageToken?: string): Promise<pageSongInfo> {
  const key = process.env.GOOGLE_KEY;
  const playlist = "PLY3DcCkHnjbGk0irgvqcLKRT2D5TdK_tL";
  const part = "snippet";
  const maxResults = 50;
  const fields =
    "items/id, items/snippet/title, items/snippet/publishedAt, items/snippet/videoOwnerChannelTitle, nextPageToken";
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlist}&key=${key}&part=${part}&maxResults=${maxResults}&fields=${fields}`;
  const res = await fetch(
    pageToken == null ? url : `${url}&pageToken=${pageToken}`
  );

  //if (!response.ok) throw Error("TESTE");
  const data: responseYoutubeType = await res.json();

  let videos = data.items.map((item: responseYoutubeItem) => {
    return {
      title: item.snippet.title,
      author: item.snippet.videoOwnerChannelTitle,
      id: item.id,
      createdAt: getShortDate(item.snippet.publishedAt),
    };
  });

  if (data.nextPageToken == null) return { videos };

  return {
    videos,
    nextPageToken: data.nextPageToken,
  };
}
