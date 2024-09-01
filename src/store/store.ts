import { create } from "zustand";
import { AtonData, AtonStatsReportData, AtonStatus, AtonType } from "../declarations/types/types";

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

export type GlobalAtonFilterOptions = {
  structure: AtonType
  condition: AtonStatus | 'All'
  regions: 'North' | 'South' | 'East' | 'West' | 'Borneo'
  atonPropertyToFilter: 'No Message 21' | 'No Message 6' | 'Light Error' | 'Low Batt AtoN' | 'Low Batt Lantern' | 'Bad LDR' | 'Off Position'
}

type TableFilterOptions = {
  fromDate: string
  toDate: string;
};

type AtonStoreState = {
  atonData?: AtonData[]

  toggles: Toggles;
  tableOptions: TableFilterOptions;

  setAtonData: (data: AtonData[]) => void;
  setToggles: (modal: Toggles) => void;
  setTableOptions: (options: TableFilterOptions) => void;
};

export const useAtonStore = create<AtonStoreState>((set) => ({
  atonData: [],
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

  setAtonData: (data) => set({ atonData: data }),
  setToggles: (toggles) => set({ toggles }),
  setTableOptions: (options) => set({ tableOptions: options }),
}));
