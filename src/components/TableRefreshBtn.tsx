import { RiRefreshLine } from "react-icons/ri";

function TableRefreshBtn(props: { onClick: () => void }) {
  return (
    <div
      className="flex items-center justify-center rounded-full p-2 bg-blue-100 hover:bg-blue-200 transition-all duration-200"
      onClick={() => props.onClick}
    >
      <RiRefreshLine
        fontSize={25}
        className="text-blue-400 hover:cursor-pointer"
      />
    </div>
  );
}

export default TableRefreshBtn;
