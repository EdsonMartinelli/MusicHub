import AudioPlayer from "@/client/components/AudioPlayer/AudioPlayer";
import DriveListItem from "@/client/components/DriveListItem";

import { driveFindFilesFactory } from "@/server/drive/factories/DriveFindFilesFactory";

export default function Home() {
  /* const files = await driveFindFilesFactory().handle();
  return (
    <>
      {files.list.map((file) => {
        return <div key={file.id}>{file.name}</div>;
      })}
      <AudioPlayer />
    </>
  );*/
  //return <DriveListItem name="Eminem - Berserk" />;
  return <AudioPlayer />;
}

//https://www.behance.net/gallery/163951635/NFT-Landing-Page-Design?tracking_source=search_projects%7Cwebiste+ux
