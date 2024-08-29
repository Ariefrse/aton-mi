import { create } from "zustand";
import { AtonDetailedData, AtonInitialData } from "../declarations/types/types";

/** Popups/modals/nav tools to toggle on/off */
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

type TableFilterOptions = {
  fromDate: string
  toDate: string;
};

type AtonStoreState = {
  atonInitialData: AtonInitialData[] | null;
  atonDetailedData: AtonDetailedData[] | null;

  toggles: Toggles;
  tableOptions: TableFilterOptions;

  setAtonInitialData: (data: AtonInitialData[]) => void;
  setAtonDetailedData: (data: AtonDetailedData[]) => void;
  setToggles: (modal: Toggles) => void;
  setTableOptions: (options: TableFilterOptions) => void;
};

export const useAtonStore = create<AtonStoreState>((set) => ({
  atonInitialData: [],
  atonDetailedData: [],
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

  setAtonInitialData: (data) => set({ atonInitialData: data }),
  setAtonDetailedData: (data) => set({ atonDetailedData: data }),
  setToggles: (toggles) => set({ toggles }),
  setTableOptions: (options) => set({ tableOptions: options }),
}));
