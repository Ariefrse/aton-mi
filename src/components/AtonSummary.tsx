import { Fragment, useState } from "react"; // Added useState import
import { useAtonStore } from "../store/store";
import { IoMdClose } from "react-icons/io";
import { AtonType } from "../declarations/types/types";

type AtonSummaryProps = {
  onAtonTypeChange: (type: AtonType) => void;
};

const AtonSummary = ({ onAtonTypeChange }: AtonSummaryProps) => {
  const { toggles, setToggles } = useAtonStore();
  const [selectedTypes, setSelectedTypes] = useState<AtonType[]>([]);

  const handleCheckboxChange = (type: AtonType) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
    onAtonTypeChange(type);
  };

  const atonSummaryInfoData = {
    atonType: ["Buoy", "Lighthouse", "Beacon"],
    atonDetails: [
      { title: "Total Sites", unit: 480 },
      { title: "No Messages", unit: 13, percentage: 1.27 },
      { title: "Light Error", unit: 1, percentage: 13.27 },
      { title: "Low LDR Lantern", unit: 50, percentage: 26.54 },
      { title: "Bad LDR", unit: 26, percentage: 50.14 },
      { title: "Off Position", unit: 7, percentage: 7.14 },
    ],
  };

  return (
    <aside className="relative min-w-max bg-gray-700 opacity-80 z-10 text-white p-10 rounded-lg shadow-lg max-w-xs">
      <IoMdClose
        className="absolute top-1 right-2 hover:cursor-pointer hover:scale-110 transition-transform duration-300"
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
          <h2 className="text-xl font whitespace-nowrap">
            AtoN Summary
            <span className="text-md pl-2 whitespace-nowrap">
              (23/07/2024)
            </span>
          </h2>
        </div>
      </div>
      <hr className="my-2 border-gray-100" />
      <p className="my-2">Structure</p>
      {atonSummaryInfoData.atonType.map((struct, index) => (
        <div key={index + 1} className="flex items-center mb-2">
          <input
            type="checkbox"
            name={struct}
            id={struct}
            onChange={() => handleCheckboxChange(struct.toLowerCase() as AtonType)}
            checked={selectedTypes.includes(struct.toLowerCase() as AtonType)}
          />
          <label className="ml-2">{struct}</label>
        </div>
      ))}
      <hr className="my-2 border-gray-600" />
      <div className="mb-4 text-sm">
        {atonSummaryInfoData.atonDetails.map((info, index) => (
          <Fragment key={index + 1}>
            <div className="flex gap-4">
              <p
                className="flex-1 whitespace-nowrap"
                onClick={() => handleCheckboxChange(info.title.toLowerCase() as AtonType)}
              >
                {info.title}
              </p>
              <p className="text-right whitespace-nowrap">{info.unit}</p>
              <p>{info.percentage}%</p>
            </div>
            {index < atonSummaryInfoData.atonDetails.length - 1 && (
              <hr className="my-2 border-gray-600" />
            )}
          </Fragment>
        ))}
        <button
          className="absolute bottom-2 right-2 bg-gray-100 rounded-md w-6 h-6"
          onClick={() =>
            setToggles({
              ...toggles,
              messageCountOverview: !toggles.messageCountOverview,
            })
          }
        />
      </div>
    </aside>
  );
};

export default AtonSummary;