export interface IYoutubeFindPlaylistCase {
  execute: () => Promise<{
    list: { title: string; author: string; id: string; createdAt: string }[];
  }>;
}
