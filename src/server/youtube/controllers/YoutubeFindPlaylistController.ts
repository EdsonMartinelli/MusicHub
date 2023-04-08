import { IYoutubeFindPlaylistCase } from "../cases/youtubeFindPlaylistCase/IYoutubeFindPlaylistCase";

export class YoutubeFindPlaylistController{
    constructor(private readonly youtubeFindPlaylistCase: IYoutubeFindPlaylistCase){}

    async handle(){
        const result = await this.youtubeFindPlaylistCase.execute()
        return result
    }
}