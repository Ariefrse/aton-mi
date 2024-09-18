import { Diamond, Circle, Square } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { useAtonStore } from "../store/store";
import { AtonStatus } from "../declarations/types/types";

const Legend = () => {
  const { toggles, setToggles } = useAtonStore();

  return (
    <div className="absolute rounded-lg bg-gray-800 opacity-90 bottom-2 right-2 text-white p-4 w-48">
      <IoMdClose
        className="absolute top-2 right-2 hover:cursor-pointer hover:scale-110 transition-transform duration-300"
        fontSize={20}
        onClick={() =>
          setToggles({ ...toggles, legend: false, legendToggleBtn: true })
        }
      />
      <h2 className="text-lg font-semibold mb-2">Legend</h2>
      <div className="mb-4">
        <h3 className="text-sm text-gray-400 mb-2">Structure</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Diamond className="w-4 h-4 mr-2" />
            <span className="text-sm">Beacon</span>
          </div>
          <div className="flex items-center">
            <Circle className="w-4 h-4 mr-2" />
            <span className="text-sm">Buoy</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-2" />
            <span className="text-sm">Lighthouse</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm text-gray-400 mb-2">Status by Color</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Good</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Not Good</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
