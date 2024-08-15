/* CODE CONVENTION & STANDARDS
  - Constants are used to define fixed values and enumerations used throughout the application
  - Constants should be maintained for values that are used repeatedly and have a fixed set of possibilities

  NAMING CONVENTION:
  - Constants are named in SNAKE_CASE
*/


// AIS Message Types Constant
export const AIS_MESSAGE_TYPES = {
  POSITION_REPORT_CLASS_A: 1,
  POSITION_REPORT_CLASS_A_EXTENDED: 2,
  POSITION_REPORT_CLASS_A_SPECIAL: 3,
  BASE_STATION_REPORT: 4,
  STATIC_VOYAGE_DATA: 5,
  BINARY_ADDRESSED_MESSAGE: 6,
  BINARY_BROADCAST_MESSAGE: 7,
  DATA_LINK_MANAGEMENT: 8,
  AIDS_TO_NAVIGATION_REPORT: 9,
  STANDARD_SAR_AIRCRAFT_POSITION_REPORT: 10,
  UTC_DATE_REPORT: 11,
  ADDRESSED_SAFETY_RELATED_MESSAGE: 12,
  SAFETY_RELATED_BROADCAST_MESSAGE: 13,
  SAR_AIRCRAFT_REQUEST: 14,
  SAFETY_RELATED_BROADCAST_MESSAGE_SAR: 15,
  INTERROGATION: 16,
  ASSIGNMENT: 17,
  DATA_LINK_MANAGEMENT_EXTENDED: 18,
  CHANNEL_MANAGEMENT: 19,
  SAFETY_RELATED_MESSAGE: 20,
  AID_TO_NAVIGATION_REPORT_GPS: 21,
  CHANNEL_MANAGEMENT_GPS: 22,
  SAFETY_RELATED_MESSAGE_GPS: 23,
  MULTI_MESSAGE_GPS: 24,
  POSITION_REPORT_SPECIALIZED: 25,
  INTERROGATION_EXTENDED: 26,
  CHANNEL_MANAGEMENT_EXTENDED: 27
} as const;
