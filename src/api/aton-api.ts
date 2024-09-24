import { AtonSummaryItemResDto, AtonTableResDto, Msg21ResDto, Msg6ResDto } from "../declarations/dtos/dtos";
import { AtonData, AtonTable, Msg21, Msg6 } from "../declarations/types/types";
import { transformAtonPanelData, transformAtonTableData, transformMsg21, transformMsg6 } from "./api-adapter";


// TODO: Unused
// export async function fetchAtonList(): Promise<AtonListResDto[]> {
//   try {
//     const res = await fetch(`http://10.10.20.200:8020/aton/cloud/lists`);
//     // const res = await fetch(`http://localhost:3000/aton/cloud/lists/${type}`);
//     // const res = await fetch(`http://localhost:3000/atonForMap`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     return await res.json()
//   } catch (error) {
//     console.error('Failed to fetch aton list:', error);
//     throw error
//   }
// }

// TODO: Unused
// export async function fetchAton(mmsi: number) {
//   try {
//     const res = await fetch(`http://10.10.20.200:8020/aton/${mmsi}`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     const aton = await res.json() as Aton
//     return aton;
//   } catch (error) {
//     console.error('Failed to fetch aton:', error);
//   }
// }

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

// TODO: Unused
// export const fetchAtonCloudList = async () => {
//   try {
//     const res = await fetch('http://10.10.20.200:8020/aton/cloud/lists');
//     if (!res.ok) throw new Error('Network response was not ok');
//     return await res.json();
//   } catch (error) {
//     console.error('Error fetching AtoN cloud list:', error);
//     throw error;
//   }
// };

export async function fetchAtonData(): Promise<AtonData[]> {
  try {
    const res = await fetch('http://10.10.20.200:8020/aton/cloud/lists');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: AtonSummaryItemResDto[] = await res.json()
    return data.map(transformAtonPanelData)
  } catch (error) {
    console.error('Failed to fetch AtoN summary:', error);
    throw error;
  }
}