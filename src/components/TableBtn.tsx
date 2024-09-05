import { CiViewTable } from "react-icons/ci";

function TableBtn({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <button
      className="flex items-center text-blue-400 hover:text-blue-300  justify-center rounded-full p-2 transition-all duration-200"
      onClick={onClick}
    >
      <CiViewTable fontSize={25} />
    </button>
  );
}

export default TableBtn;
