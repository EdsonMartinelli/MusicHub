export async function youtubeSearch() {
  const key = process.env.GOOGLE_KEY;
  const q = "I wanna dance";
  const part = "snippet";
  const maxResults = 10;
  const regionCode = "US";
  const type = "video";
  const videoCategoryId = "10";
  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=${part}&maxResults=${maxResults}&regionCode=${regionCode}&videoCategoryId=${videoCategoryId}&type=${type}&q=${q}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items;
}
