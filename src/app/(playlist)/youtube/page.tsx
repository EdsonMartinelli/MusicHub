import ProviderWrapperYoutube from "@/client/components/Providers/ProviderWrapperYoutube";

export default function Teste() {
  const data = [
    {
      id: "vO-6OWBUxxo",
      title: "Disco Metal",
      author: "Nanowar of Steel",
      createdAt: "Feb, 2023",
    },
    {
      id: "GiT7fhfTrPQ",
      title: "Strobe (Radio Edit)",
      author: "Deadmau5",
      createdAt: "Fev, 2017",
    },
    {
      id: "O5Hn0df4sda",
      title: "Teste",
      author: "Teste",
      createdAt: "Jul, 2023",
    },
    {
      id: "7QU1nvuxaMA",
      title: "Like a Stone",
      author: "Audioslave",
      createdAt: "Out, 2009",
    },
  ];

  return (
    <>
      <ProviderWrapperYoutube playlist={data} />
    </>
  );
}
