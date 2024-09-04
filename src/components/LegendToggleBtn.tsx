import { useAtonStore } from "../store/store";
import { IoHelpBuoy } from "react-icons/io5";

const LegendToggleBtn = () => {
  const { toggles, setToggles } = useAtonStore();

  return (
    <button
      className="bg-red-900 absolute bottom-4 right-4 items-center border-2 rounded-full p-1"
      onClick={() =>
        setToggles({
          ...toggles,
          legend: true,
          legendToggleBtn: false,
        })
      }
    >
      <IoHelpBuoy fontSize={10} />
    </button>
  );
};

export default LegendToggleBtn;
