import { SettingsIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { SortMethod } from "../enums";
import { Link as RouterLink } from "@tanstack/react-router";

interface ISettingsMenuProps {
  sortMethod: SortMethod;
  onSortMethodChange: (sortMethod: SortMethod) => void;
}

export const SettingsMenu = (props: ISettingsMenuProps) => {
  const onChangeSortMethod = (val: string | string[]) => {
    props.onSortMethodChange(val as SortMethod);
  };

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<SettingsIcon />} />
      <MenuList>
        <MenuItem as={RouterLink} to="/edit" search={true}>
          Change Usernames
        </MenuItem>
        <MenuDivider />
        <MenuOptionGroup title="Sort" type="radio" value={props.sortMethod} onChange={onChangeSortMethod}>
          <MenuItemOption value={SortMethod.DEFAULT}>OSRS Default</MenuItemOption>
          <MenuItemOption value={SortMethod.ALPHABETICAL}>Alphabetical</MenuItemOption>
          <MenuItemOption value={SortMethod.BY_COUNT}>By Combined Count</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
