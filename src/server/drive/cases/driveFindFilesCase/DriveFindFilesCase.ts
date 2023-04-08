import { IDriveFindFilesCase } from "./IDriveFindFilesCase"

export class DriveFindFilesCase implements IDriveFindFilesCase{
    async execute(){
        const key= process.env.GOOGLE_KEY;
        const corpora = "user"
        const folderId = "196avRwiYuQuEILLXn1Oi_xaYYQnS252S"
        const q = `'${folderId}' in parents`
        const url = `https://www.googleapis.com/drive/v3/files?corpora=${corpora}&q=${q}&key=${key}`
        const res = await fetch(url)
        const data = await res.json()

        const response = data.files.map((item: any) => {
            return {
                name: item.name,
                id: item.id
            }
        })
        return {list: response}
    }
}