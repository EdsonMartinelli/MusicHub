import { NextRequest } from "next/server";
import { IYoutubeSearchCase } from "../cases/youtubeSearchCase/IYoutubeSearchCase";

export class YoutubeSearchController{
    constructor(private readonly youtubeSearchCase: IYoutubeSearchCase){}

    async handle(request: NextRequest){
        const result = await this.youtubeSearchCase.execute()
        return result
    }
}