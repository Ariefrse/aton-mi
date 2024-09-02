import { AtonType, Msg21, Msg6 } from "../declarations/types/types";

type Aton = {
  name: string
  region: string
  mmsi: number
  type: AtonType
}

export async function fetchAtonList() {
  try {
    const res = await fetch('http://localhost:3000/aton/lists');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const atonList = await res.json() as Aton[];
    return atonList;
  } catch (error) {
    console.error('Failed to fetch aton list:', error);
  }
}

export async function fetchAton(mmsi: number) {
  try {
    const res = await fetch(`http://localhost:3000/aton/${mmsi}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const aton = await res.json() as Aton;
    return aton;
  } catch (error) {
    console.error('Failed to fetch aton:', error);
  }
}

export async function fetchMessage21(mmsi: number) {
  try {
    console.log('Fetching message 21')
    const res = await fetch(`http://localhost:3000/aton/msg21/${mmsi}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const message21 = await res.json() as Msg21[];
    return message21;
  } catch (error) {
    console.error('Failed to fetch message21:', error);
  }
}

export async function fetchMessage6(mmsi: number) {
  try {
    console.log('Fetching message 6')
    const response = await fetch(`http://localhost:3000/aton/msg6/${mmsi}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const message6 = await response.json() as Msg6[];
    return message6;
  } catch (error) {
    console.error('Failed to fetch message6:', error);
  }
}
