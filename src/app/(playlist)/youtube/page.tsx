import ProviderWrapperYoutube from "@/client/components/Providers/ProviderWrapperYoutube";

export default function Teste() {
  const data = [
    {
      id: "vO-6OWBUxxo",
      name: "Nanowar of Steel - Disco Metal",
      createdTime: "Feb, 2023",
    },
    {
      id: "GiT7fhfTrPQ",
      name: "Deadmau5 - Strobe (Radio Edit)",
      createdTime: "Fev, 2017",
    },
    {
      id: "O5Hn0df4sda",
      name: "Teste - Teste",
      createdTime: "Jul, 2023",
    },
    {
      id: "7QU1nvuxaMA",
      name: "Audioslave - Like a Stone",
      createdTime: "Out, 2009",
    },
  ];

  return (
    <>
      <ProviderWrapperYoutube playlist={data} />
    </>
  );
}
