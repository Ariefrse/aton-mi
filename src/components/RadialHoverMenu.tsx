import { Menu, MenuItem } from "@headlessui/react";
import { SubMenu } from "@spaceymonk/react-radial-menu";
import { MouseEvent } from "react";

type RadialMenuProps = {
  position: { x: number; y: number };
  show: boolean;
  handleItemClick: (data: string) => void;
  handleDisplayClick: () => void;
  handleSubMenuClick: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    index: number,
    data?: any
  ) => void;
};

function RadialHoverMenu(props: Readonly<RadialMenuProps>) {
  return (
    <Menu
      centerX={props.position.x}
      centerY={props.position.y}
      innerRadius={75}
      outerRadius={150}
      show={props.show}
      animation={["fade", "scale"]}
      animationTimeout={150}
      drawBackground
    >
      {/* Populate your menu here */}
      <MenuItem onItemClick={props.handleItemClick} data="1. Item">
        1. Item
      </MenuItem>
      <SubMenu
        onDisplayClick={props.handleDisplayClick}
        onItemClick={() => props.handleSubMenuClick}
        itemView="2. Sub Menu"
        data="2. Sub Menu"
        displayPosition="bottom"
      >
        <MenuItem onItemClick={props.handleItemClick} data="2.1. Item">
          2.1. Item
        </MenuItem>
        <MenuItem onItemClick={props.handleItemClick} data="2.2. Item">
          2.2. Item
        </MenuItem>
        <MenuItem onItemClick={props.handleItemClick} data="2.3. Item">
          2.3. Item
        </MenuItem>
        <SubMenu
          onDisplayClick={props.handleDisplayClick}
          onItemClick={() => props.handleSubMenuClick}
          itemView="2.4. Sub Menu"
          data="2.4. Sub Menu"
          displayPosition="bottom"
        >
          <MenuItem onItemClick={props.handleItemClick} data="2.4.1. Item">
            2.4.1. Item
          </MenuItem>
          <MenuItem onItemClick={props.handleItemClick} data="2.4.2. Item">
            2.4.2. Item
          </MenuItem>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
}

export default RadialHoverMenu;
