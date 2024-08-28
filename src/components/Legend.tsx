import { IoMdCheckmarkCircle, IoMdClose } from "react-icons/io";
import { useAtonStore } from "../store/store";
import { AtonType, Status } from "../declarations/types/types";

const Legend = () => {
  const legendItems = [
    { color: "green", device: "Beacon", status: "Good" },
    { color: "blue", device: "Buoy", status: "Good" },
    { color: "pink", device: "Lighthouse", status: "Good" },
    { color: "yellow", device: "Beacon", status: "NG" },
    { color: "orange", device: "Buoy", status: "NG" },
    { color: "red", device: "Lighthouse", status: "NG" },
  ];

  function mapColor(device: AtonType, status: Status) {
    switch (device) {
      case "Beacon":
        return status === "Good" ? "text-green-500" : "text-yellow-500";
      case "Buoy":
        return status === "Good" ? "text-blue-200" : "text-orange-500";
      case "Lighthouse":
        return status === "Good" ? "text-purple-500" : "text-red-500";
      default:
        return "gray";
    }
  }

  const { toggles, setToggles } = useAtonStore();

  return (
    <div className=" absolute bottom-2 right-2">
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
            Legend <br /> <span className="text-base text-gray-400">AtoN</span>
          </p>
          {legendItems.map((item, index) => (
            <p
              key={index + 1}
              className="px-2 flex gap-2 items-center text-gray-400 my-2 rounded-full"
            >
              <IoMdCheckmarkCircle
                fontSize={20}
                className={mapColor(item.device, item.status)}
              />{" "}
              {item.device + " - " + item.status}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legend;
