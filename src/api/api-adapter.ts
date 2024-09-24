/* TRANSFORMER FUNCTIONS - CODE CONVENTION & STANDARDS
  - Transformer functions are used to adapt external API response data (DTOs) into internal application types.
  - This approach helps in decoupling external API structure from the internal business logic and models.
  - By using transformers, we ensure flexibility and maintainability in case the API structure changes.
  - These functions provide a single source of truth for transforming data, making it easier to debug and modify.

  NAMING CONVENTION:
  - Function names are prefixed with "transform" followed by the type of data being transformed (e.g., transformMsg6).
  - Input parameter should always be the corresponding "ResDto" type, and the return type should be the corresponding internal type.
*/

import { AtonSummaryResDto, AtonTableResDto, Msg21ResDto, Msg6ResDto } from "../declarations/dtos/dtos"
import { AtonData, AtonTable, Msg21, Msg6 } from "../declarations/types/types"

export function transformAtonPanelData(data: AtonSummaryResDto): AtonData {
  return {
    type: data.type,
    region: data.region,
    healthStatus: data.health_OKNG,
    msg21Count: data.cnt_msg21,
    msg6Count: data.cnt_msg6,
    lastLight: data.last_light,
    lastBattAton: data.last_BattAton,
    lastBattLant: data.last_BattLant,
    ldrStatus: data.LDR_OKNG,
    offPosStatus: data.off_pos_OKNG,
    lng: data.longitude,
    lat: data.latitude,
    name: data.name,
    mmsi: data.mmsi,
  }
}

export function transformMsg21(data: Msg21ResDto): Msg21 {
  return {
    msgType: data.msg_type,
    msgTypeDesc: data.msg_type_desc,
    mmsi: data.mmsi,
    aidType: data.aidType,
    aidTypeDesc: data.aidTypeDesc,
    aidName: data.aidName,
    positionAccuracy: data.positionAccuracy,
    long: data.longitude,
    lat: data.latitude,
    toBow: data.to_bow,
    toStern: data.to_stern,
    toPort: data.to_port,
    toStarboard: data.to_starboard,
    epfd: data.epfd,
    epfdDesc: data.epfdDesc,
    utcSecond: data.utc_second,
    offPosition: data.off_position,
    regional: data.regional,
    raimFlag: data.raimFlag,
    virtualAid: data.virtualAid,
    assigned: data.assigned,
  }
}

export function transformMsg6(data: Msg6ResDto): Msg6 {
  return {
    isoTs: data.ts_iso,
    localTs: data.lcl_ts,
    pkgType: data.packageType,
    pkgId: data.packageID,
    pkgCh: data.packageCh,
    msgType: data.msg_type,
    msgTypeDesc: data.msg_type_desc,
    repeat: data.repeat,
    mmsi: data.mmsi,
    seqNo: data.seqno,
    destMmsi: data.dest_mmsi,
    retransmit: data.retransmit,
    dac: data.dac,
    fid: data.fid,
    voltInt: data.volt_int,
    voltExt1: data.volt_ex1,
    voltExt2: data.volt_ex2,
    offPos: data.off_pos,
    ambient: data.ambient,
    racon: data.racon,
    light: data.light,
    health: data.health,
    beat: data.beat,
    ts: data.ts,
    alarmActive: data.alarm_active,
    buoyLedPower: data.buoy_led_power,
    buoyLowVin: data.buoy_low_vin,
    buoyPhotocell: data.buoy_photocell,
    buoyTemp: data.buoy_temp,
    buoyForceOff: data.buoy_force_off,
    buoyIsLight: data.buoy_islight,
    buoyErrLedShort: data.buoy_errled_short,
    buoyErrLedOpen: data.buoy_errled_open,
    buoyErrLedVoltLow: data.buoy_errled_voltlow,
    buoyErrLedVinLow: data.buoy_errled_vinlow,
    buoyErrLedPower: data.buoy_errled_power,
    buoyAdjMaxPower: data.buoy_adjmaxpower,
    buoySensorInterrupt: data.buoy_sensor_interrupt,
    buoySolarCharging: data.buoy_solarcharging,
  }
}

export function transformAtonTableData(data: AtonTableResDto): AtonTable {
  return {
    ts: data.ts,
    mmsi: data.mmsi,
    minTemp: data.minTemp,
    maxTemp: data.maxTemp,
    minBattAton: data.minBattAton,
    maxBattAton: data.maxBattAton,
    meanBattAton: data.meanBattAton,
    medianBattAton: data.medianBattAton,
    stddevBattAton: data.stddevBattAton,
    skewBattAton: data.skewBattAton,
    kurtBattAton: data.kurtBattAton,
    minBattLant: data.minBattLant,
    maxBattLant: data.maxBattLant,
    meanBattLant: data.meanBattLant,
    medianBattLant: data.medianBattLant,
    stddevBattLant: data.stddevBattLant,
    skewBattLant: data.skewBattLant,
    kurtBattLant: data.kurtBattLant,
    offPosition: data.off_pos,
    msg6Count: data.msg6,
    rowNum: data.rownum,
    atTs: data.at_ts,
    name: data.al_name,
    region: data.al_region,
    type: data.al_type,
    lastSeen: data.lastseen,
  }
}
