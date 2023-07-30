import { YoutubeLogo } from "@phosphor-icons/react";
import { BannerUI } from "./UI/BannerUI";

export function BannerYoutube() {
  return (
    <BannerUI
      type="Playlist"
      name="Youtube"
      by="by Edson Gomes Martinelli"
      info={[
        {
          name: "Playlist 1",
          link: "https://www.youtube.com/playlist?list=PLY3DcCkHnjbGk0irgvqcLKRT2D5TdK_tL",
        },
        {
          name: "Playlist 2",
          link: "https://www.youtube.com/playlist?list=PLY3DcCkHnjbFYnB77TpHJ9KMPHZxyC0xw",
        },
      ]}
    >
      <YoutubeLogo size="100%" weight="fill" />
    </BannerUI>
  );
}
