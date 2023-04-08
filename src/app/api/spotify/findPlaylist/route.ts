import { spotifyFindPlaylistFactory } from "@/server/spotify/factories/spotifyFindPlaylistFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const response = await spotifyFindPlaylistFactory().handle()
    return NextResponse.json(response)
}

