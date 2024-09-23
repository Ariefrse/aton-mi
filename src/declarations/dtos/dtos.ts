/* CODE CONVENTION & STANDARDS
  - DTOs describe the request/response data between server and client
  - Data/payload sent between server and client should follow the DTOs
  - Close communication with backend team is necessary for any changes
  - These should only be used in API req/res function

  NAMING CONVENTION : 
  - Suffixed with "ResDto" for response from server
  - Suffixed with "ReqDto" for request from client
*/

import { AtonType, PkgCh } from "../types/types";

export type AtonListResDto = {
  name: string
  region: string
  mmsi: number
  type: AtonType
}

export type Msg6ResDto = {
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

export type Msg21ResDto = {
  packageType: string;
  packageCh: PkgCh;
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

export type AtonTableResDto = {
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
  al_type: AtonType;
  lastseen: number;
};

export type AtonSummaryItemResDto = {
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