import { driveFindFiles } from "@/server/drive/driveFindFiles";
import { NextRequest, NextResponse } from "next/server";

type NextRequestWithBody = NextRequest & {
  body: {
    id: string;
  };
};
export async function GET(request: NextRequestWithBody) {
  const folderId = request.body.id;
  const response = await driveFindFiles(folderId);
  return NextResponse.json(response);
}
