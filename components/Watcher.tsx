import { useEffect, useState, useRef } from "react";
import { Timer2 } from "@/utils/Timer";
import type { MutableRefObject } from "react";

export default function Watcher() {
  const convertToTime = (numSeconds: number) => {
    const date = new Date(numSeconds * 1000);
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const listTimes = [
    { id: 25, label: "25 minutos", value: 1500 },
    { id: 15, label: "15 minutos", value: 900 },
    { id: 5, label: "5 minutos", value: 300 },
  ];
  const [totalSeconds, setTotalSeconds] = useState(1500);
  const [time, setTime] = useState(convertToTime(totalSeconds));
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");

  const timer: MutableRefObject<Timer2 | undefined> = useRef();

  useEffect(() => {
    timer.current = new Timer2(totalSeconds, setTime);
  }, [totalSeconds]);

  const start = () => {
    if (timer.current) {
      setStatus("running");
      timer.current.start();
    }
  };

  const stop = () => {
    if (timer.current) {
      setStatus("paused");
      timer.current.stop();
    }
  };

  const reset = () => {
    if (timer.current) {
      setStatus("idle");
      timer.current.reset();
    }
  };

  const IconPlay = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  );

  const IconPause = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
        clipRule="evenodd"
      />
    </svg>
  );

  const IconReset = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex justify-center items-center my-16">
        {listTimes.map((item, index) => (
          <button
            key={item.id}
            className={`px-8 py-3 font-bold ${
              totalSeconds === item.value
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            } ${index === 0 && "rounded-l-lg"} ${
              index === listTimes.length - 1 && "rounded-r-lg"
            }            "}`}
            onClick={() => {
              setTotalSeconds(item.value);
              setTime(convertToTime(item.value));
              setStatus("idle");
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <h1 className="text-3xl font-bold">{time}</h1>
      <div className="my-16 flex">
        {status !== "running" && (
          <button
            className="px-8 py-3 bg-teal-400 rounded-md font-bold flex"
            onClick={start}
          >
            {IconPlay}
            <span className="ml-2">
              {status === "idle" ? "Iniciar" : "Continuar"}
            </span>
          </button>
        )}
        {status === "running" && (
          <button
            className="px-8 py-3 bg-yellow-400 rounded-md font-bold flex"
            onClick={stop}
          >
            {IconPause}
            <span className="ml-2">Detener</span>
          </button>
        )}
        {status !== "idle" && (
          <button
            className="ml-2 px-3 py-3 bg-orange-400 rounded-md"
            onClick={reset}
          >
            {IconReset}
          </button>
        )}
      </div>
    </div>
  );
}
