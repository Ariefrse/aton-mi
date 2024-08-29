/* CODE STANDARDS & CONVENTION
  TYPES :
  - Refer to the types/interfaces required for our client/frontend app to work
  - It describes the objects within our client/frontend app
  - It's highly recommended to use types whenever, wherever possible to document our code better
  - Types should be well-documented and maintained to avoid misunderstandings

  NAMING STANDARD :
  - All types from 3rd party libraries should be imported here prefixed with "T"
  - This is to ease refactoring of Types and imports
*/

import { AIS_MESSAGE_TYPES } from "../constants/constants";

// Deck.GL Layer Types
export type { Layer, LayersList } from "@deck.gl/core";
export type { LineLayer, ScatterplotLayerProps } from '@deck.gl/layers';
export type { HeatmapLayer, HexagonLayerProps } from '@deck.gl/aggregation-layers';

// Others
export type ShipTypeColorMap = { [key: number]: string; };

export type AtonType = 'Beacon' | 'Buoy' | 'Lighthouse'
export type Status = 'Good' | 'Warning' | 'Error'
export type PackageCh = 'A' | 'B'
export type PackageType = '!AIVDM' | '!AIVDO' | '!AIQHM' | '!ABVDM'
export type MessageType = typeof AIS_MESSAGE_TYPES[keyof typeof AIS_MESSAGE_TYPES]

type AtonData = {
  ts: string
  lcl_ts: string
  pkgType: string
  pkgId: number
  pkgCh: string
  msgType: number
  msgTypeDesc: string
  repeat: number
  seqno: number
  dest_mmsi: number
  retransmit: number
  dac: number
  fid: number
  volt_int: number
  volt_ex1: number
  volt_ex2: number
  off_pos: number
  ambient: number
  racon: number
  light: number
  health: number
  beat: number
  alarm_on: number
  buoy_led_power: number
  buoy_low_vin: number
  buoy_photocell: number
  buoy_temp: number
  buoy_force_off: number
  buoy_islight: number
  buoy_errled_short: number
  buoy_errled_open: number
  buoy_errled_voltlow: number
  buoy_errled_vinlow: number
  buoy_errled_power: number
  buoy_adjmaxpower: number
  buoy_sensor_interrupt: number
  buoy_solarcharging: number
  aa_rowcountby_mmsi: number
  ss_ts: string
  ss_pkgType: string
  ss_pkgId: number
  ss_pkgCh: string
  ss_msgType: number
  ss_msgTypeDesc: string
  ss_repeat: number
  ss_aidType: number
  ss_aidTypeDesc: string
  ss_aidName: string
  ss_positionAccuracy: number
  ss_positionAccuracyDesc: string
  ss_longitude: number
  ss_latitude: number
  ss_to_bow: number
  ss_to_stern: number
  ss_to_port: number
  ss_to_starboard: number
  ss_epfd: number
  ss_epfdDesc: string
  ss_utc_second: number
  ss_off_position: number
  ss_regional: number
  ss_raimFlag: number
  ss_virtualAid: number
  ss_assigned: number
  ss_rowcountby_mmsi: number
  al_region: string
  region: string
  status: number
}

export type AtonInitialData = {
  mmsi: number
  name: string
  type: "Buoy" | "Lighthouse" | "Beacon"
  messageType: 6 | 21
  latitude: number
  longitude: number
}

export type AtonDetailedData = {
  mmsi: number
  type: AtonType
  name: string
  al_mmsi?: number
  al_type?: string
  al_name?: string
  data: AtonData[]
}

export type AtonDataForTable = Omit<AtonDetailedData, 'data'> & AtonData