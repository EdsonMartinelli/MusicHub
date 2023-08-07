import ProviderWrapperDrive from "@/client/components/Providers/ProviderWrapperDrive";

export default function Drive() {
  // const files = await driveFindFilesFactory().handle();
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
  return (
    <>
      <ProviderWrapperDrive playlist={data} />
    </>
  );
}
