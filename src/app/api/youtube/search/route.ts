import { youtubeSearch } from "@/server/youtube/youtubeSearch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await youtubeSearch();
  return NextResponse.json(response);
}
