import { AtonType, Msg21, Msg6 } from "../declarations/types/types";

export async function fetchAtonList() {
  try {
    const response = await fetch('10.10.20.200:8020/aton/lists');
    const atonList = await response.json() as Aton[]
    return atonList;
  } catch (error) {
    console.error('Failed to fetch aton list :', error)
  }
}

type Aton = {
  name: string
  region: string
  mmsi: number
  type: AtonType
}

export async function fetchAton(mmsi: number) {
  try {
    const response = await fetch(`10.10.20.200:8020/aton/${mmsi}`);
    const aton = await response.json() as Aton
    return aton
  } catch (error) {
    console.error('Failed to fetch aton :', error)
  }
}

export async function fetchMessage21(mmsi: number) {
  try {
    const response = await fetch(`10.10.20.200:8020/aton/msg21/${mmsi}`);
    const message21 = await response.json() as Msg21[]
    return message21
  } catch (error) {
    console.error('Failed to fetch message21 :', error)
  }
}

export async function fetchMessage6(mmsi: number) {
  try {
    const response = await fetch(`10.10.20.200:8020/aton/msg6/${mmsi}`);
    const message6 = await response.json() as Msg6[]
    return message6
  } catch (error) {
    console.error('Failed to fetch message21 :', error)
  }
}