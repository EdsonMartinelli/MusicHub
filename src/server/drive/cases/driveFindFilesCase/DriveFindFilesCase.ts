import { IDriveFindFilesCase } from "./IDriveFindFilesCase"

export class DriveFindFilesCase implements IDriveFindFilesCase{
    async execute(){
        const key= process.env.GOOGLE_KEY;
        const corpora = "user"
        const folderId = "196avRwiYuQuEILLXn1Oi_xaYYQnS252S"
        const q = `'${folderId}' in parents`
        const fields = "nextPageToken%2CincompleteSearch%2Cfiles(id%2Cname%2CmimeType%2CcreatedTime)"
        const url = `https://www.googleapis.com/drive/v3/files?corpora=${corpora}&q=${q}&&fields=${fields}&key=${key}`
        const res = await fetch(url)
        const data = await res.json()

        const response = data.files.map((item: any) => {
            const date = new Date("2022-01-27T22:53:53.741Z")
            const shortDate = `${date.toLocaleString("en-US", {month: "short"})}, ${date.getFullYear()}`
            return {
                name: item.name,
                id: item.id,
                createdTime: shortDate
            }
        })
        return {list: response}
    }
}