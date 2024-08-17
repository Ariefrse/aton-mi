import { AllAtonResDto, AtonInitialCountResDto, AtonMsgCountResDto, AtonStatsResDto } from "../declarations/dtos/dtos"
import { create } from "zustand"

type TAtonStoreState = {
  atonMsgCount: AtonMsgCountResDto | null
  atonStats: AtonStatsResDto[] | null
  allAton: AllAtonResDto[] | null
  atonInitialCount: AtonInitialCountResDto | null

  setAtonMsgCount: (data: AtonMsgCountResDto) => void
  setAtonStatsData: (data: AtonStatsResDto[]) => void
  setAllAtonData: (data: AllAtonResDto[]) => void
  setAtonInitialCount: (data: AtonInitialCountResDto) => void
}

export const useAtonStore = create<TAtonStoreState>((set) => ({
  atonMsgCount: null,
  atonStats: [],
  allAton: null,
  atonInitialCount: null,

  setAtonMsgCount: (data) => set({ atonMsgCount: data }),
  setAtonStatsData: (data) => set({ atonStats: data }),
  setAllAtonData: (data) => set({ allAton: data }),
  setAtonInitialCount: (data) => set({ atonInitialCount: data }),
}));