import { YoutubeSearchCase } from "../cases/youtubeSearchCase/YoutubeSearchCase";
import { YoutubeSearchController } from "../controllers/YoutubeSearchController";

export function youtubeSearchFactory(){
    return new YoutubeSearchController(new YoutubeSearchCase())
}