import { IoMdClose } from "react-icons/io";
import { useAtonStore } from "../store/store";

export default function Legend(){
  const LEGEND_ITEMS = [
    { shape: "diamond", device: "Beacon" },
    { shape: "circle", device: "Buoy" },
    { shape: "rectangle", device: "Lighthouse" },
  ];

  const STATUS_ITEMS = [
    { color: "#4CAF50", status: "Good" },  // Updated to match ATON_COLORS.GOOD
    { color: "#FF0000", status: "Not Good" },  // Updated to match ATON_COLORS.NOT_GOOD
  ];

  const { toggles, setToggles } = useAtonStore();

  return (
    <div className="absolute rounded-lg bg-gray-900 mb-4 bottom-2 right-2">
      <div className="relative">
        <IoMdClose
          className="absolute top-1 right-2 hover:cursor-pointer hover:scale-110 transition-transform duration-300"
          fontSize={24}
          onClick={() =>
            setToggles({ ...toggles, legend: false, legendToggleBtn: true })
          }
        />
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <p className="text-lg font-bold leading-none mb-4">
            Legend <br /> <span className="text-base text-white">AtoN</span>
          </p>
          <p className="text-sm text-gray-400 mb-2">Structure</p>
          {LEGEND_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className={`w-4 h-4 mr-2 ${
                  item.shape === "diamond"
                    ? "transform rotate-45 border border-white"
                    : item.shape === "circle"
                    ? "rounded-full border border-white"
                    : "border border-white"
                }`}
              ></div>
              <span>{item.device}</span>
            </div>
          ))}
          <p className="text-sm text-gray-400 mb-2">Status (By Color)</p>
          {STATUS_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className={`w-4 h-4 mr-2 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};