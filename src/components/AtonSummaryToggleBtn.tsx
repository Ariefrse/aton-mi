import { useAtonStore } from "../store/store";
import { HiAdjustments } from "react-icons/hi";

const AtonSummaryToggleBtn = () => {
  const { toggles, setToggles } = useAtonStore();

  return (
    <button
      className="bg-red-900 absolute top-4 left-4 items-center border-2 rounded-full p-1"
      onClick={() =>
        setToggles({
          ...toggles,
          atonSummaryPanel: true,
          atonSummaryToggleBtn: false,
          atonMessageCountOverview: false,
        })
      }
    >
      <HiAdjustments fontSize={25} />
    </button>
  );
};

export default AtonSummaryToggleBtn;
