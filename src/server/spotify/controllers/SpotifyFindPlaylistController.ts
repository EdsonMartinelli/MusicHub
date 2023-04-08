import { ISpotifyFindPlaylistCase } from "../cases/SpotifyFindPlaylistCase/ISpotifyFindPlaylistCase"

export class SpotifyFindPlaylistController{
    constructor(private readonly spotifyFindPlaylistCase: ISpotifyFindPlaylistCase){}

    async handle(){
        const result = await this.spotifyFindPlaylistCase.execute()
        return result
    }
}