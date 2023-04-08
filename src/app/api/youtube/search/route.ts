import { youtubeSearchFactory } from "@/server/youtube/factories/youtubeSearchFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const response = await youtubeSearchFactory().handle(request)
  return NextResponse.json(response)
}
