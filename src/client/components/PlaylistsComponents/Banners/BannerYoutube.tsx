import { YoutubeLogo } from "@phosphor-icons/react";
import { BannerUI } from "./UI/BannerUI";

export function BannerYoutube() {
  return (
    <BannerUI type="Playlist" name="Youtube" info="Information about Youtube">
      <YoutubeLogo size="100%" weight="fill" />
    </BannerUI>
  );
}
