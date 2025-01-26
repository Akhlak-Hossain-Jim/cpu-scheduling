"use client";
import FCFS from "@/components/FCFS";
import SJF from "@/components/SJF";
import { generateRandomProcesses } from "@/utils/functions";
import { ProcessInterface } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";

export default function Home() {
  // const FCFSTheory: ProcessInterface[] = [
  //   { pid: "P1", arrivalTime: 4, burstTime: 7 },
  //   { pid: "P2", arrivalTime: 3, burstTime: 10 },
  //   { pid: "P3", arrivalTime: 0, burstTime: 15 },
  //   { pid: "P4", arrivalTime: 10, burstTime: 3 },
  // ];

  // const SJFTheory: ProcessInterface[] = [
  //   { pid: "P1", arrivalTime: 5, burstTime: 7 },
  //   { pid: "P2", arrivalTime: 1, burstTime: 5 },
  //   { pid: "P3", arrivalTime: 3, burstTime: 12 },
  //   { pid: "P4", arrivalTime: 7, burstTime: 10 },
  //   { pid: "P5", arrivalTime: 6, burstTime: 9 },
  //   { pid: "P6", arrivalTime: 10, burstTime: 15 },
  // ];

  const [Process, setProcess] = useState<ProcessInterface[]>([]);

  const [pid, setPid] = useState("");
  const [arrivalTime, setArrivalTime] = useState(0);
  const [BurstTime, setBurstTime] = useState("");

  useEffect(() => {
    if (Process.length > 0)
      setInterval(() => {
        setArrivalTime((prev) => prev + 1);
      }, 5000);
  }, [Process.length]);

  return (
    <main className="w-[min(1440px,100%)] mx-auto my-0 text-black">
      <div className="grid grid-cols-[repeat(13,1fr)] h-dvh overflow-hidden print:flex print:flex-col print:gap-4">
        <div className="col-span-5 bg-[var(--aj-dark)]">
          <SJF DATA={Process} />
        </div>
        <div className="col-span-5 bg-[var(--aj-dark)]">
          <div className="h-full w-full rounded-s-2xl bg-[var(--aj-gray-dark)]">
            <FCFS DATA={Process} />
          </div>
        </div>
        <div className="col-span-3 bg-[var(--aj-gray-dark)]">
          <div className="h-full w-full rounded-s-2xl bg-[var(--aj-light)] p-4">
            {Process.length > 0 && (
              <>
                <div className="table w-full">
                  <h2 className="text-2xl text-[var(--aj-dark)] font-semibold">
                    Process Table:
                  </h2>
                  <div className="grid grid-cols-5">
                    <span className="col-span-1 font-semibold border-b-2 border-dashed border-[var(--aj-dark)] bg-[var(--aj-gray-dark)] text-[var(--aj-dark)] px-2">
                      PID
                    </span>
                    <span className="col-span-2 text-center font-semibold border-b-2 border-dashed border-[var(--aj-dark)] bg-[var(--aj-gray-dark)] text-[var(--aj-dark)] px-2">
                      Arrival Time
                    </span>
                    <span className="col-span-2 text-center font-semibold border-b-2 border-dashed border-[var(--aj-dark)] bg-[var(--aj-gray-dark)] text-[var(--aj-dark)] px-2">
                      Brust Time
                    </span>
                    {React.Children.toArray(
                      Process.map((process, index) => (
                        <>
                          <span
                            className={`col-span-1 ${
                              index % 2 === 0
                                ? "bg-[var(--aj-gray-light)]"
                                : "bg-[var(--aj-secondary)]"
                            } px-2`}
                          >
                            {process.pid}
                          </span>
                          <span
                            className={`col-span-2 text-center ${
                              index % 2 === 0
                                ? "bg-[var(--aj-gray-light)]"
                                : "bg-[var(--aj-secondary)]"
                            } px-2`}
                          >
                            {process.arrivalTime}
                          </span>
                          <span
                            className={`col-span-2 text-center ${
                              index % 2 === 0
                                ? "bg-[var(--aj-gray-light)]"
                                : "bg-[var(--aj-secondary)]"
                            } px-2`}
                          >
                            {process.burstTime}
                          </span>
                        </>
                      ))
                    )}
                  </div>
                </div>
                <div className="border-t-2 border-dashed border-[var(--aj-dark)] mb-4"></div>
              </>
            )}

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setProcess([
                  ...Process,
                  {
                    pid: `P${pid}`,
                    arrivalTime: arrivalTime,
                    burstTime: parseInt(BurstTime),
                  },
                ]);
                setPid("");
                setBurstTime("");
              }}
            >
              <h2 className="text-2xl text-[var(--aj-dark)] font-semibold m-0">
                Add Process:
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="PID">Process ID:</label>
                  <input
                    className="border-2 border-[var(--aj-dark)] rounded-lg px-2 py-1"
                    type="number"
                    name="PID"
                    id="PID"
                    required
                    placeholder="1"
                    value={pid}
                    onChange={(e) => setPid(e.target.value)}
                  />
                </div>
                {/* <div className="flex flex-col gap-1"><label htmlFor=""></label><input
            className="border-2 border-gray-500" type="number" name="PID" id="PID" /></div> */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="BT">Brust Time:</label>
                  <input
                    className="border-2 border-[var(--aj-dark)] rounded-lg px-2 py-1"
                    type="number"
                    name="BT"
                    id="BT"
                    required
                    placeholder="1"
                    value={BurstTime}
                    onChange={(e) => setBurstTime(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="bg-[var(--aj-dark)] text-[var(--aj-light)] rounded-lg px-4 py-2"
                type="submit"
              >
                Add
              </button>
            </form>
            <button
              className="bg-[var(--aj-dark)] text-[var(--aj-light)] rounded-lg px-4 py-2 my-4"
              onClick={() => setProcess(generateRandomProcesses(8, 10, 30))}
            >
              Generate Random Processes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
