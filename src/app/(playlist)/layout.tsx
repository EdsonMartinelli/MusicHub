import Menu from "@/client/components/Menu/Menu";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />

      <div className="lg:pl-64 w-full overflow-hidden">{children}</div>
    </>
  );
}
