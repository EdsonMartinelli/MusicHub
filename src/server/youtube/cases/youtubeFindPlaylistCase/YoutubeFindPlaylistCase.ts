import { IYoutubeFindPlaylistCase } from "./IYoutubeFindPlaylistCase";

type responseYoutubeItemType = {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    videoOwnerChannelTitle: string;
  };
};

type responseYoutubeType = {
  nextPageToken?: string;
  items: responseYoutubeItemType[];
};

type formatedItemType = {
  title: string;
  author: string;
  id: string;
  createdAt: string;
};

type formatedReturnType = {
  videos: formatedItemType[];
  nextPageToken?: string;
};

export class YoutubeFindPlaylistCase implements IYoutubeFindPlaylistCase {
  async execute() {
    const { videos, nextPageToken } = await this.youtubeFetch();
    let newPageToken = nextPageToken;
    let list = videos;

    while (newPageToken != null) {
      const { videos: newVideos, nextPageToken: newNextPageToken } =
        await this.youtubeFetch(newPageToken);
      newPageToken = newNextPageToken;
      list = [...list, ...newVideos];
    }
    return { list };
  }

  async youtubeFetch(pageToken?: string): Promise<formatedReturnType> {
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
    const data: responseYoutubeType = await res.json();

    let videos: formatedItemType[] = data.items.map(
      (item: responseYoutubeItemType) => {
        const date = new Date(item.snippet.publishedAt);
        const shortDate = `${date.toLocaleString("en-US", {
          month: "short",
        })}, ${date.getFullYear()}`;

        return {
          title: item.snippet.title,
          author: item.snippet.videoOwnerChannelTitle,
          id: item.id,
          createdAt: shortDate,
        };
      }
    );

    if (data.nextPageToken == null) return { videos };

    return {
      videos,
      nextPageToken: data.nextPageToken,
    };
  }
}
