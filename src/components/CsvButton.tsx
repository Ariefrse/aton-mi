import { FC } from "react";
import { BiDownload } from "react-icons/bi";

type CsvButtonProps = {
  onClick?: () => void;
}

const CsvButton: FC<CsvButtonProps> = ({ onClick }) => {
  return (
    <button className="flex gap-2 items-center border-white border-2 rounded-xl p-1" onClick={onClick}>
      <BiDownload fontSize={25} />
      <p>CSV</p>
    </button>
  );
}

export default CsvButton