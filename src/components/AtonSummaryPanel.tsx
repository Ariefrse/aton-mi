import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useAtonStore } from '../store/store'


export default function AtonSummaryPanel() {
  const { toggles, setToggles } = useAtonStore();
  
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [structure, setStructure] = useState(['Beacon', 'Buoy', 'Lighthouse'])
  const [condition, setCondition] = useState('All')
  const [region, setRegion] = useState(['North', 'South', 'East', 'West', 'Borneo'])
  const [isVisible, setIsVisible] = useState(true); // Add state for visibility

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
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
        <h2 className="text-lg font-semibold">AtoN Summary <span className="text-gray-400 text-sm">(23/07/2024)</span></h2>
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
          <div>
            {structure.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <input type="checkbox" id={item} className="rounded bg-gray-700 border-gray-600" />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        ))}

        {renderExpandableSection('Condition', (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="radio" id="good" name="condition" className="bg-gray-700 border-gray-600" />
              <label htmlFor="good">Good</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="notgood" name="condition" className="bg-gray-700 border-gray-600" />
              <label htmlFor="notgood">Not Good</label>
            </div>
          </div>
        ))}

        {renderExpandableSection('Region', (
          <div>
            {region.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <input type="checkbox" id={item} className="rounded bg-gray-700 border-gray-600" />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <span className="font-medium">Total Sites</span>
          <span className="font-bold">504</span>
        </div>

        <div className="space-y-2">
          {[
            { label: 'No Messages 21', value: 13, percentage: '2.71%' },
            { label: 'No Messages 6', value: 13, percentage: '2.71%' },
            { label: 'Light Error', value: 1, percentage: '0.21%' },
            { label: 'Low Batt AtoN', value: 13, percentage: '2.71%' },
            { label: 'Low Batt Lantern', value: 50, percentage: '10.42%' },
            { label: 'Bad LDR', value: 26, percentage: '5.42%' },
            { label: 'Off Position', value: 7, percentage: '1.46%' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <span>{item.label}</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{item.value}</span>
                <span className={`text-${item.percentage.startsWith('-') ? 'red' : 'blue'}-400`}>{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute bottom-2 right-2 bg-red-500 rounded-xl w-7 h-7 border-2 border-white hover:bg-red-400 flex items-center justify-center"
        onClick={() =>
          setToggles({
            ...toggles,
            atonMessageCountOverview: !toggles.atonMessageCountOverview // Toggle the visibility
          })
        }
      >
        <span className="text-white text-xl">+</span>
      </button>
    </div>
    
  )
}
