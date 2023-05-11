import TesteComp from "@/client/components/Teste/TesteComp";
import Script from "next/script";

export default function Teste() {
  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" />
      <TesteComp />
    </>
  );
}
