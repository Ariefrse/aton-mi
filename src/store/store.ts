import { create } from "zustand";
import {
  AllAtonResDto,
  AtonInitialCountResDto,
  AtonMsgCountResDto,
  AtonStatsResDto,
  AtonType,
} from "../declarations/dtos/dtos";

type Toggles = {
  legend: boolean;
  legendToggleBtn: boolean;
  atonSummaryToggleBtn: boolean;
  atonSummary: boolean;
  tableModule: boolean;
  tableOptions: boolean;
  tableToggelBtn: boolean;
  messageCountOverview: boolean;
};

type TableOptions = {
  fromDate: string
  toDate: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

type AtonStoreState = {
  atonMsgCount: AtonMsgCountResDto | null;
  atonStats: AtonStatsResDto[] | null;
  allAton: AllAtonResDto[] | null;
  atonInitialCount: AtonInitialCountResDto | null;
  selectedAtonType: AtonType | null;

  toggles: Toggles;
  tableOptions: TableOptions;

  setAtonMsgCount: (data: AtonMsgCountResDto) => void;
  setAtonStatsData: (data: AtonStatsResDto[]) => void;
  setAllAtonData: (data: AllAtonResDto[]) => void;
  setAtonInitialCount: (data: AtonInitialCountResDto) => void;
  setSelectedAton: (selectedAton: AtonType) => void;
  setToggles: (modal: Toggles) => void;
  setTableOptions: (options: TableOptions) => void;
};

export const useAtonStore = create<AtonStoreState>((set) => ({
  atonMsgCount: null,
  atonStats: [],
  allAton: null,
  atonInitialCount: null,
  selectedAtonType: null,
  toggles: {
    legend: false,
    legendToggleBtn: true,
    atonSummaryToggleBtn: true,
    atonSummary: false,
    tableModule: false,
    tableOptions: false,
    tableToggelBtn: true,
    messageCountOverview: false,
  },
  tableOptions: {
    fromDate: '',
    toDate: '',
    sortBy: "timestamp",
    sortOrder: "asc",
  },

  setAtonMsgCount: (data) => set({ atonMsgCount: data }),
  setAtonStatsData: (data) => set({ atonStats: data }),
  setAllAtonData: (data) => set({ allAton: data }),
  setAtonInitialCount: (data) => set({ atonInitialCount: data }),
  setSelectedAton: (selectedAton) => set({ selectedAtonType: selectedAton }),
  setToggles: (toggles) => set({ toggles }),
  setTableOptions: (options) => set({ tableOptions: options }),
}));
