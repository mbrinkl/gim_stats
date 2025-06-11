import { IconSettings, IconCheck } from "@tabler/icons-react";
import { SortMethod, sortMethodSchema } from "../types";
import { Link as RouterLink } from "@tanstack/react-router";
import { ActionIcon, Menu } from "@mantine/core";

// interface SettingsMenuSortItemProps {
//   value: SortMethod;
//   selectedValue: SortMethod;
//   displayText: string;
//   onSelect: () => void
// }

// const SettingsMenuSortItem = (props: SettingsMenuSortItemProps) => {
//   return         <Menu.Item rightSection={<CheckIcon />} onClick={() => onChangeSortMethod(sortMethods.by_count)}>
//           {props.displayText}
//         </Menu.Item>
// }

interface SettingsMenuProps {
  sortMethod: SortMethod;
  onSortMethodChange: (sortMethod: SortMethod) => void;
}

export const SettingsMenu = (props: SettingsMenuProps) => {
  const onChangeSortMethod = (sortMethod: SortMethod) => {
    props.onSortMethodChange(sortMethod);
  };

  const sortMethods = sortMethodSchema.removeCatch().enum;

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon aria-label="settings-button" size="lg" color="gray">
          <IconSettings />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={RouterLink} to="/edit" search={true}>
          Change Usernames
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Sort</Menu.Label>

        <Menu.Item rightSection={<IconCheck />} onClick={() => onChangeSortMethod(sortMethods.default)}>
          Default
        </Menu.Item>
        <Menu.Item rightSection={<IconCheck />} onClick={() => onChangeSortMethod(sortMethods.alphabetical)}>
          Alphabetical
        </Menu.Item>
        <Menu.Item rightSection={<IconCheck />} onClick={() => onChangeSortMethod(sortMethods.by_count)}>
          By Combined Count
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
