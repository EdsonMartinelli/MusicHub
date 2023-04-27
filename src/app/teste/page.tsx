import ProviderWrapper from "@/client/components/DriveSongList/ProviderWrapper";

export default function Teste() {
  const data = [
    {
      id: "1TZi8nYn9k_Cb1e2VSDxSiB9o6DSTZjXI",
      name: "Eminem - Berzerk.mp3",
    },
    {
      id: "1W3yG1O2TB3dscfQBrFV42e_kgHXhh5AG",
      name: "The Grogory Brother - Bad Intruder Song.mp3",
    },
    {
      id: "1BuoQ27EMwC9CnwsPX_7JZnrCF7Bmk9DS",
      name: "Zebrahead - Survivor.mp3",
    },
    {
      id: "1Wl361Rp8njz9Wdh_42qnBUkLRLp-rNEG",
      name: "Stone Broken - Let Me Go (Official Music Video).mp3",
    },
  ];
  return (
    <>
      <ProviderWrapper playlist={data} />
    </>
  );
}
