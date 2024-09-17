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
import { MapStyle } from "../../modules/MapModule";
import { AIS_MSG_TYPE } from "../constants/constants";

export type { Layer, LayersList } from "@deck.gl/core";
export type { LineLayer, ScatterplotLayerProps } from '@deck.gl/layers';
export type { HeatmapLayer, HexagonLayerProps } from '@deck.gl/aggregation-layers';

export type ShipTypeColorMap = { [key: number]: string; };

export type AtonType = 'Beacon' | 'Buoy' | 'Lighthouse'
export type AtonStatus = 'Good' | 'Warning' | 'Error'
export type PackageCh = 'A' | 'B'
export type Region = 'North' | 'South' | 'East' | 'West' | 'Borneo'
export type PackageType = '!AIVDM' | '!AIVDO' | '!AIQHM' | '!ABVDM'
export type MessageType = keyof typeof AIS_MSG_TYPE

export type Msg6 = {
  packageType: string;
  packageID: number;
  packageCh: string;
  messageType: number;
  messageTypeDesc: string;
  repeat: number;
  mmsi: number;
  seqno: number;
  dest_mmsi: number;
  retransmit: number;
  dac: number;
  fid: number;
  volt_int: number;
  volt_ex1: number;
  volt_ex2: number;
  off_pos: number;
  ambient: number;
  racon: number;
  light: number;
  health: number;
  beat: number;
  alarm_active: number;
  buoy_led_power: number;
  buoy_low_vin: number;
  buoy_photocell: number;
  buoy_temp: number;
  buoy_force_off: number;
  buoy_islight: number;
  buoy_errled_short: number;
  buoy_errled_open: number;
  buoy_errled_voltlow: number;
  buoy_errled_vinlow: number;
  buoy_errled_power: number;
  buoy_adjmaxpower: number;
  buoy_sensor_interru: number;
  buoy_solarcharging: number;
};

export type Msg21 = {
  packageType: string;
  packageCh: PackageCh;
  messageType: number;
  messageTypeDesc: string;
  repeat: number;
  mmsi: number;
  aidType: number;
  aidTypeDesc: string;
  aidName: string;
  positionAccuracy: number;
  longitude: number;
  latitude: number;
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

export type AtonStore = {
  last_BattAton: number;
  latitude: number;
  longitude: number;
  meanBattAton: number;
  mmsi: number;
  name: string;
  region: string;
  ts: string;
  msg6?: Partial<Msg6>[]
  msg21?: Partial<Msg21>[]
}

export type AtonStatistics = {
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
  off_pos: number;
  msg6: number;
  rownum: number;
  at_ts: string;
  al_name: string;
  al_mmsi: number;
  al_region: string;
  al_type: string;
  lastseen: number;
};

export type MapAtonResDto = {
  last_BattAton: number;
  latitude: number;
  longitude: number;
  meanBattAton: number;
  mmsi: number;
  name: string;
  region: string;
  ts: string;
  type: AtonType;
};

export type UserSettings = {
  mapStyle: MapStyle
  mapViewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  }
  // TODO: To add table filter settings
}