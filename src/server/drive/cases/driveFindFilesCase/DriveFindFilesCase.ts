import { IDriveFindFilesCase } from "./IDriveFindFilesCase";
type responseDriveItemType = {
  mimeType: string;
  id: string;
  name: string;
  createdTime: string;
};

type responseDriveType = {
  nextPageToken?: string;
  files: responseDriveItemType[];
};

type formatedItemType = {
  title: string;
  author: string;
  id: string;
  createdAt: string;
};

type formatedReturnType = {
  files: formatedItemType[];
  nextPageToken?: string;
};

export class DriveFindFilesCase implements IDriveFindFilesCase {
  async execute() {
    const { files, nextPageToken } = await this.driveFetch();
    let newPageToken = nextPageToken;
    let list = files;

    while (newPageToken != null) {
      const { files: newFiles, nextPageToken: newNextPageToken } =
        await this.driveFetch(nextPageToken);
      newPageToken = newNextPageToken;
      list = [...list, ...newFiles];
    }

    return { list };
  }

  async driveFetch(pageToken?: string): Promise<formatedReturnType> {
    const key = process.env.GOOGLE_KEY;
    const corpora = "user";
    const folderId = "196avRwiYuQuEILLXn1Oi_xaYYQnS252S";
    const q = `'${folderId}' in parents`;
    const fields = "nextPageToken%2Cfiles(id%2Cname%2CmimeType%2CcreatedTime)";
    const url = `https://www.googleapis.com/drive/v3/files?corpora=${corpora}&q=${q}&&fields=${fields}&key=${key}`;
    const response = await fetch(
      pageToken == null ? url : `${url}&pageToken=${pageToken}`
    );
    const responseJSON: responseDriveType = await response.json();

    const filteredResponse: responseDriveItemType[] = responseJSON.files.filter(
      (item: any) => item.mimeType == "audio/mpeg"
    );

    const formatedResponse = filteredResponse.map(
      (item: responseDriveItemType) => {
        const date = new Date(item.createdTime);
        const shortDate = `${date.toLocaleString("en-US", {
          month: "short",
        })}, ${date.getFullYear()}`;

        const [author, title] = item.name.replace(".mp3", "").split(" - ");

        return {
          id: item.id,
          title,
          author,
          createdAt: shortDate,
        };
      }
    );

    if (responseJSON.nextPageToken == null) return { files: formatedResponse };

    return {
      files: formatedResponse,
      nextPageToken: responseJSON.nextPageToken,
    };
  }
}
