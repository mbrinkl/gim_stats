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
import { SortMethod, sortMethodSchema } from "../types";
import { Link as RouterLink } from "@tanstack/react-router";

interface SettingsMenuProps {
  sortMethod: SortMethod;
  onSortMethodChange: (sortMethod: SortMethod) => void;
}

export const SettingsMenu = (props: SettingsMenuProps) => {
  const onChangeSortMethod = (val: string | string[]) => {
    props.onSortMethodChange(val as SortMethod);
  };

  const sortMethods = sortMethodSchema.removeCatch().enum;

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<SettingsIcon />} aria-label="settings-button" />
      <MenuList>
        <MenuItem as={RouterLink} to="/edit" search={true}>
          Change Usernames
        </MenuItem>
        <MenuDivider />
        <MenuOptionGroup title="Sort" type="radio" value={props.sortMethod} onChange={onChangeSortMethod}>
          <MenuItemOption value={sortMethods.default}>Default</MenuItemOption>
          <MenuItemOption value={sortMethods.alphabetical}>Alphabetical</MenuItemOption>
          <MenuItemOption value={sortMethods.by_count}>By Combined Count</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
