# MusicHub ![Nextjs Version](https://img.shields.io/badge/nextjs-v13.2.4-blue?style=flat&color=000000&logo=nextdotjs) ![TailwindCSS Version](https://img.shields.io/badge/tailwind-v5.0.2-blue?style=flat&color=06B6D4&logo=tailwindcss) ![Redux Toolkit Version](https://img.shields.io/badge/redux_toolkit-v1.9.3-blue?style=flat&color=764ABC&logo=redux)


This repository is dedicated to my personal project [MusicHub](https://www.musichubproject.vercel.app), a site where my Youtube and Google Drive playlists are together, allowing a easy search, avoiding duplication, with greater convenience. 

## ⚔️ Objective

MusicHub was born because all playlist managers and music players had problems with my type of user. Some of them doesn't have a good playlist search because of pagination, others don't give you control over the song time (without a controlled slider) and others have an awful player.

Because of that, I created my own playlist manager, allowing me control over some playlists and avoiding duplication of songs in both of them.

## ⚙️ Configuration

If you want run this project offline you will need somethings:

- **A Youtube Data API and Google Drive API key**: You must create a key for both and set it in the environment variable called GOOGLE_KEY;

- **A Spotify Client ID and a Spotify Client Secret**: although the thing has not been implemented, there is already a setup for its implementation, so it is necessary to set the SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your environment;

- **Set production enviroment and the domain origin**: If you are running this in production make sure the NEXT_APP_ENV is set to "production" e change the origin of iframe for your domain. If it is in development environment just ignore that.


## 🚀 Running

After enviroment configuration, run this project with:

```sh
npm run dev
```

## 📷 Snapshots

![Main Page](https://i.imgur.com/Zl84YmU.png)
![Playlist and Player](https://i.imgur.com/itbpTp7.png)
