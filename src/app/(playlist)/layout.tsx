import Menu from "@/client/components/Menu/Menu";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      <div className="lg:pl-64 w-full overflow-hidden bg-gradient-to-b from-indigo-950/80 from-0% to-[256px]">
        <div className="w-full px-5 lg:px-10 lg:pl-14 box-border lg:pt-10 ">
          {children}
        </div>
      </div>
    </>
  );
}
