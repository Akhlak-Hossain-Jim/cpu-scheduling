export interface ProcessInterface {
  pid: string;
  arrivalTime: number;
  burstTime: number;
}

export interface ProcessCalculationInterface {
  pid: string;
  arrivalTime: number;
  startTime: number;
  burstTime: number;
  waitingTime: number;
  completionTime: number;
  turnAroundTime: number;
  responseTime: number;
}
