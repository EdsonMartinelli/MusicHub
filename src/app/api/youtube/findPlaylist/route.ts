import { youtubeFindPlaylistFactory } from "@/server/youtube/factories/youtubeFindPlaylistFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const response = await youtubeFindPlaylistFactory().handle()
    return NextResponse.json(response)
}
