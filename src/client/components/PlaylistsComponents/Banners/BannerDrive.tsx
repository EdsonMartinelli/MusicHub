import { GoogleDriveLogo } from "@phosphor-icons/react";
import { BannerUI } from "./UI/BannerUI";

export function BannerDrive() {
  return (
    <BannerUI
      type="Playlist"
      name="Google Drive"
      info="Information about Google Drive"
    >
      <GoogleDriveLogo size="100%" weight="fill" />
    </BannerUI>
  );
}
