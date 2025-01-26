import { ProcessInterface } from "../interfaces";

export function generateRandomProcesses(
  numberOfProcesses: number,
  maxArrivalTime: number,
  maxBurstTime: number
): ProcessInterface[] {
  const processes: ProcessInterface[] = [];

  for (let i = 0; i < numberOfProcesses; i++) {
    const pid = `P${i + 1}`; // Generate process ID (e.g., "P1", "P2", etc.)
    const arrivalTime = Math.floor(Math.random() * (maxArrivalTime + 1)); // Random arrival time
    const burstTime = Math.floor(Math.random() * maxBurstTime) + 1; // Random burst time (1 to maxBurstTime)

    processes.push({ pid, arrivalTime, burstTime });
  }

  return processes;
}
