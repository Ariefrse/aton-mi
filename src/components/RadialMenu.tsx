import { Menu, MenuItem } from "@spaceymonk/react-radial-menu";
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

  if (!props) return null;

  return (
    <Menu
      centerX={props.position.x}
      centerY={props.position.y}
      innerRadius={75}
      outerRadius={150}
      animation={["fade", "scale"]}
      animationTimeout={150}
      drawBackground
      show={toggles.radialMenu}
    >
      {menuItems.map((item) => (
        <MenuItem
          key={item.title}
          onItemClick={() => item.onClick}
          data={item.title}
        >
          {item.icon}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default RadialMenu;
