export default function ErrorPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lg:w-96 flex flex-col items-center justify-center">
        <span className=" text-orange-600 font-bold text-2xl lg:text-4xl">
          Something went wrong
        </span>
        <span className="mt-2 w-full text-zinc-200 font-bold text-xl text-center">
          Please, try again later.
        </span>
        <span className="mt-5 text-zinc-400 text-md text-center">
          Music Hub was unable to read the server response. That means the
          server is in maintenance or update. Verify your internet connection
          and tyr again.
        </span>
      </div>
    </div>
  );
}
