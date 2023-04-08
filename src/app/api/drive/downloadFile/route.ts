import { driveDownloadFileFactory } from "@/server/drive/factories/DriveDownloadFileFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const response = await driveDownloadFileFactory().handle()
    return new NextResponse(response)
}
