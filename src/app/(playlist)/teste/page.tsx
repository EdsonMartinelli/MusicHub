import ProviderWrapperYoutube from "@/client/components/Providers/ProviderWrapperYoutube";
import TesteComp from "@/client/components/Teste/TesteComp";
import Video from "@/client/components/Teste/Video";
import Script from "next/script";

export default function Teste() {
  const data = [
    {
      id: "1aAY7EI3u8c",
      name: "Plenka - Call Me (Slowed)",
      createdTime: "Feb, 2023",
    },
    {
      id: "Isb7Q4jEA04",
      name: "Blue Encount - Polaris",
      createdTime: "Nov, 2019",
    },
  ];

  return (
    <>
      <ProviderWrapperYoutube playlist={data} />
    </>
  );

  return (
    <>
      {/* <Script src="https://www.youtube.com/iframe_api" /> */}
      <Video />
      {/* <TesteDiv /> */}
    </>
  );
}
