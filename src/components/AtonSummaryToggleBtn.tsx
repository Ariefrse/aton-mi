import { FC } from "react";
import { HiAdjustments } from "react-icons/hi";

type AtonSummaryToggleBtnProps = {
  onClick?: () => void;
};

const AtonSummaryToggleBtn: FC<AtonSummaryToggleBtnProps> = ({ onClick }) => {
  return (
    <button
      className="bg-red-900 absolute top-4 left-4 items-center border-2 rounded-full p-1"
      onClick={onClick}
    >
      <HiAdjustments fontSize={25} />
    </button>
  );
};

export default AtonSummaryToggleBtn;
