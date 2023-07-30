import { GoogleDriveLogo } from "@phosphor-icons/react";
import { BannerUI } from "./UI/BannerUI";

export function BannerDrive() {
  return (
    <BannerUI
      type="Playlist"
      name="Google Drive"
      by="by Edson Gomes Martinelli"
      info={[
        {
          name: "Playlist 1",
          link: "https://drive.google.com/drive/u/0/folders/196avRwiYuQuEILLXn1Oi_xaYYQnS252S",
        },
        {
          name: "Playlist 2",
          link: "https://drive.google.com/drive/u/0/folders/17QnutWbjP0y9PnXqUCtj9yLOA2zSYI9U",
        },
      ]}
    >
      <GoogleDriveLogo size="100%" weight="fill" />
    </BannerUI>
  );
}
