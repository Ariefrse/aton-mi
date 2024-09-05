/* CODE CONVENTION & STANDARDS
  - Constants are used to define fixed values and enumerations used throughout the application
  - Constants should be maintained for values that are used repeatedly and have a fixed set of possibilities

  NAMING CONVENTION:
  - Constants are named in SNAKE_CASE
*/

export const AIS_MESSAGE_TYPES = {
  1: 'Class A Position Report',
  2: 'Class A Position Report with Extended Detailed Position',
  3: 'Class A Position Report with Special Position',
  4: 'Base Station Report',
  5: 'Static and Voyage Related Data',
  6: 'Binary Addressed Message',
  7: 'Binary Acknowledgement',
  8: 'Binary Broadcast Message',
  9: 'Standard SAR Aircraft Position Report',
  10: 'UTC and Date Inquiry',
  11: 'UTC and Date Response',
  12: 'Addressed Safety-Related Message',
  13: 'Safety-Related Broadcast Message',
  14: 'Interrogation',
  15: 'Assignment Mode Command',
  16: 'Data Link Management',
  17: 'Aids-to-Navigation Report',
  18: 'Standard Class B CS Position Report',
  19: 'Extended Class B Equipment Position Report',
  20: 'Data Link Management',
  21: 'Aid-to-Navigation Report',
  22: 'Channel Management',
  23: 'Group Assignment Command',
  24: 'Static Data Report',
  25: 'Single Slot Binary Message',
  26: 'Multiple Slot Binary Message With Communications State',
  27: 'Position Report For Long-Range Applications',
} as const

export const AID_TYPE = {
  1: 'Reference point',
  2: 'Lateral mark',
  3: 'Fixed structure off shore',
  4: 'Reserved for future use',
  5: 'Light without sectors',
  6: 'Light with sectors',
  7: 'Leading Light Front',
  8: 'Leading Light Rear',
  9: 'Beacon Cardinal N',
  10: 'Beacon Cardinal E',
  11: 'Beacon Cardinal S',
  12: 'Beacon Cardinal W',
  13: 'Beacon Port hand',
  14: 'Beacon Startboard hand',
  15: 'Beacon Preferred Channel',
  16: 'Beacon Preferred Channel starboard hand',
  17: 'Beacon Isolated danger',
  18: 'Beacon Safe Water',
  19: 'Beacon Special mark',
  20: 'Cardinal Mark N',
  21: 'Cardinal Mark E',
  22: 'Cardinal Mark S',
  23: 'Cardinal Mark W',
  24: 'Port hand Mark',
  25: 'Startboard hand Mark',
  26: 'Preferred Channel Port hand Mark',
  27: 'Preferred Channel Port hand Mark',
  28: 'Isolated danger',
  29: 'Safe Water',
  30: 'Special Mark'
} as const

export const POSITION_ACCURACY = {
  0: 'an unaugmented GNSS fix with accuracy > 10m',
  1: 'a DGPS-quality fix with an accuracy of < 10ms',
  // TODO: I think there's still more ... 
} as const

export const EPFD = {
  0: 'Undefined default',
  1: 'GPS',
  2: 'GLONASS',
  3: 'Combined GPS and GLONASS',
  4: 'Loran C',
  5: 'Chayka',
  6: 'Integrated navigation system',
  7: 'Surveyed',
  8: 'Galileo',
  9: 'Reserved 1',
  10: 'Reserved 2',
  11: 'Reserved 3',
  12: 'Reserved 4',
  13: 'Reserved 5',
  14: 'Reserved 6',
  15: 'Internal GNSS',
}