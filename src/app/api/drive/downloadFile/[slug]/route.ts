import { driveDownloadFile } from "@/server/drive/driveDownloadFiles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } }
) {
  /* const response = params.slug
    return NextResponse.json({slug: response}) */
  const response = await driveDownloadFile(params.slug);
  return new NextResponse(response);
}
