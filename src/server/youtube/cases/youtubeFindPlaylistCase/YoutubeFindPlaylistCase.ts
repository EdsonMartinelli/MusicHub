import { IYoutubeFindPlaylistCase } from "./IYoutubeFindPlaylistCase";

export class YoutubeFindPlaylistCase implements IYoutubeFindPlaylistCase{
    async execute(){
        const key= process.env.GOOGLE_KEY
        const playlist = "PLY3DcCkHnjbGk0irgvqcLKRT2D5TdK_tL"
        const part = "snippet"
        const maxResults = 50
        const fields = "items/snippet/title, nextPageToken"
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlist}&key=${key}&part=${part}&maxResults=${maxResults}&fields=${fields}`
        const res = await fetch(url) 
        const data = await res.json()

        let items = data.items.map((item: any) => item.snippet.title)
        let nextPage = data.nextPageToken

        while(nextPage != null){
            const newUrl = `${url}&pageToken=${nextPage}`
            const newRes = await fetch(newUrl) 
            const newData = await newRes.json()
            nextPage = newData.nextPageToken
            items = [...items, ...newData.items.map((item: any) => item.snippet.title)]
        }
        return {list: items}
    }
}