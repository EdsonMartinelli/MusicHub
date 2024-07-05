import { driveDownloadFile } from "@/server/drive/driveDownloadFiles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const res = await fetch(
    `https://drive.usercontent.google.com/download?id=${params.slug}&export=download&authuser=0`,
    { cache: "no-store" }
  );
  return res;
}

//http://localhost:3000/api/drive/downloadFile/AIzaSyCTIsy1XgV-liSv-7sY2_UBn0kR0txpdCQ
