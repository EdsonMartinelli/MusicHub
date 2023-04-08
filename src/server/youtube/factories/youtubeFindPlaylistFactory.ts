import { YoutubeFindPlaylistCase } from "../cases/youtubeFindPlaylistCase/YoutubeFindPlaylistCase";
import { YoutubeFindPlaylistController } from "../controllers/YoutubeFindPlaylistController";

export function youtubeFindPlaylistFactory(){
    return new YoutubeFindPlaylistController(new YoutubeFindPlaylistCase())
}