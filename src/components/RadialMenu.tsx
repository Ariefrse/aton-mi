import { BiMessageAltDetail } from "react-icons/bi";
import { BsFileBarGraph } from "react-icons/bs";
import { useAtonStore } from "../store/store";

export type RadialMenuProps = null | {
  position: {
    x: number;
    y: number;
  };
};

function RadialMenu(props: RadialMenuProps) {
  const { toggles, setToggles } = useAtonStore();

  const menuItems = [
    {
      title: "Graph",
      icon: <BsFileBarGraph />,
      onClick: () => setToggles({ ...toggles, graph: !toggles.graph }),
    },
    {
      title: "Info",
      icon: <BiMessageAltDetail />,
      onClick: () => setToggles({ ...toggles, atonInfo: !toggles.atonInfo }),
    },
  ];

  return (
    <div
      className="absolute bg-gray-700 p-2 rounded"
      style={{
        left: props?.position?.x! + 10,
        top: props?.position?.y! + 10,
        pointerEvents: "none",
      }}
    >
      <p>Radial menu to be .... </p>
    </div>
  );
}

export default RadialMenu;
