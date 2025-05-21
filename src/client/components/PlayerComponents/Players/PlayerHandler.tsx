import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import { PlayerDrive } from "./PlayerDrive";
import { PlayerYoutube } from "./PlayerYoutube";
import { PlayerBackgroundUI } from "./UI/PlayerBackgroundUI";

export function PlayerHandler() {
  const currentState = useSelector(
    (state: RootState) => state.playlist.currentState
  );

  if (currentState == "idle") return null;

  return (
    <PlayerBackgroundUI>
      <PlayerSelector />
    </PlayerBackgroundUI>
  );
}

function PlayerSelector() {
  const currentSong = useSelector(
    (state: RootState) => state.playlist.currentSong
  );

  if (currentSong?.source === "drive") return <PlayerDrive />;

  if (currentSong?.source === "youtube") return <PlayerYoutube />;

  return null;
}
