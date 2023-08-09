import { spotifyFindPlaylist } from "@/server/spotify/spotifyFindPlaylist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await spotifyFindPlaylist();
  return NextResponse.json(response);
}
