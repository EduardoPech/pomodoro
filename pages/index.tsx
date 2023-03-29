import Head from "next/head";
import Watcher from "@/components/Watcher";

export default function Home() {
  const IconDark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <>
      <Head>
        <title>Pomodoro</title>
        <meta name="description" content="Pomodoro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-center justify-around py-5">
          <h1 className="font-3xl font-bold">Pomodoro</h1>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded-full"
              onClick={() => console.log("click")}
            >
              {IconDark}
            </button>
          </div>
        </div>
        <Watcher />
      </main>
    </>
  );
}
