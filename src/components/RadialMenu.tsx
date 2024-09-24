import { Menu, MenuItem } from "@spaceymonk/react-radial-menu";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsFileBarGraph } from "react-icons/bs";
import { useAtonStore } from "../store/store";

export type RadialMenuProps = null | {
  mmsi: number;
  position: [x: number, y: number];
};

function RadialMenu(props: RadialMenuProps) {
  const { toggles, setToggles } = useAtonStore();

  const menuItems = [
    {
      title: "Graph",
      icon: <BsFileBarGraph />,
      onClick: () => setToggles({ ...toggles, graph: true, radialMenu: false }),
    },
    {
      title: "Info",
      icon: <BiMessageAltDetail />,
      onClick: () =>
        setToggles({ ...toggles, clickInfo: true, radialMenu: false }),
    },
  ];

  if (!props) return;

  return (
    <Menu
      centerX={props.position[0]}
      centerY={props.position[1]}
      innerRadius={10}
      outerRadius={40}
      animation={["fade", "scale"]}
      animationTimeout={150}
      drawBackground
      show={toggles.radialMenu}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.title} onItemClick={item.onClick} data={item.title}>
          {item.icon}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default RadialMenu;
