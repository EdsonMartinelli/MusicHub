import { NextRequest } from "next/server";

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
