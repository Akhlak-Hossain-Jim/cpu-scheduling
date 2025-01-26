import React from "react";
import {
  ProcessCalculationInterface,
  ProcessInterface,
} from "@/utils/interfaces";

export default function FCFS({ DATA }: { DATA: ProcessInterface[] }) {
  const [TABLE, setTABLE] = React.useState<ProcessCalculationInterface[]>([]);

  React.useEffect(() => {
    if (DATA.length > 0) {
      const cp = JSON.parse(JSON.stringify(DATA));
      cp.sort(
        (a: ProcessInterface, b: ProcessInterface) =>
          a.arrivalTime - b.arrivalTime
      );
      const temp: ProcessCalculationInterface[] = [];
      let currentTime = 0;
      cp.forEach((process: ProcessInterface) => {
        const waitingTime =
          currentTime - process.arrivalTime > 0
            ? currentTime - process.arrivalTime
            : 0;
        const completionTime = currentTime + process.burstTime;
        const turnAroundTime = completionTime;
        const responseTime = waitingTime;
        const startTime = currentTime;
        currentTime = completionTime;
        temp.push({
          ...process,
          startTime,
          waitingTime,
          completionTime,
          turnAroundTime,
          responseTime,
        });
      });
      setTABLE(temp);
    }
  }, [DATA]);
  return (
    <section className="p-4 w-full text-[var(--aj-dark)]">
      <h2 className="text-2xl font-semibold pb-2">First Come First Serve:</h2>
      <div className="grid grid-cols-[repeat(13,1fr)] w-full">
        {DATA.length > 0 && (
          <>
            <div className="tbh col-span-1 border-s border-t border-[var(--aj-dark)] px-2 py-1">
              PID
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-dark)] px-2 py-1">
              AT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-dark)] px-2 py-1">
              BT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-dark)] px-2 py-1">
              WT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-dark)] px-2 py-1">
              CT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-dark)] px-2 py-1">
              TAT
            </div>
            <div className="tbh col-span-2 border-x border-t border-[var(--aj-dark)] px-2 py-1">
              RT
            </div>
          </>
        )}
        {TABLE &&
          TABLE.length > 0 &&
          React.Children.toArray(
            TABLE.map((process, index) => (
              <>
                <div
                  className={`tbh col-span-1 border-s border-b border-[var(--aj-dark)] px-2 py-1 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index === 0 ? "border-t-2" : ""}`}
                >
                  {process.pid}
                </div>
                <div
                  className={`tbh col-span-2 border-s border-b border-[var(--aj-dark)] px-2 py-1 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index === 0 ? "border-t-2" : ""}`}
                >
                  {process.arrivalTime}
                </div>
                <div
                  className={`tbh col-span-2 border-s border-b border-[var(--aj-dark)] px-2 py-1 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index === 0 ? "border-t-2" : ""}`}
                >
                  {process.burstTime}
                </div>
                <div
                  className={`tbh col-span-2 border-s border-b border-[var(--aj-dark)] px-2 py-1 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index === 0 ? "border-t-2" : ""}`}
                >
                  {process.waitingTime}
                </div>
                <div
                  className={`tbh col-span-2 border-s border-b border-[var(--aj-dark)] px-2 py-1 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index === 0 ? "border-t-2" : ""}`}
                >
                  {process.completionTime}
                </div>
                <div
                  className={`tbh col-span-2 border-s border-b border-[var(--aj-dark)] px-2 py-1 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index === 0 ? "border-t-2" : ""}`}
                >
                  {process.turnAroundTime}
                </div>
                <div
                  className={`tbh col-span-2 border-x border-b border-[var(--aj-dark)] px-2 py-1 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index === 0 ? "border-t-2" : ""}`}
                >
                  {process.responseTime}
                </div>
              </>
            ))
          )}
        {TABLE.length > 0 && (
          <>
            <div className="tbh col-span-5 border-s border-y border-[var(--aj-dark)] px-2 py-1">
              Avg.
            </div>
            <div className="tbh col-span-2 border-s border-y border-[var(--aj-dark)] px-2 py-1">
              {TABLE.reduce((acc, curr) => acc + curr.waitingTime, 0) /
                TABLE.length}
            </div>
            <div className="tbh col-span-2 border-s border-y border-[var(--aj-dark)] px-2 py-1">
              {TABLE.reduce((acc, curr) => acc + curr.completionTime, 0) /
                TABLE.length}
            </div>
            <div className="tbh col-span-2 border-s border-y border-[var(--aj-dark)] px-2 py-1">
              {TABLE.reduce((acc, curr) => acc + curr.turnAroundTime, 0) /
                TABLE.length}
            </div>
            <div className="tbh col-span-2 border-x border-y border-[var(--aj-dark)] px-2 py-1">
              {TABLE.reduce((acc, curr) => acc + curr.responseTime, 0) /
                TABLE.length}
            </div>
          </>
        )}
      </div>
      <h2 className="text-2xl font-semibold pb-2 mt-3">Gantt Chart:</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] w-full">
        {TABLE &&
          TABLE.length > 0 &&
          React.Children.toArray(
            TABLE.map((process, index) => (
              <div
                className={`tbh col-span-1 border border-[var(--aj-dark)] px-2 py-1 relative mb-5 ${
                  index % 2 === 0
                    ? "bg-[var(--aj-gray-light)]"
                    : "bg-[var(--aj-secondary)]"
                } ${index > 0 ? "border-l-0" : ""}`}
              >
                {process.pid}
                {index === 0 && (
                  <div className="absolute top-full left-0 -translate-x-1/2 w-1 h-full text-[var(--aj-dark)]">
                    {process.startTime}
                  </div>
                )}
                <div className="absolute top-full right-0 -translate-x-1/2 w-1 h-full text-[var(--aj-dark)]">
                  {process.completionTime}
                </div>
              </div>
            ))
          )}
      </div>
    </section>
  );
}
