export default function PlayListHeader() {
  return (
    <div
      className="w-full text-zinc-200/70 p-3 px-4 flex flex-row 
            items-center justify-between text-sm border-b-[1px] border-zinc-700/50 
            mb-4 font-medium"
    >
      <div className="w-1/2 flex flex-row gap-4 items-center justify-star">
        <p className="hidden lg:block w-7 text-center shrink-0">#</p>
        <p>Title</p>
      </div>
      <p>Created At</p>
    </div>
  );
}
