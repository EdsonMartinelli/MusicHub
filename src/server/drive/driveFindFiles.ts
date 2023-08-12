import { SongInfo, handledResponse } from "@/types";
import { getShortDate } from "../utils";
import { URLError } from "../errors/URLError";

type responseDriveItem = {
  mimeType: string;
  id: string;
  name: string;
  createdTime: string;
};

type responseDrive = {
  nextPageToken?: string;
  items: responseDriveItem[];
};

type filesWithNextPage = {
  files: SongInfo[];
  nextPageToken?: string;
};

export async function driveFindFiles(
  folderId: string
): Promise<handledResponse> {
  try {
    const { files, nextPageToken } = await driveFetch(folderId);
    let newPageToken = nextPageToken;
    let list = files;

    while (newPageToken != null) {
      const { files: newFiles, nextPageToken: newNextPageToken } =
        await driveFetch(folderId, nextPageToken);
      newPageToken = newNextPageToken;
      list = [...list, ...newFiles];
    }

    return { list };
  } catch (error: any) {
    return { list: [], error: error.message };
  }
}

async function driveFetch(
  folderId: string,
  pageToken?: string
): Promise<filesWithNextPage> {
  const key = process.env.GOOGLE_KEY;
  const corpora = "user";
  const q = `'${folderId}' in parents`;
  const fields = "nextPageToken%2Cfiles(id%2Cname%2CmimeType%2CcreatedTime)";
  const url = `https://www.googleapis.com/drive/v3/files?corpora=${corpora}&q=${q}&&fields=${fields}&key=${key}`;
  const response = await fetch(
    pageToken == null ? url : `${url}&pageToken=${pageToken}`,
    { next: { revalidate: 60 * 60 * 24 * 15 } } // 15 days in seconds
  );

  if (!response.ok) throw new URLError();

  const responseJSON: responseDrive = await response.json();

  const filteredResponse: responseDriveItem[] = responseJSON.items.filter(
    (item) => item.mimeType == "audio/mpeg"
  );

  const files = filteredResponse.map((item: responseDriveItem) => {
    const [author, title] = item.name.replace(".mp3", "").split(" - ");
    return {
      id: item.id,
      title: title ?? "",
      author: author ?? "",
      createdAt: getShortDate(item.createdTime),
    };
  });

  if (responseJSON.nextPageToken == null) return { files };

  return {
    files,
    nextPageToken: responseJSON.nextPageToken,
  };
}
