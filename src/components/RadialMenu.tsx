import { Menu, MenuItem } from "@spaceymonk/react-radial-menu";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsFileBarGraph } from "react-icons/bs";
import { useAtonStore } from "../store/store";
import ClickOutside from "./ClickOutside";

export type RadialMenuProps = null | {
  mmsi: number;
  position: [x: number, y: number]
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
    <ClickOutside
      onClickOutside={() => {
        setToggles({ ...toggles, radialMenu: false });
      }}
    >
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
          <MenuItem
            key={item.title}
            onItemClick={() => item.onClick}
            data={item.title}
          >
            {item.icon}
          </MenuItem>
        ))}
      </Menu>
    </ClickOutside>
  );
}

export default RadialMenu;
