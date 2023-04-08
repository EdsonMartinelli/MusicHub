import { driveFindFilesFactory } from "@/server/drive/factories/DriveFindFilesFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const response = await driveFindFilesFactory().handle()
    return NextResponse.json(response)
}
