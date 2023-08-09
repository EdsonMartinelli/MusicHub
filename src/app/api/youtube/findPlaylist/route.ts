import { youtubeFindPlaylist } from "@/server/youtube/youtubeFindPlaylist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await youtubeFindPlaylist();
  return NextResponse.json(response);
}
