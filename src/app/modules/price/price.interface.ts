export type TPrice = {
  hourly: {
    ratePerHour: number;
    policy: string;
  };
  daily: {
    ratePerDay: number;
    policy: string;
  };
  isActive: boolean;
};
