import React, { useEffect } from "react";
import {
  ProcessCalculationInterface,
  ProcessInterface,
} from "@/utils/interfaces";

export default function SJF({ DATA }: { DATA: ProcessInterface[] }) {
  const [TABLE, setTABLE] = React.useState<ProcessCalculationInterface[]>([]);

  useEffect(() => {
    if (DATA.length > 0) {
      const cp = JSON.parse(JSON.stringify(DATA));
      const temp: ProcessCalculationInterface[] = [];
      let currentTime = 0;
      cp.sort(
        (a: ProcessInterface, b: ProcessInterface) => a.burstTime - b.burstTime
      );
      cp.forEach((process: ProcessCalculationInterface) => {
        const waitingTime =
          currentTime - process.arrivalTime > 0
            ? currentTime - process.arrivalTime
            : 0;
        const completionTime = currentTime + process.burstTime;
        const turnAroundTime = completionTime - process.arrivalTime;
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
    <section className="p-4 w-full">
      <h2 className="text-2xl text-[var(--aj-light)] font-semibold pb-2">
        Shortest Job First:
      </h2>
      <div className="grid grid-cols-[repeat(13,1fr)] w-full">
        {DATA.length > 0 && (
          <>
            <div className="tbh col-span-1 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              PID
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              AT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              BT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              WT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              CT
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              TAT
            </div>
            <div className="tbh col-span-2 border-x border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              RT
            </div>
          </>
        )}
        {TABLE &&
          TABLE.length > 0 &&
          React.Children.toArray(
            TABLE.sort((a, b) => Number(a.pid[1]) - Number(b.pid[1])).map(
              (process, index) => (
                <>
                  <div
                    className={`tbd col-span-1 border-s border-b border-[var(--aj-gray-dark)] px-2 py-1 ${
                      index % 2 === 0
                        ? "bg-[var(--aj-gray-light)]"
                        : "bg-[var(--aj-secondary)]"
                    } ${index === 0 ? "border-t-2" : ""}`}
                  >
                    {process.pid}
                  </div>
                  <div
                    className={`tbd col-span-2 border-s border-b border-[var(--aj-gray-dark)] px-2 py-1 ${
                      index % 2 === 0
                        ? "bg-[var(--aj-gray-light)]"
                        : "bg-[var(--aj-secondary)]"
                    } ${index === 0 ? "border-t-2" : ""}`}
                  >
                    {process.arrivalTime}
                  </div>
                  <div
                    className={`tbd col-span-2 border-s border-b border-[var(--aj-gray-dark)] px-2 py-1 ${
                      index % 2 === 0
                        ? "bg-[var(--aj-gray-light)]"
                        : "bg-[var(--aj-secondary)]"
                    } ${index === 0 ? "border-t-2" : ""}`}
                  >
                    {process.burstTime}
                  </div>
                  <div
                    className={`tbd col-span-2 border-s border-b border-[var(--aj-gray-dark)] px-2 py-1 ${
                      index % 2 === 0
                        ? "bg-[var(--aj-gray-light)]"
                        : "bg-[var(--aj-secondary)]"
                    } ${index === 0 ? "border-t-2" : ""}`}
                  >
                    {process.waitingTime}
                  </div>
                  <div
                    className={`tbd col-span-2 border-s border-b border-[var(--aj-gray-dark)] px-2 py-1 ${
                      index % 2 === 0
                        ? "bg-[var(--aj-gray-light)]"
                        : "bg-[var(--aj-secondary)]"
                    } ${index === 0 ? "border-t-2" : ""}`}
                  >
                    {process.completionTime}
                  </div>
                  <div
                    className={`tbd col-span-2 border-s border-b border-[var(--aj-gray-dark)] px-2 py-1 ${
                      index % 2 === 0
                        ? "bg-[var(--aj-gray-light)]"
                        : "bg-[var(--aj-secondary)]"
                    } ${index === 0 ? "border-t-2" : ""}`}
                  >
                    {process.turnAroundTime}
                  </div>
                  <div
                    className={`tbd col-span-2 border-x border-b border-[var(--aj-gray-dark)] px-2 py-1 ${
                      index % 2 === 0
                        ? "bg-[var(--aj-gray-light)]"
                        : "bg-[var(--aj-secondary)]"
                    } ${index === 0 ? "border-t-2" : ""}`}
                  >
                    {process.responseTime}
                  </div>
                </>
              )
            )
          )}
        {DATA.length > 0 && (
          <>
            <div className="tbh col-span-5 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              Avg.
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              {TABLE.reduce((acc, curr) => acc + curr.waitingTime, 0) /
                TABLE.length}
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              {TABLE.reduce((acc, curr) => acc + curr.completionTime, 0) /
                TABLE.length}
            </div>
            <div className="tbh col-span-2 border-s border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              {TABLE.reduce((acc, curr) => acc + curr.turnAroundTime, 0) /
                TABLE.length}
            </div>
            <div className="tbh col-span-2 border-x border-t border-[var(--aj-gray-dark)] px-2 py-1 bg-[var(--aj-light)]">
              {TABLE.reduce((acc, curr) => acc + curr.responseTime, 0) /
                TABLE.length}
            </div>
          </>
        )}
      </div>

      <h2 className="text-2xl font-semibold pb-2 mt-3 text-[var(--aj-light)]">
        Gantt Chart:
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] w-full">
        {TABLE &&
          TABLE.length > 0 &&
          React.Children.toArray(
            TABLE.sort((a, b) => a.startTime - b.startTime).map(
              (process, index) => (
                <div
                  className={`tbh col-span-1 border border-[var(--aj-dark)] px-2 py-1 relative mb-5 ${
                    index % 2 === 0
                      ? "bg-[var(--aj-gray-light)]"
                      : "bg-[var(--aj-secondary)]"
                  } ${index > 0 ? "border-l-0" : ""}`}
                >
                  {process.pid}
                  {index === 0 && (
                    <div className="absolute top-full left-0 -translate-x-1/2 w-1 h-full text-[var(--aj-light)]">
                      {process.startTime}
                    </div>
                  )}
                  <div className="absolute top-full right-0 -translate-x-1/2 w-1 h-full text-[var(--aj-light)]">
                    {process.completionTime}
                  </div>
                </div>
              )
            )
          )}
      </div>
    </section>
  );
}
