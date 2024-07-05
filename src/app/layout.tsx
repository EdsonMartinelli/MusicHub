import "./globals.css";
import { Lato } from "next/font/google";

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
      <body className="bg-primary-background flex justify-center antialiased">
        <div className="w-screen">{children}</div>
      </body>
    </html>
  );
}
