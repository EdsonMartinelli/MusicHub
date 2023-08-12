import MainPage from "@/client/components/MainPage/MainPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Hub",
  description: "A simples site with my favorites songs",
  icons: {
    icon: ["/icon.png"],
    apple: ["/icon.png"],
    shortcut: ["/icon.png"],
  },
};

export default function Home() {
  return <MainPage />;
}
