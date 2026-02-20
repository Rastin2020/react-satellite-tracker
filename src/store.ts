import { create } from 'zustand';

interface ISSState {
  lat: number;
  long: number;
  alt: number;
  vel: number;
  setISSData: (data: { lat: number; long: number; alt: number; vel: number }) => void;
}

export const useStore = create<ISSState>((set) => ({
  lat: 0,
  long: 0,
  alt: 0,
  vel: 0,
  setISSData: (data) => set({ ...data }),
}));