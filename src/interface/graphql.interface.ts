export interface IUsage {
  user: number;
  system: number;
}

export interface IHealth {
  service: string;
  mongo: boolean;
  usage: IUsage;
}
