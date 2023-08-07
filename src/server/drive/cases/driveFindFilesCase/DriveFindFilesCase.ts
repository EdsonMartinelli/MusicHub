import { IDriveFindFilesCase } from "./IDriveFindFilesCase";
type responseFetchItemType = {
  mimeType: string;
  id: string;
  name: string;
  createdTime: string;
};

type responseFetchType = {
  nextPageToken?: string;
  files: responseFetchItemType[];
};

type formatedResponseItemType = {
  name: string;
  id: string;
  createdTime: string;
};

type formatedResponseType = {
  files: formatedResponseItemType[];
  nextPageToken?: string;
};

export class DriveFindFilesCase implements IDriveFindFilesCase {
  async execute() {
    const response = await this.fetchFunction();
    let newPageToken = response.nextPageToken;
    const listOfSong = { list: response.files };

    while (newPageToken != null) {
      const newResponse = await this.fetchFunction(newPageToken);
      newPageToken = newResponse.nextPageToken;
      listOfSong.list = listOfSong.list.concat(newResponse.files);
    }

    return listOfSong;
  }

  async fetchFunction(pageToken?: string): Promise<formatedResponseType> {
    const key = process.env.GOOGLE_KEY;
    const corpora = "user";
    const folderId = "196avRwiYuQuEILLXn1Oi_xaYYQnS252S";
    const q = `'${folderId}' in parents`;
    const fields = "nextPageToken%2Cfiles(id%2Cname%2CmimeType%2CcreatedTime)";
    const url = `https://www.googleapis.com/drive/v3/files?corpora=${corpora}&q=${q}&&fields=${fields}&key=${key}`;
    const urlWithPageToken = `https://www.googleapis.com/drive/v3/files?corpora=${corpora}&q=${q}&&fields=${fields}&key=${key}&pageToken=${pageToken}`;
    const response = await fetch(pageToken == null ? url : urlWithPageToken);
    const responseJSON: responseFetchType = await response.json();

    const filteredResponse: responseFetchItemType[] = responseJSON.files.filter(
      (item: any) => item.mimeType == "audio/mpeg"
    );

    const formatedResponse = filteredResponse.map(
      (item: responseFetchItemType) => {
        const date = new Date(item.createdTime);
        const shortDate = `${date.toLocaleString("en-US", {
          month: "short",
        })}, ${date.getFullYear()}`;
        return {
          name: item.name,
          id: item.id,
          createdTime: shortDate,
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
