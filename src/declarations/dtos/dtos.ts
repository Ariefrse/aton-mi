import { AIS_MESSAGE_TYPES } from "../constants/constants"

// Define common types for shared fields
export type Timestamp = string // i.e "2024-08-15 07:53:33"
export type Percentage = string // i.e "23.00%"
export type AtonType = 'Beacon' | 'Buoy' | 'Lighthouse'
export type Status = 'Good' | 'Warning' | 'Error'
export type PackageCh = 'A' | 'B'
export type PackageType = '!AIVDM' | '!AIVDO' | '!AIQHM' | '!ABVDM'
export type AtonWsPayload = 'getatoninitialcount' | 'getallatonvoltdata' | 'getallatonbeatdata' | 'getallaton' | 'getatonmsgcount' | 'ping' | 'getdailystatisticstartfrom';
export type MessageType = typeof AIS_MESSAGE_TYPES[keyof typeof AIS_MESSAGE_TYPES]

// Base type for common fields in Aton responses
type BaseAtonResDto = {
  /** The type of WebSocket payload. */
  payload: AtonWsPayload

  /** Timestamp of the data. */
  ts: Timestamp

  /** Local timestamp of the data. */
  lcl_ts?: Timestamp

  /** Maritime Mobile Service Identity (MMSI) number. */
  mmsi: number

  /** Name of the aid to navigation. */
  al_name: string

  /** MMSI number of the aid to navigation. */
  al_mmsi: number

  /** Region of the aid to navigation. */
  al_region: string

  /** Type of the aid to navigation. */
  al_type: AtonType

  /** Region of the data. */
  region?: string
}

// Sensor data type
type SensorDataResDto = {
  /** Internal voltage. */
  volt_int: number

  /** External voltage 1. */
  volt_ex1: number

  /** External voltage 2. */
  volt_ex2: number

  /** Offset position. */
  off_pos: number

  /** Ambient temperature. */
  ambient: number

  /** Racon value. */
  racon: number

  /** Light value. */
  light: number

  /** Health status. */
  health: number

  /** Beat value. */
  beat: number

  /** Alarm active status. */
  alarm_active: number

  /** Buoy LED power. */
  buoy_led_power: number

  /** Buoy low voltage input. */
  buoy_low_vin: number

  /** Buoy photocell value. */
  buoy_photocell: number

  /** Buoy temperature. */
  buoy_temp: number

  /** Buoy force-off status. */
  buoy_force_off: number

  /** Buoy light status. */
  buoy_islight: number

  /** Buoy error LED short status. */
  buoy_errled_short: number

  /** Buoy error LED open status. */
  buoy_errled_open: number

  /** Buoy error LED voltage low status. */
  buoy_errled_voltlow: number

  /** Buoy error LED voltage input low status. */
  buoy_errled_vinlow: number

  /** Buoy error LED power status. */
  buoy_errled_power: number

  /** Buoy maximum power adjustment. */
  buoy_adjmaxpower: number

  /** Buoy sensor interrupt status. */
  buoy_sensor_interrupt: number

  /** Buoy solar charging status. */
  buoy_solarcharging: number
}

// Position data type
type PositionDataResDto = {
  /** Timestamp of the position data. */
  ss_ts?: Timestamp

  /** Type of package. */
  ss_packageType?: PackageType

  /** ID of the package. */
  ss_packageID?: number

  /** Channel of the package. */
  ss_packageCh?: PackageCh

  /** Type of message. */
  ss_messageType?: MessageType

  /** Description of the message type. */
  ss_messageTypeDesc?: string

  /** Repeat indicator. */
  ss_repeat?: number

  /** MMSI number. */
  ss_mmsi?: number

  /** Type of aid. */
  ss_aidType?: number

  /** Description of the aid type. */
  ss_aidTypeDesc?: string

  /** Name of the aid. */
  ss_aidName?: string

  /** Position accuracy. */
  ss_positionAccuracy?: number

  /** Description of the position accuracy. */
  ss_positionAccuracyDesc?: string

  /** Longitude of the position. */
  ss_longitude?: number

  /** Latitude of the position. */
  ss_latitude?: number

  /** Distance to the bow. */
  ss_to_bow?: number

  /** Distance to the stern. */
  ss_to_stern?: number

  /** Distance to the port. */
  ss_to_port?: number

  /** Distance to the starboard. */
  ss_to_starboard?: number

  /** Electronic position fixing device (EPFD) value. */
  ss_epfd?: number

  /** Description of the EPFD. */
  ss_epfdDesc?: string

  /** UTC second value. */
  ss_utc_second?: number

  /** Offset position. */
  ss_off_position?: number

  /** Regional indicator. */
  ss_regional?: number

  /** RAIM flag status. */
  ss_raimFlag?: number

  /** Virtual aid indicator. */
  ss_virtualAid?: number

  /** Assigned indicator. */
  ss_assigned?: number

  /** Row count by MMSI. */
  ss_rowcountby_mmsi?: number
}

// Refined types
export type AtonMsgCountResDto = BaseAtonResDto & {
  /** Timestamp of the first message count. */
  ts1: Timestamp

  /** Timestamp of the second message count. */
  ts2: Timestamp

  /** Count of message type 21. */
  msg21_cnt: number

  /** Count of message type 6. */
  msg6_cnt: number

  /** Count of message type 8. */
  msg8_cnt: number

  /** Count of message type 21 for yesterday. */
  msg21_cnt_yesterday: number

  /** Count of message type 6 for yesterday. */
  msg6_cnt_yesterday: number

  /** Count of message type 8 for yesterday. */
  msg8_cnt_yesterday: number
}

export type AtonStatsResDto = BaseAtonResDto & {
  /** Number of records. */
  no: number

  /** Minimum temperature. */
  minTemp: number

  /** Maximum temperature. */
  maxTemp: number

  /** Minimum battery voltage for Aton. */
  minBattAton: number

  /** Maximum battery voltage for Aton. */
  maxBattAton: number

  /** Mean battery voltage for Aton. */
  meanBattAton: number

  /** Median battery voltage for Aton. */
  medianBattAton: number

  /** Standard deviation of battery voltage for Aton. */
  stddevBattAton: number

  /** Skewness of battery voltage for Aton. */
  skewBattAton: number

  /** Kurtosis of battery voltage for Aton. */
  kurtBattAton: number

  /** Minimum battery voltage for Lant. */
  minBattLant: number

  /** Maximum battery voltage for Lant. */
  maxBattLant: number

  /** Mean battery voltage for Lant. */
  meanBattLant: number

  /** Median battery voltage for Lant. */
  medianBattLant: number

  /** Standard deviation of battery voltage for Lant. */
  stddevBattLant: number

  /** Skewness of battery voltage for Lant. */
  skewBattLant: number

  /** Kurtosis of battery voltage for Lant. */
  kurtBattLant: number

  /** Offset position. */
  off_pos: string

  /** Count of message type 6. */
  msg6Count: number

  /** Transmission site. */
  siteTx: string

  /** Row number. */
  rownum: number

  /** Timestamp of the data. */
  at_ts: Timestamp

  /** Last seen timestamp. */
  lastseen: number

  /** Last maintenance date. */
  last_maintain: string
}

export type AllAtonResDto = BaseAtonResDto & {
  /** Type of package. */
  packageType: PackageType

  /** ID of the package. */
  packageID: number

  /** Channel of the package. */
  packageCh: PackageCh

  /** Type of message. */
  messageType: MessageType

  /** Description of the message type. */
  messageTypeDesc: string

  /** Repeat indicator. */
  repeat: number

  /** Sequence number. */
  seqno: number

  /** Destination MMSI number. */
  dest_mmsi: number

  /** Retransmit indicator. */
  retransmit: number

  /** Data access code. */
  dac: number

  /** Function identifier. */
  fid: number

  /** Sensor data. */
  sensorData: SensorDataResDto

  /** Row count by MMSI. */
  aa_rowcountby_mmsi: number

  /** Position data (optional). */
  positionData?: PositionDataResDto

  /** Name of the Aton. */
  atonname: string

  /** Status of the Aton. */
  status: number
}

export type AtonInitialCountResDto = BaseAtonResDto & {
  /** Count of Aton devices. */
  aton_cnt: number

  /** Count of message type 21. */
  msg21_cnt: number

  /** Count of message type 6. */
  msg6_cnt: number

  /** Count of message type 8. */
  msg8_cnt: number

  /** Light count. */
  light_cnt: number

  /** Percentage of light count. */
  light_cnt_p: Percentage

  /** Battery count for Aton. */
  battAton_cnt: number

  /** Percentage of battery count for Aton. */
  battAton_cnt_p: Percentage

  /** Battery count for Lant. */
  battLant_cnt: number

  /** Percentage of battery count for Lant. */
  battLant_cnt_p: Percentage

  /** LDR count. */
  ldr_cnt: number

  /** Percentage of LDR count. */
  ldr_cnt_p: Percentage

  /** Offset position count. */
  offpos_cnt: number

  /** Percentage of offset position count. */
  offpos_cnt_p: Percentage

  /** Count of message type 6 with no data. */
  no_msg6_cnt: number

  /** Percentage of message type 6 with no data. */
  no_msg6_cnt_p: Percentage
}

export type AtonDataResDto = BaseAtonResDto & {
  /** Package type. */
  packageType: PackageType

  /** ID of the package. */
  packageID: number

  /** Channel of the package. */
  packageCh: PackageCh

  /** Message type. */
  messageType: MessageType

  /** Description of the message type. */
  messageTypeDesc: string

  /** Repeat indicator. */
  repeat: number

  /** MMSI number. */
  mmsi: number

  /** Sequence number. */
  seqno: number

  /** Destination MMSI number. */
  dest_mmsi: number

  /** Retransmit indicator. */
  retransmit: number

  /** Data access code. */
  dac: number

  /** Function identifier. */
  fid: number

  /** Sensor data. */
  sensorData: SensorDataResDto

  /** Row count by MMSI. */
  aa_rowcountby_mmsi: number

  /** Position data (optional). */
  positionData?: PositionDataResDto

  /** Name of the Aton. */
  atonname: string

  /** Status of the Aton. */
  status: number
}
