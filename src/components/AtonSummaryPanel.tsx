/* The above code is a TypeScript React component called `AtonSummaryPanel`. */
/* The above code is a TypeScript React component called `AtonSummaryPanel`. */
import { useEffect, useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useAtonStore } from '../store/store'
import { AtonData, AtonType, Region } from '../declarations/types/types'
import { fetchAtonData } from '../api/aton-api'
import DateSelector from './DateSelector'

export default function AtonSummaryPanel() {
  const {
    toggles,
    setToggles,
    atonData,
    setAtonData,
    filterState,
    setFilterState,
  } = useAtonStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleDateChange = async (dateOption: { selectDate: string }) => {
    try {
      const data = await fetchAtonData(dateOption);
      setAtonData(data);
    } catch (error) {
      console.error('Error fetching AtoN data:', error);
    }
  };

  useEffect(() => {
    fetchAtonData();
  }, []);

  const filteredPanelData = useMemo(() => {
    if (!atonData) return null;

    return atonData.filter((item: AtonData) => {
      const structureMatch = filterState.selectedStructures.includes('All') || filterState.selectedStructures.includes(item.type as AtonType);
      const regionMatch = filterState.selectedRegions.includes('All') || filterState.selectedRegions.includes(item.region as Region);
      let conditionMatch = true;
      if (filterState.condition === 'Good') {
        conditionMatch = item.healthStatus === 1;
      } else if (filterState.condition === 'Not Good') {
        conditionMatch = item.healthStatus === 0;
      }
      return structureMatch && regionMatch && conditionMatch;
    });
  }, [atonData, filterState]);

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
    if (structure === 'All') {
      setFilterState({
        ...filterState,
        selectedStructures: ['All']
      });
    } else {
      let newSelectedStructures = filterState.selectedStructures.includes('All')
        ? []
        : [...filterState.selectedStructures];

      if (newSelectedStructures.includes(structure)) {
        newSelectedStructures = newSelectedStructures.filter(item => item !== structure);
      } else {
        newSelectedStructures.push(structure);
      }

      setFilterState({
        ...filterState,
        selectedStructures: newSelectedStructures.length === 0 ? ['All'] : newSelectedStructures
      });
    }
  }

  const handleRegionChange = (region: string) => {
    if (region === 'All') {
      setFilterState({
        ...filterState,
        selectedRegions: ['All']
      });
    } else {
      let newSelectedRegions = filterState.selectedRegions.includes('All')
        ? []
        : [...filterState.selectedRegions];

      if (newSelectedRegions.includes(region)) {
        newSelectedRegions = newSelectedRegions.filter(item => item !== region);
      } else {
        newSelectedRegions.push(region);
      }

      setFilterState({
        ...filterState,
        selectedRegions: newSelectedRegions.length === 0 ? ['All'] : newSelectedRegions
      });
    }
  }

  const handleConditionChange = (newCondition: "All" | "Good" | "Not Good") => {
    setFilterState({
      ...filterState,
      condition: newCondition,
    });
  };

  const ExpandableSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
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
    <div className="aton-summary-panel">
      <DateSelector onDateChange={handleDateChange} />
      <div className="bg-gray-900 text-white p-4 rounded-lg w-80 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">AtoN Summary</h2>
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
          <ExpandableSection title='Structure'>
            <div className="space-y-2">
              {uniqueStructures.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id={`structure-${item}`} 
                    name="structure"
                    checked={filterState.selectedStructures.includes(item)}
                    onChange={() => handleStructureChange(item)}
                    className="bg-gray-700 border-gray-600"
                  />
                  <label htmlFor={`structure-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </ExpandableSection>
          

          <ExpandableSection title='Condition'>
            <div className="space-y-2">
              {["All", "Good", "Not Good"].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`condition-${item}`}
                    name="condition"
                    checked={filterState.condition === item}
                    onChange={() =>
                      handleConditionChange(item as "All" | "Good" | "Not Good")
                    }
                    className="bg-gray-700 border-gray-600"
                  />
                  <label htmlFor={`condition-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </ExpandableSection>

          <ExpandableSection title='Region'>
            <div className="space-y-2">
              {uniqueRegions.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id={`region-${item}`} 
                    name="region"
                    checked={filterState.selectedRegions.includes(item)}
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
              atonMessageCountOverview: !toggles.atonMessageCountOverview,
            })
          }
        ></button>
      </div>
    </div>
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
