/* CODE CONVENTION & STANDARDS
  - DTOs (Data Transfer Objects) describe the request/response data between server and client.
  - Data/payload exchanged between the server and client should conform to these DTOs.
  - Close communication with the backend team is necessary for any changes to the DTOs.

  NAMING CONVENTION:
  - Use "ResDto" suffix for responses from the server.
  - Use "ReqDto" suffix for requests to the server.
*/

import { AIS_MESSAGE_TYPES } from "../constants/constants"

// Define common types for shared fields
type Timestamp = string // i.e "2024-08-15 07:53:33"
type Percentage = string // i.e "23.00%"
type AtonType = 'Beacon' | 'Buoy' | 'Lighthouse'
type PackageCh = 'A' | 'B'
type PackageType = '!AIVDM' | '!AIVDO' | '!AIQHM'
type MessageType = typeof AIS_MESSAGE_TYPES[keyof typeof AIS_MESSAGE_TYPES]

// Base type for common fields
type BaseAtonResDto = {
  payload: string
  ts: Timestamp
  lcl_ts?: Timestamp
  mmsi: number
  al_name: string
  al_mmsi: number
  al_region: string
  al_type: string
  region?: string
  type?: AtonType
}

// Type for sensor data
type SensorDataResDto = {
  volt_int: number
  volt_ex1: number
  volt_ex2: number
  off_pos: number
  ambient: number
  racon: number
  light: number
  health: number
  beat: number
  alarm_active: number
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
}

// Type for position data
type PositionDataResDto = {
  ss_ts?: Timestamp
  ss_packageType?: PackageType
  ss_packageID?: number
  ss_packageCh?: PackageCh
  ss_messageType?: MessageType
  ss_messageTypeDesc?: string
  ss_repeat?: number
  ss_mmsi?: number
  ss_aidType?: number
  ss_aidTypeDesc?: string
  ss_aidName?: string
  ss_positionAccuracy?: number
  ss_positionAccuracyDesc?: string
  ss_longitude?: number
  ss_latitude?: number
  ss_to_bow?: number
  ss_to_stern?: number
  ss_to_port?: number
  ss_to_starboard?: number
  ss_epfd?: number
  ss_epfdDesc?: string
  ss_utc_second?: number
  ss_off_position?: number
  ss_regional?: number
  ss_raimFlag?: number
  ss_virtualAid?: number
  ss_assigned?: number
  ss_rowcountby_mmsi?: number
}

// Refined types
export type AtonMsgCountResDto = {
  payload: string
  items: {
    ts1: Timestamp
    ts2: string
    msg21_cnt: number
    msg6_cnt: number
    msg8_cnt: number
    msg21_cnt_yesterday: number
    msg6_cnt_yesterday: number
    msg8_cnt_yesterday: number
  }
}

export type AtonStatsResDto = BaseAtonResDto & {
  no: number
  minTemp: number
  maxTemp: number
  minBattAton: number
  maxBattAton: number
  meanBattAton: number
  medianBattAton: number
  stddevBattAton: number
  skewBattAton: number
  kurtBattAton: number
  minBattLant: number
  maxBattLant: number
  meanBattLant: number
  medianBattLant: number
  stddevBattLant: number
  skewBattLant: number
  kurtBattLant: number
  off_pos: string
  msg6Count: number
  siteTx: string
  rownum: number
  at_ts: Timestamp
  lastseen: number
  last_maintain: string
}

export type AllAtonResDto = BaseAtonResDto & {
  ts: Timestamp
  lcl_ts: Timestamp
  packageType: PackageType
  packageID: number
  packageCh: string
  messageType: MessageType
  messageTypeDesc: string
  repeat: number
  seqno: number
  dest_mmsi: number
  retransmit: number
  dac: number
  fid: number
  sensorData: SensorDataResDto
  aa_rowcountby_mmsi: number
  positionData?: PositionDataResDto
  atonname: string
  status: number
}

export type AtonInitialCountResDto = {
  payload: string
  aton_cnt: number
  msg21_cnt: number
  msg6_cnt: number
  msg8_cnt: number
  light_cnt: number
  light_cnt_p: Percentage
  battAton_cnt: number
  battAton_cnt_p: Percentage
  battLant_cnt: number
  battLant_cnt_p: Percentage
  ldr_cnt: number
  ldr_cnt_p: Percentage
  offpos_cnt: number
  offpos_cnt_p: Percentage
  no_msg6_cnt: number
  no_msg6_cnt_p: Percentage
}