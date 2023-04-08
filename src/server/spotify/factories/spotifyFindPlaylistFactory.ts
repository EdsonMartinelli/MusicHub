import { SpotifyFindPlaylistCase } from "../cases/SpotifyFindPlaylistCase/SpotifyFindPlaylistCase";
import { SpotifyFindPlaylistController } from "../controllers/SpotifyFindPlaylistController";

export function spotifyFindPlaylistFactory(){
    return new SpotifyFindPlaylistController(new SpotifyFindPlaylistCase())
}