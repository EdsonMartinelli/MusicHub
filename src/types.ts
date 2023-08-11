export type SongInfo = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
};

export type handledResponse = { list: SongInfo[]; error?: string };
