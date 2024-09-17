import { AtonStatistics, AtonType, Msg21, Msg6 } from "../declarations/types/types";

type Aton = {
  name: string
  region: string
  mmsi: number
  type: AtonType
}



export type AtonSummaryItem = {
  LDR_OKNG: number;
  cnt_msg21: number;
  cnt_msg6: number;
  health_OKNG: number;
  last_BattAton: number;
  last_BattLant: number;
  last_LDR: number;
  last_Temp: number;
  last_health: number;
  last_light: number;
  last_racon: number;
  lastseen: string;
  latitude: number;
  longitude: number;
  lcl_ts: string;
  mmsi: number;
  name: string;
  off_pos_OKNG: number;
  opt21_percent: number;
  opt6_percent: number;
  racon_OKNG: number;
  region: string;
  ts: string;
  ts_iso: string;
  type: string;
};

export async function fetchAtonList() {
  try {
    const res = await fetch(`http://10.10.20.200:8020/aton/cloud/lists`);
    // const res = await fetch(`http://localhost:3000/aton/cloud/lists/${type}`);
    // const res = await fetch(`http://localhost:3000/atonForMap`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const atonList = await res.json() as Aton[]
    return atonList;
  } catch (error) {
    console.error('Failed to fetch aton list:', error);
  }
}

export async function fetchAton(mmsi: number) {
  try {
    const res = await fetch(`http://10.10.20.200:8020/aton/${mmsi}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const aton = await res.json() as Aton
    return aton;
  } catch (error) {
    console.error('Failed to fetch aton:', error);
  }
}

export async function fetchMessage21(mmsi: number) {
  try {
    const res = await fetch(`http://10.10.20.200:8020/aton/msg21/${mmsi}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const message21 = await res.json() as Msg21[];
    return message21;
  } catch (error) {
    console.error('Failed to fetch message21:', error);
  }
}

export async function fetchMessage6(mmsi: number) {
  try {
    const res = await fetch(`http://10.10.20.200:8020/aton/msg6/${mmsi}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const message6 = await res.json() as Msg6[];
    return message6;
  } catch (error) {
    console.error('Failed to fetch message6:', error);
  }
}

export async function fetchAtonStats() {
  try {
    const res = await fetch('http://localhost:3000/report-stats')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const stats = await res.json() as AtonStatistics[]
    return stats
  } catch (error) {
    console.error('Failed to fetch')
  }
}

export const fetchAtonCloudList = async () => {
  try {
    const response = await fetch('http://10.10.20.200:8020/aton/cloud/lists');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching AtoN cloud list:', error);
    throw error;
  }
};

export async function fetchAtonSummary(): Promise<AtonSummaryItem[]> {
  try {
    const res = await fetch('http://10.10.20.200:8020/aton/cloud/lists');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const atonSummary = await res.json() as AtonSummaryItem[];
    return atonSummary;
  } catch (error) {
    console.error('Failed to fetch AtoN summary:', error);
    throw error;
  }
}