import { Fragment } from "react";
import { useAtonStore } from "../store/store";
import { IoMdClose } from "react-icons/io";
import { Select, SelectButton, SelectList, SelectOption } from '@saas-ui/react'
import { Image, HStack, MenuDivider } from '@chakra-ui/react'


const AtonSummary = () => {
  const { toggles, setToggles } = useAtonStore();

  const atonSummaryInfoData = {
    atonType: ["Beacon", "Buoy", "Lighthouse"],
    regions: ["North (144)", "South (64)", "East (161)", "West (129)", "Borneo (6)"],
    atonDetails: [
      { title: "Total Sites", unit: 504 },
      { title: "No Messages 21", unit: 13, percentage: 2.71 },
      { title: "No Messages 6", unit: 13, percentage: 2.71 },
      { title: "Light Error", unit: 1, percentage: 0.21 },
      { title: "Low Batt AtoN", unit: 13, percentage: 2.71 },
      { title: "Low Batt Lantern", unit: 50, percentage: 10.42 },
      { title: "Bad LDR", unit: 26, percentage: 5.42 },
      { title: "Off Position", unit: 7, percentage: 1.46 },
    ],
  };

  return (
    <aside className="relative min-w-max opacity-90 z-10 text-white p-6 rounded-lg shadow-lg max-w-xs"style={{ backgroundColor: '#1D232C' }}>
      <IoMdClose
        className="absolute top-2 right-2 hover:cursor-pointer hover:scale-110 transition-transform duration-300"
        fontSize={24}
        onClick={() =>
          setToggles({
            ...toggles,
            atonSummary: false,
            atonSummaryToggleBtn: true,
          })
        }
      />
      <div className="flex gap-10 justify-between items-center mb-4">
        <div className="w-auto">
          <h2 className="text-xl whitespace-nowrap">
            AtoN Summary
            <span className="text-sm pl-2 whitespace-nowrap">
            ({new Date().toLocaleDateString()})
            </span>
          </h2>
        </div>
      </div>
      <div className="flex items-center mb-2">
      <p className="my-2 font-semibold">Structure</p>
        <Select name="structure" placeholder="" >
          <SelectButton />
          <SelectList bg="#2D3748">
            <SelectOption value="Beacon">Beacon</SelectOption>
            <SelectOption value="Buoy">Buoy</SelectOption>
            <SelectOption value="Lighthouse">Lighthouse</SelectOption>
          </SelectList>
        </Select>
      </div>
      
     
      <div className="flex items-center mb-2">
      <p className="my-2 font-semibold">Condition</p>
        <Select name="condition" placeholder="">
          <SelectButton />
          <SelectList>
            <SelectOption value="Good">Good</SelectOption>
            <SelectOption value="Not Good">Not Good</SelectOption>
          </SelectList>
        </Select>
      </div>
  
      <div className="flex items-center mb-2">
      <p className="my-2 font-semibold">Region  </p>
        <Select name="region" placeholder="Select Region">
          <SelectButton />
          <SelectList>
            <SelectOption value="North"> North (144)</SelectOption>
            <SelectOption value="South"> South (64)</SelectOption>
            <SelectOption value="East"> East (161)</SelectOption>
            <SelectOption value="West"> West (129)</SelectOption>
            <SelectOption value="Borneo">Borneo (6)</SelectOption>
          </SelectList>
        </Select>
      </div>

      <hr className="my-2 border-gray-600" />
      <div className="mb-4 text-sm">
        {atonSummaryInfoData.atonDetails.map((info, index) => (
          <Fragment key={index + 1}>
            <div className="flex gap-4">
              <p
                className="flex-1 whitespace-nowrap"
                onClick={() => setSelectedAton("Buoy")}
              >
                {info.title}
              </p>
              <p className="text-right whitespace-nowrap">{info.unit}</p>
              <p className={`whitespace-nowrap ${info.percentage > 5 ? 'text-red-500' : 'text-blue-500'}`}>{info.percentage}%</p>
            </div>
            {index < atonSummaryInfoData.atonDetails.length - 1 && (
              <hr className="my-2 border-gray-600" />
            )}
          </Fragment>
        ))}
        <button
          className="absolute bottom-2 right-2 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() =>
            setToggles({
              ...toggles,
              messageCountOverview: !toggles.messageCountOverview,
            })
          }
        >
          <span className="text-white">+</span>
        </button>
      </div>
    </aside>
  );
};

export default AtonSummary;