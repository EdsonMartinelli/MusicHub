import Menu from "@/client/components/AudioPlayer/Menu/Menu";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      <div className="ml-72">{children}</div>
    </>
  );
}
