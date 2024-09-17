import { useEffect, useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useAtonStore } from '../store/store'

export default function AtonSummaryPanel() {
  const { toggles, setToggles, atonSummary, fetchAtonSummary, filterState, setFilterState } = useAtonStore();
  
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    fetchAtonSummary();
  }, [fetchAtonSummary]);

  const filteredAtonSummary = useMemo(() => {
    if (!atonSummary) return null;

    return atonSummary.filter(item => {
      const structureMatch = filterState.selectedStructure === 'All' || filterState.selectedStructure === item.type;
      const regionMatch = filterState.selectedRegion === 'All' || filterState.selectedRegion === item.region;
      let conditionMatch = true;
      if (filterState.condition === 'Good') {
        conditionMatch = item.health_OKNG === 1;
      } else if (filterState.condition === 'Not Good') {
        conditionMatch = item.health_OKNG === 0;
      }
      return structureMatch && regionMatch && conditionMatch;
    });
  }, [atonSummary, filterState]);

  const summaryData = useMemo(() => {
    if (!filteredAtonSummary) return null;

    const totalSites = filteredAtonSummary.length;
    const noMessages21 = filteredAtonSummary.filter(item => item.cnt_msg21 === 0).length;
    const noMessages6 = filteredAtonSummary.filter(item => item.cnt_msg6 === 0).length;
    const lightError = filteredAtonSummary.filter(item => item.last_light === 0).length;
    const lowBattAtoN = filteredAtonSummary.filter(item => item.last_BattAton < 12).length;
    const lowBattLantern = filteredAtonSummary.filter(item => item.last_BattLant < 12).length;
    const badLDR = filteredAtonSummary.filter(item => item.LDR_OKNG === 0).length;
    const offPosition = filteredAtonSummary.filter(item => item.off_pos_OKNG === 1).length;

    return {
      totalSites,
      noMessages21,
      noMessages6,
      lightError,
      lowBattAtoN,
      lowBattLantern,
      badLDR,
      offPosition
    };
  }, [filteredAtonSummary]);

  const uniqueStructures = useMemo(() => {
    if (!atonSummary) return [];
    return ['All', ...Array.from(new Set(atonSummary.map(item => item.type)))];
  }, [atonSummary]);

  const uniqueRegions = useMemo(() => {
    if (!atonSummary) return [];
    return ['All', ...Array.from(new Set(atonSummary.map(item => item.region)))];
  }, [atonSummary]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleStructureChange = (structure: string) => {
    setFilterState({ selectedStructure: structure });
  }

  const handleRegionChange = (region: string) => {
    setFilterState({ selectedRegion: region });
  }

  const handleConditionChange = (newCondition: 'All' | 'Good' | 'Not Good') => {
    setFilterState({ condition: newCondition });
  }

  const renderExpandableSection = (title: string, content: React.ReactNode) => (
    <div>
      <button
        className="w-full flex justify-between items-center py-2"
        onClick={() => toggleSection(title)}
        aria-expanded={expandedSection === title}
        aria-controls={`${title.toLowerCase()}-content`}
      >
        <span className="font-medium">{title}</span>
        {expandedSection === title ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expandedSection === title && (
        <div id={`${title.toLowerCase()}-content`} className="mt-2 space-y-2">
          {content}
        </div>
      )}
    </div>
  )

  return (
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
        {renderExpandableSection('Structure', (
          <div className="space-y-2">
            {uniqueStructures.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id={`structure-${item}`} 
                  name="structure"
                  checked={filterState.selectedStructure === item}
                  onChange={() => handleStructureChange(item)}
                  className="bg-gray-700 border-gray-600" 
                />
                <label htmlFor={`structure-${item}`}>{item}</label>
              </div>
            ))}
          </div>
        ))}

        {renderExpandableSection('Condition', (
          <div className="space-y-2">
            {['All', 'Good', 'Not Good'].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id={`condition-${item}`} 
                  name="condition" 
                  checked={filterState.condition === item}
                  onChange={() => handleConditionChange(item as 'All' | 'Good' | 'Not Good')}
                  className="bg-gray-700 border-gray-600" 
                />
                <label htmlFor={`condition-${item}`}>{item}</label>
              </div>
            ))}
          </div>
        ))}

        {renderExpandableSection('Region', (
          <div className="space-y-2">
            {uniqueRegions.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id={`region-${item}`} 
                  name="region"
                  checked={filterState.selectedRegion === item}
                  onChange={() => handleRegionChange(item)}
                  className="bg-gray-700 border-gray-600" 
                />
                <label htmlFor={`region-${item}`}>{item}</label>
              </div>
            ))}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <span className="font-medium">Total Sites</span>
          <span className="font-bold">{summaryData?.totalSites || 'Loading...'}</span>
        </div>

        <div className="space-y-2">
          {summaryData ? (
            <>
              <SummaryItem label="No Messages 21" value={summaryData.noMessages21} total={summaryData.totalSites} />
              <SummaryItem label="No Messages 6" value={summaryData.noMessages6} total={summaryData.totalSites} />
              <SummaryItem label="Light Error" value={summaryData.lightError} total={summaryData.totalSites} />
              <SummaryItem label="Low Batt AtoN" value={summaryData.lowBattAtoN} total={summaryData.totalSites} />
              <SummaryItem label="Low Batt Lantern" value={summaryData.lowBattLantern} total={summaryData.totalSites} />
              <SummaryItem label="Bad LDR" value={summaryData.badLDR} total={summaryData.totalSites} />
              <SummaryItem label="Off Position" value={summaryData.offPosition} total={summaryData.totalSites} />
            </>
          ) : (
            <p>Loading summary data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, total }: { label: string; value: number; total: number }) {
  const percentage = ((value / total) * 100).toFixed(2);
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{value}</span>
        <span className={`text-${parseFloat(percentage) > 0 ? 'blue' : 'red'}-400`}>{percentage}%</span>
      </div>
    </div>
  );
}
