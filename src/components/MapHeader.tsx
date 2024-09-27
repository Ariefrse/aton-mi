import { FormEvent } from "react";
import { useAtonStore } from "../store/store";
import MapStyleDropdown from "./MapStyleDropdown";
import TableBtn from "./TableBtn";
import TableOptions from "./TableOptions";
import { MapStyle } from "../modules/MapModule";

type MapHeaderProps = {
  mapStyle: string;
  setMapStyle: (value: MapStyle) => void;
};

export default function MapHeader({ mapStyle, setMapStyle }: MapHeaderProps) {
  const { toggles, setToggles } = useAtonStore();

  const toggleTableModule = () => {
    setToggles({
      ...toggles,
      tableModule: !toggles.tableModule,
      legendToggleBtn: false,
      legend: false,
      atonMessageCountOverview: false,
      atonSummaryPanel: false,
      atonSummaryToggleBtn: false,
    });
  };

  const handleMapStyleChange = (event: FormEvent<HTMLSelectElement>) => {
    setMapStyle((event.target as HTMLSelectElement).value as MapStyle);
  };

  return (
    <div className="mb-4 flex justify-between items-center">
      {!toggles.tableModule && (
        <>
          <h1 className="text-xl">AtoN</h1>
          <div className="flex gap-6 mr-6">
            <TableBtn onClick={toggleTableModule} />
            <MapStyleDropdown
              mapStyle={mapStyle}
              handleMapStyleChange={handleMapStyleChange}
            />
          </div>
        </>
      )}
      {toggles.tableModule && <TableOptions />}
    </div>
  );
}
