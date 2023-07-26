import Menu from "@/client/components/Menu/Menu";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      <div className="lg:pl-64 w-full overflow-hidden">
        <div className="w-full px-5 lg:px-10 box-border">{children}</div>
      </div>
    </>
  );
}
