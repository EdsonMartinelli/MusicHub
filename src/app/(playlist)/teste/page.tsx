import ProviderWrapperYoutube from "@/client/components/Providers/ProviderWrapperYoutube";
import TesteComp from "@/client/components/Teste/TesteComp";
import Video from "@/client/components/Teste/Video";
import Script from "next/script";

export default function Teste() {
  const data = [
    {
      id: "vO-6OWBUxxo",
      name: "Nanowar of Steel - Disco Metal",
      createdTime: "Feb, 2023",
    },
    {
      id: "wNKmYTmRmG4",
      name: "Leno Brega - Trepada Em Cuiabá",
      createdTime: "Nov, 2019",
    },
  ];

  return (
    <>
      <ProviderWrapperYoutube playlist={data} />
    </>
  );
}
