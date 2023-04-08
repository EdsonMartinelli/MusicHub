export interface IYoutubeFindPlaylistCase{
    execute: () => Promise<{list: string[]}>
}