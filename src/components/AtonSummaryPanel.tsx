import { useEffect, useState, useMemo, ReactNode } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useAtonStore } from "../store/store";
import { AtonData } from "../declarations/types/types";
import { fetchAtonData } from "../api/aton-api";
import { BiChevronDown } from "react-icons/bi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import dayjs, { Dayjs } from "dayjs";
import Draggable from 'react-draggable';

export default function AtonSummaryPanel() {
  const { toggles, setToggles, atonData, filter, setFilter } = useAtonStore();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleDateChange = async (date: string) => {
    try {
      const data = await fetchAtonData(date);
      setAtonData(data);
    } catch (error) {
      console.error('Error fetching AtoN data:', error);
    }
  };

  useEffect(() => {
    fetchAtonData(filter.date);
  }, []);

  const filteredPanelData = useMemo(() => {
    if (!atonData) return null;

    return atonData.filter((item: AtonData) => {
      const structureMatch =
        filter.structures.includes("All") ||
        filter.structures.includes(item.type);
      const regionMatch =
        filter.regions.includes("All") || filter.regions.includes(item.region);
      let conditionMatch = true;
      if (filter.condition === "Good") {
        conditionMatch = item.healthStatus === 1;
      } else if (filter.condition === "Not Good") {
        conditionMatch = item.healthStatus === 0;
      }

      return structureMatch && regionMatch && conditionMatch;
    });
  }, [atonData, filter]);

  const memoizedPanelData = useMemo(() => {
    if (!filteredPanelData) return null;

    return filteredPanelData.reduce(
      (acc, item) => {
        acc.totalSites++;
        if (item.msg21Count === 0) acc.msg21Count++;
        if (item.msg6Count === 0) acc.msg6Count++;
        if (item.lastLight === 0) acc.lightError++;
        if (item.lastBattAton < 12) acc.lowBattAtoN++;
        if (item.lastBattLant < 12) acc.lowBattLant++;
        if (item.ldrStatus === 0) acc.badLDR++;
        if (item.offPosStatus === 1) acc.offPos++;
        return acc;
      },
      {
        totalSites: 0,
        msg21Count: 0,
        msg6Count: 0,
        lightError: 0,
        lowBattAtoN: 0,
        lowBattLant: 0,
        badLDR: 0,
        offPos: 0,
      }
    );
  }, [filteredPanelData]);

  const uniqueStructures = useMemo(() => {
    if (!atonData) return [];
    return ["All", ...Array.from(new Set(atonData.map((item) => item.type)))];
  }, [atonData]);

  const uniqueRegions = useMemo(() => {
    if (!atonData) return [];
    return ["All", ...Array.from(new Set(atonData.map((item) => item.region)))];
  }, [atonData]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleStructureChange = (structure: string) => {
    if (structure === "All") {
      setFilter({ ...filter, structures: ["All"] });
    } else {
      let newSelectedStructures = filter.structures.includes("All")
        ? []
        : [...filter.structures];

      if (newSelectedStructures.includes(structure)) {
        newSelectedStructures = newSelectedStructures.filter(
          (item) => item !== structure
        );
      } else {
        newSelectedStructures.push(structure);
      }

      setFilter({
        ...filter,
        structures:
          newSelectedStructures.length === 0 ? ["All"] : newSelectedStructures,
      });
    }
  };

  const handleRegionChange = (region: string) => {
    if (region === "All") {
      setFilter({
        ...filter,
        regions: ["All"],
      });
    } else {
      let newSelectedRegions = filter.regions.includes("All")
        ? []
        : [...filter.regions];

      if (newSelectedRegions.includes(region)) {
        newSelectedRegions = newSelectedRegions.filter(
          (item) => item !== region
        );
      } else {
        newSelectedRegions.push(region);
      }

      setFilter({
        ...filter,
        regions: newSelectedRegions.length === 0 ? ["All"] : newSelectedRegions,
      });
    }
  };

  const ExpandableSection = ({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) => (
    <div>
      <button
        className="w-full flex justify-between items-center py-2"
        onClick={() => toggleSection(title)}
        aria-expanded={expandedSection === title}
        aria-controls={`${title.toLowerCase()}-content`}
      >
        <span className="font-medium">{title}</span>
        {expandedSection === title ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </button>
      {expandedSection === title && (
        <div id={`${title.toLowerCase()}-content`} className="mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <Draggable handle=".drag-handle">
      <div className="bg-gray-900 text-white p-4 rounded-lg w-80 shadow-lg absolute">
        <div className="flex justify-between items-center mb-4 drag-handle cursor-move">
          <div className="flex items-baseline">
            <h2 className="text-xl font-semibold">AtoN Summary</h2>
            <div
              className="flex items-center gap-1"
              onClick={() => setIsDatePickerOpen(true)}
            >
              <p className="text-blue-400 ml-3 font-semibold hover:cursor-pointer text-sm">
                {filter.date}
              </p>
              <div className="relative">
                <BiChevronDown className="text-blue-400 hover:text-blue-300 transition-all duration-200 hover:cursor-pointer" />
                {isDatePickerOpen && (
                  <ClickAwayListener
                    onClickAway={() => setIsDatePickerOpen(false)}
                  >
                    <div className="absolute top-full left-0 bg-gray-700 w-auto h-auto rounded-md shadow-md">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          value={dayjs(filter.date)}
                          onChange={(val: Dayjs) =>
                            setFilter({
                              ...filter,
                              date: val.format("YYYY-MM-DD"),
                            })
                          }
                        />
                      </LocalizationProvider>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-white"
            aria-label="Close"
            onClick={() =>
              setToggles({
                ...toggles,
                atonSummaryPanel: false,
                atonSummaryToggleBtn: true,
              })
            }
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <ExpandableSection title="Structure">
            <div className="space-y-2">
              {uniqueStructures.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`structure-${item}`}
                    name="structure"
                    checked={filter.structures.includes(item)}
                    onChange={() => handleStructureChange(item)}
                    className="bg-gray-700 border-gray-600"
                  />
                  <label htmlFor={`structure-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </ExpandableSection>

          <ExpandableSection title="Condition">
            <div className="space-y-2">
              {["All", "Good", "Not Good"].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`condition-${item}`}
                    name="condition"
                    checked={filter.condition === item}
                    onChange={() =>
                      setFilter({
                        ...filter,
                        condition: item as "All" | "Good" | "Not Good",
                      })
                    }
                    className="bg-gray-700 border-gray-600"
                  />
                  <label htmlFor={`condition-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </ExpandableSection>

          <ExpandableSection title="Region">
            <div className="space-y-2">
              {uniqueRegions.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`region-${item}`}
                    name="region"
                    checked={filter.regions.includes(item)}
                    onChange={() => handleRegionChange(item)}
                    className="bg-gray-700 border-gray-600"
                  />
                  <label htmlFor={`region-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </ExpandableSection>

          <div className="flex justify-between items-center">
            <span className="font-medium">Total Sites</span>
            <span className="font-bold">
              {memoizedPanelData?.totalSites || "Loading..."}
            </span>
          </div>

          <div className="space-y-2">
            {memoizedPanelData ? (
              <>
                <SummaryItem
                  label="No Messages 21"
                  value={memoizedPanelData.msg21Count}
                  total={memoizedPanelData.totalSites}
                />
                <SummaryItem
                  label="No Messages 6"
                  value={memoizedPanelData.msg6Count}
                  total={memoizedPanelData.totalSites}
                />
                <SummaryItem
                  label="Light Error"
                  value={memoizedPanelData.lightError}
                  total={memoizedPanelData.totalSites}
                />
                <SummaryItem
                  label="Low Batt AtoN"
                  value={memoizedPanelData.lowBattAtoN}
                  total={memoizedPanelData.totalSites}
                />
                <SummaryItem
                  label="Low Batt Lantern"
                  value={memoizedPanelData.lowBattLant}
                  total={memoizedPanelData.totalSites}
                />
                <SummaryItem
                  label="Bad LDR"
                  value={memoizedPanelData.badLDR}
                  total={memoizedPanelData.totalSites}
                />
                <SummaryItem
                  label="Off Position"
                  value={memoizedPanelData.offPos}
                  total={memoizedPanelData.totalSites}
                />
              </>
            ) : (
              <p>Loading summary data...</p>
            )}
          </div>
        </div>
        <button
          className="absolute bottom-2 right-2 bg-red-500 rounded-xl w-7 h-7 border-2 border-white hover:bg-red-400 flex items-center justify-center"
          onClick={() =>
            setToggles({
              ...toggles,
              atonSummaryPanel: !toggles.atonSummaryPanel,
            })
          }
        ></button>
      </div>
    </Draggable>
  );
}

/**
 * The type `SummaryItemProps` defines props for a component that displays a label, value, and total as
 * strings.
 * @property {string} label - The `label` property in the `SummaryItemProps` type represents a string
 * value that describes the label or name associated with a particular summary item.
 * @property {number} value - The `value` property in the `SummaryItemProps` type represents a specific
 * numerical value related to the summary item.
 * @property {number} total - The `total` property in the `SummaryItemProps` type represents the total
 * value or amount associated with the summary item. It is a number type, indicating the overall total
 * value that the summary item is a part of.
 */
type SummaryItemProps = {
  label: string;
  value: number;
  total: number;
};

function SummaryItem({ label, value, total }: SummaryItemProps) {
  const percentage = ((value / total) * 100).toFixed(2);
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{value}</span>
        <span
          className={`text-${parseFloat(percentage) > 0 ? "blue" : "red"}-400`}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
}
