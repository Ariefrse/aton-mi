import { FormEvent } from "react";
import { MAP_STYLES } from "../declarations/constants/constants";

type MapStyleDropdownProps = {
  mapStyle: string;
  handleMapStyleChange: (e: FormEvent<HTMLSelectElement>) => void;
};

function MapStyleDropdown({
  mapStyle,
  handleMapStyleChange,
}: Readonly<MapStyleDropdownProps>) {
  return (
    <select
      value={mapStyle}
      onChange={handleMapStyleChange}
      className="bg-gray-700 text-white p-2 rounded"
    >
      {Object.entries(MAP_STYLES).map(([key, value]) => (
        <option key={key} value={value}>
          {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
          {/* Human-readable label */}
        </option>
      ))}
    </select>
  );
}

export default MapStyleDropdown;
