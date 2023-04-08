export interface ISpotifyFindPlaylistCase{
    execute: () => Promise<{list: string[]}>
}