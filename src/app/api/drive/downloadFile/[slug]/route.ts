import { driveDownloadFileFactory } from "@/server/drive/factories/DriveDownloadFileFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_: NextRequest, {params}: {params: { slug: string }}) {
    
    /* const response = params.slug
    return NextResponse.json({slug: response}) */
     const response = await driveDownloadFileFactory().handle(params.slug)
    return new NextResponse(response)
}
