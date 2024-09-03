import { BackspaceIcon } from "@heroicons/react/20/solid";
import CsvButton from "./CsvButton";
// import DropDownMenu from "./DropDownMenu";
// import TextInput from "./TextInput";
import CloseButton from "./CloseButton";
import { useAtonStore } from "../store/store";

const TableOptions = () => {
  const { toggles, setToggles } = useAtonStore();

  return (
    <>
      <h1 className="text-xl">AtoN Analytics</h1>
      {/* <DropDownMenu />
      <DropDownMenu />
      <TextInput /> */}
      {/* <BackspaceIcon className="w-10 h-10" /> */}
      {/* <div className="flex justify-center gap-2 items-center">
        <p>From</p>
        <input className="rounded-md text-gray-500 p-1" type="date" />
      </div>
      <div className="flex justify-center gap-2">
        <p>To</p>
        <input className="rounded-md text-gray-500 p-1" type="date" />
      </div>
      <BackspaceIcon className="w-10 h-10" />
      <CsvButton /> */}
      <div className="flex gap-6 mr-4">
      <CloseButton
        
        onClick={() =>
          setToggles({
            ...toggles,
            tableModule: false,
            tableOptions: false,
            atonSummaryToggleBtn: true,
          })
        }
        />
      </div>
    </>
  );
};

export default TableOptions;
