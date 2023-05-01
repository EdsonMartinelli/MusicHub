import Menu from "@/client/components/Menu/Menu";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      <div className="lg:ml-72">{children}</div>
    </>
  );
}
