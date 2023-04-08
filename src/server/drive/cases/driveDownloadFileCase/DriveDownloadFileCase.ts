import { IDriveDownloadFileCase } from "./IDriveDownloadFileCase";

export class DriveDownloadFileCase implements IDriveDownloadFileCase{
    async execute(){
        const key= process.env.GOOGLE_KEY;
        const file = "1W3yG1O2TB3dscfQBrFV42e_kgHXhh5AG"
        const alt = "media"
        const url = `https://www.googleapis.com/drive/v3/files/${file}?alt=${alt}&key=${key}`
       
        const res = await fetch(url, {cache: 'no-store'})
        const data = await res.blob()
        
        return data
    }
}