import ErrorPage from "@/client/components/ErrorPage/ErrorPage";
import ProviderWrapperDrive from "@/client/components/Providers/ProviderWrapperDrive";
import { driveFindFiles } from "@/server/drive/driveFindFiles";
import { SongInfo, handledResponse } from "@/types";

export default async function Drive() {
  const data = [
    {
      id: "1TZi8nYn9k_Cb1e2VSDxSiB9o6DSTZjXI",
      title: "Berzerk",
      author: "Eminem",
      createdAt: "Jan, 2022",
    },
    {
      id: "1W3yG1O2TB3dscfQBrFV42e_kgHXhh5AG",
      title: "Bad Intruder Song",
      author: "The Grogory Brother",
      createdAt: "Jan, 2022",
    },
    {
      id: "1BuoQ27EMwC9CnwsPX_7JZnrCF7Bmk9DS",
      title: "Survivor",
      author: "Zebrahead",
      createdAt: "Jan, 2022",
    },
    {
      id: "sdfsadfsdfasdfsdfsdfsdf",
      title: "Teste",
      author: "Teste",
      createdAt: "Jan, 2022",
    },
    {
      id: "1Wl361Rp8njz9Wdh_42qnBUkLRLp-rNEG",
      title: "Let Me Go (Official Music Video)",
      author: "Stone Broken",
      createdAt: "Jan, 2022",
    },
  ];

  const infoFolders = {
    list: data,
  };

  /*const folderId1 = "196avRwiYuQuEILLXn1Oi_xaYYQnS252S";
  const folderId2 = "17QnutWbjP0y9PnXqUCtj9yLOA2zSYI9U";

  const filesFolder1 = await driveFindFiles(folderId1);
  const filesFolder2 = await driveFindFiles(folderId2);

  if (!(filesFolder1.error == null) || !(filesFolder2.error == null)) {
    return <div className="text-white"> Error </div>;
  }

  const data = [
    ...filesFolder1.list,
    ...filesFolder2.list,
  ] satisfies SongInfo[];*/

  /*const foldersId = [
    "196avRwiYuQuEILLXn1Oi_xaYYQnS252S",
    "17QnutWbjP0y9PnXqUCtj9yLOA2zSYI9U",
  ];






  
  const promisedPlaylists = foldersId.map((folderId) =>
    driveFindFiles(folderId)
  );
  const responsedFolders = await Promise.all(promisedPlaylists);

  const infoFolders = responsedFolders.reduce((acc, folder) => {
    if (!(acc.error == null)) return { list: [], error: acc.error };
    if (!(folder.error == null)) return { list: [], error: folder.error };
    return {
      list: [...acc.list, ...folder.list],
    };
  }, {} as handledResponse);

  if (!(infoFolders.error == null))
    return <ErrorPage />; */

  return (
    <>
      <ProviderWrapperDrive playlist={infoFolders.list} />
    </>
  );
}
