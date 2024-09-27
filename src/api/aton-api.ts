import { AtonSummaryResDto, AtonTableResDto, Msg21ResDto, Msg6ResDto } from "../declarations/dtos/dtos";
import { AtonData, AtonTable, Msg21, Msg6 } from "../declarations/types/types";
import { transformAtonPanelData, transformAtonTableData, transformMsg21, transformMsg6 } from "./api-adapter";

export async function fetchMsg21(mmsi: number): Promise<Msg21[]> {
  try {
    const res = await fetch(`http://10.10.20.200:8020/aton/msg21/${mmsi}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: Msg21ResDto[] = await res.json()
    return data.map(transformMsg21);
  } catch (error) {
    console.error('Failed to fetch message21:', error);
    throw error
  }
}

export async function fetchMsg6(mmsi: number): Promise<Msg6[]> {
  try {
    const res = await fetch(`http://10.10.20.200:8020/aton/msg6/${mmsi}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: Msg6ResDto[] = await res.json()
    return data.map(transformMsg6)
  } catch (error) {
    console.error('Failed to fetch message6:', error);
    throw error;
  }
}

export async function fetchAtonTableData(): Promise<AtonTable[]> {
  try {
    const res = await fetch('http://localhost:3000/report-stats')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: AtonTableResDto[] = await res.json()
    return data.map(transformAtonTableData)
  } catch (error) {
    console.error('Failed to fetch')
    throw error
  }
}

export async function fetchAtonData(selectedDate: string): Promise<AtonData[]> {
  try {
    const res = await fetch(`http://10.10.20.200:8020/aton/cloud/lists/select/${selectedDate}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: AtonSummaryResDto[] = await res.json()
    return data.map(transformAtonPanelData)
  } catch (error) {
    console.error('Failed to fetch AtoN summary:', error);
    throw error;
  }
}