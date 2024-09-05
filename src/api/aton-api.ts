import { AtonStatistics, AtonType, MapAtonResDto, Msg21, Msg6 } from "../declarations/types/types";

type Aton = {
  name: string
  region: string
  mmsi: number
  type: AtonType
}

export async function fetchAtonList(type?: AtonType) {
  try {
    if (type === undefined) type == ''
    // const res = await fetch(`http://10.10.20.200:8020/aton/cloud/lists/${type}`);
    // const res = await fetch(`http://localhost:3000/aton/cloud/lists/${type}`);
    const res = await fetch(`http://localhost:3000/atonForMap`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const atonList = await res.json() as MapAtonResDto[]
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