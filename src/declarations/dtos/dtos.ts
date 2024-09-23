/* CODE CONVENTION & STANDARDS
  - DTOs describe the request/response data between server and client
  - Data/payload sent between server and client should follow the DTOs
  - Close communication with backend team is necessary for any changes
  - These should only be used in API req/res function

  NAMING CONVENTION : 
  - Suffixed with "ResDto" for response from server
  - Suffixed with "ReqDto" for request from client
*/

import { AtonType, PkgCh, PkgType } from "../types/types";

export type AtonListResDto = {
  name: string
  region: string
  mmsi: number
  type: AtonType
}

export type Msg6ResDto = {
  alarm_active: number;
  ambient: number;
  beat: number;
  buoy_adjmaxpower: number;
  buoy_errled_open: number;
  buoy_errled_power: number;
  buoy_errled_short: number;
  buoy_errled_vinlow: number;
  buoy_errled_voltlow: number;
  buoy_force_off: number;
  buoy_islight: number;
  buoy_led_power: number;
  buoy_low_vin: number;
  buoy_photocell: number;
  buoy_sensor_interrupt: number;
  buoy_solarcharging: number;
  buoy_temp: number;
  dac: number;
  dest_mmsi: number;
  fid: number;
  health: number;
  lcl_ts: string;
  light: number;
  mmsi: number;
  msg_type: number;
  msg_type_desc: string;
  off_pos: number;
  packageCh: string;
  packageID: number;
  packageType: string;
  racon: number;
  repeat: number;
  retransmit: number;
  seqno: number;
  ts: string;
  ts_iso: string;
  volt_ex1: number;
  volt_ex2: number;
  volt_int: number;
};

export type Msg21ResDto = {
  aidName: string;
  aidType: number;
  aidTypeDesc: string;
  assigned: number;
  epfd: number;
  epfdDesc: string;
  latitude: number;
  lcl_ts: string;
  longitude: number;
  mmsi: number;
  msg_type: number;
  msg_type_desc: string;
  off_position: number;
  positionAccuracy: number;
  positionAccuracyDesc: string;
  raimFlag: number;
  region: number;
  regional: number;
  to_bow: number;
  to_port: number;
  to_starboard: number;
  to_stern: number;
  ts: string;
  ts_iso: string;
  utc_second: number;
  virtualAid: number;
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

export type AtonSummaryResDto = {
  type: AtonType;
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
  last_LDR: number
  last_Temp: number
  last_health: number
  last_racon: number
  lastseen: string
  lcl_ts: string
  opt21_percent: number
  opt6_percent: number
  racon_OKNG: number
  ts: string
  ts_iso: string
};