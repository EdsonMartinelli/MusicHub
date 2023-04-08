export default function DriveListItem({ name }: { name: string }) {
  const artist = name.split(" - ")[0];
  const song = name.split(" - ")[1];
  return <div className="w-full h-10 ">{artist}</div>;
}
