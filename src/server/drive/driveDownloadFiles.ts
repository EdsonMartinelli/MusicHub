export async function driveDownloadFile(id: string): Promise<Blob> {
  const key = process.env.GOOGLE_KEY;
  //const file = "1W3yG1O2TB3dscfQBrFV42e_kgHXhh5AG"
  const file = id;
  const alt = "media";
  const url = `https://www.googleapis.com/drive/v3/files/${file}?alt=${alt}&key=${key}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.blob();

  return data;
}
