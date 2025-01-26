"use client";
import FCFS from "@/components/FCFS";
import SJF from "@/components/SJF";
import { generateRandomProcesses } from "@/utils/functions";
import { ProcessInterface } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";

export default function Home() {
  // const DummyInputProcesses: ProcessInterface[] = [
  //   { pid: "P1", arrivalTime: 0, burstTime: 6 },
  //   { pid: "P2", arrivalTime: 1, burstTime: 8 },
  //   { pid: "P3", arrivalTime: 2, burstTime: 3 },
  //   { pid: "P4", arrivalTime: 3, burstTime: 5 },
  //   { pid: "P5", arrivalTime: 4, burstTime: 2 },
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
      <div className="grid grid-cols-[repeat(13,1fr)] h-dvh overflow-hidden">
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
                  <>
                    <h2 className="text-2xl text-[var(--aj-dark)] font-semibold">
                      Process Table:
                    </h2>
                    <div className="flex justify-between border-b-2 border-dashed border-[var(--aj-dark)] bg-[var(--aj-gray-dark)] text-[var(--aj-dark)] px-2">
                      <span className="font-semibold">PID</span>
                      <span className="font-semibold">Arrival Time</span>
                      <span className="font-semibold">Brust Time</span>
                    </div>
                  </>
                  {React.Children.toArray(
                    Process.map((process, index) => (
                      <div
                        className={`flex justify-between ${
                          index % 2 === 0
                            ? "bg-[var(--aj-gray-light)]"
                            : "bg-[var(--aj-secondary)]"
                        } px-2`}
                      >
                        <span>{process.pid}</span>
                        <span>{process.arrivalTime}</span>
                        <span>{process.burstTime}</span>
                      </div>
                    ))
                  )}
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
