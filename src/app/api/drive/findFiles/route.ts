import { driveFindFiles } from "@/server/drive/driveFindFiles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("TESTE");
  const response = await driveFindFiles();
  return NextResponse.json(response);
}
