export type Barber = {
  id: string;
  name: string;
  appointments: Appointment[];
  isAvalaible: boolean;
  image: string | null;
};

export type Appointment = {
  id: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};
