  import { create } from "zustand";
  import { AtonStoreState } from "../declarations/types/store-types";


  export const useAtonStore = create<AtonStoreState>((set) => ({
    viewState: {
      longitude: 101.5466,
      latitude: 3.0891,
      zoom: 13,
      pitch: 0,
      bearing: 0,
    },
    atonData: [],
    setAtonData: (atonData) => set({ atonData }),
    toggles: {
      radialMenu: false,
      hoverInfo: false,
      legend: false,
      legendToggleBtn: true,
      atonInfo: false,
      atonSummaryToggleBtn: true,
      atonSummaryPanel: false,
      atonMessageCountOverview: false,
      graph: false,
      tableModule: false,
      tableOptions: false,
      tableToggelBtn: true,
    },
    setToggles: (toggles) => set({ toggles }),
    filterState: {
      selectedStructures: ['All'],
      selectedRegions: ['All'],
      condition: 'All',
    },
    setFilterState: (filterState) => set({ filterState }),
  }));