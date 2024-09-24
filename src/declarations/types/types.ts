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

import mapStyle from "../../modules/MapModule";
import { AIS_MSG_TYPE } from "../constants/constants";

export type { Layer, LayersList } from "@deck.gl/core";
export type { LineLayer, ScatterplotLayerProps } from '@deck.gl/layers';
export type { HeatmapLayer, HexagonLayerProps } from '@deck.gl/aggregation-layers';

export type ShipTypeColorMap = { [key: number]: string; };

export type AtonType = 'Beacon' | 'Buoy' | 'Lighthouse';
export type AtonStatus = 'Good' | 'Warning' | 'Error'
export type PkgCh = 'A' | 'B'
export type Region = 'North' | 'South' | 'East' | 'West' | 'Borneo'
export type pkgType = '!AIVDM' | '!AIVDO' | '!AIQHM' | '!ABVDM'
export type msgType = keyof typeof AIS_MSG_TYPE

export type AtonData = {
  type: string;
  region: string;
  healthStatus: number;
  msg21Count: number;
  msg6Count: number;
  lastLight: number;
  lastBattAton: number;
  lastBattLant: number;
  ldrStatus: number;
  offPosStatus: number;
  long: number;
  lat: number;
  name: string;
  mmsi: number;
};

export type Msg6 = {
  pkgType: string;
  pkgId: number;
  pkgCh: string;
  msgType: number;
  msgTypeDesc: string;
  repeat: number;
  mmsi: number;
  seqNo: number;
  destMmsi: number;
  retransmit: number;
  dac: number;
  fid: number;
  offPos: number;
  voltInt: number;
  voltExt1: number;
  voltExt2: number;
  ambient: number;
  racon: number;
  light: number;
  health: number;
  beat: number;
  alarmActive: number;
  buoyLedPower: number;
  buoyLowVin: number;
  buoyPhotocell: number;
  buoyTemp: number;
  buoyForceOff: number;
  buoyIsLight: number;
  buoyErrLedShort: number;
  buoyErrLedOpen: number;
  buoyErrLedVoltLow: number;
  buoyErrLedVinLow: number;
  buoyErrLedPower: number;
  buoyAdjMaxPower: number;
  buoySensorInterru: number;
  buoySolarCharging: number;
};

export type Msg21 = {
  pkgType: string;
  pkgCh: string;
  msgType: number;
  msgTypeDesc: string;
  repeat: number;
  mmsi: number;
  aidType: number;
  aidTypeDesc: string;
  aidName: string;
  positionAccuracy: number;
  long: number;
  lat: number;
  toBow: number;
  toStern: number;
  toPort: number;
  toStarboard: number;
  epfd: number;
  epfdDesc: string;
  utcSecond: number;
  offPosition: number;
  regional: number;
  raimFlag: number;
  virtualAid: number;
  assigned: number;
};

export type AtonTable = {
  ts: string;
  mmsi: number;
  minTemp: number;
  maxTemp: number;
  minBattAton: number;
  maxBattAton: number;
  meanBattAton: number;
  medianBattAton: number;
  stddevBattAton: number;
  skewBattAton: number;
  kurtBattAton: number;
  minBattLant: number;
  maxBattLant: number;
  meanBattLant: number;
  medianBattLant: number;
  stddevBattLant: number;
  skewBattLant: number;
  kurtBattLant: number;
  offPosition: number;
  msg6Count: number;
  rowNum: number;
  atTs: string;
  name: string;
  region: string;
  type: AtonType;
  lastSeen: number;
};

export type UserSettings = {
  mapStyle: typeof mapStyle;
  mapViewState: {
    lat: number;
    long: number;
    zoom: number;
  }
  // TODO: To add table filter settings
}

export type AtonSummaryItem = {
  type: string;
  region: string;
  health_OKNG: number;
  cnt_msg21: number;
  cnt_msg6: number;
  last_light: number;
  last_BattAton: number;
  last_BattLant: number;
  LDR_OKNG: number;
  off_pos_OKNG: number;
  longitude: number;
  latitude: number;
  name: string;
  mmsi: number;
};