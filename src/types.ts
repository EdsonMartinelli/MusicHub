export type SourceType = "drive" | "youtube";

export type SongInfo = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  source: SourceType;
};

type FetchErrors = "URLError" | "JSONParseError";

export type SongsPageInfo = {
  songs: SongInfo[];
  nextPageToken?: string;
  error?: FetchErrors;
};

export type PlaylistInfo = { songs: SongInfo[]; error?: string };
