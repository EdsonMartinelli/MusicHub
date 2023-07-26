import "./globals.css";
import { Lato } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "MusicHub",
  description: "Personal music app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <body className="bg-zinc-950 flex justify-center">
        <div className="w-screen">{children}</div>
      </body>
    </html>
  );
}
