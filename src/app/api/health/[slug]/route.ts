import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const response = {
    status: "running",
    message: "IT IS ALIVE",
    yourMessage: params.slug,
  };
  return NextResponse.json(response);
}
