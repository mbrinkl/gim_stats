import { IconSettings, IconCheck } from "@tabler/icons-react";
import { SortMethod, sortMethodSchema } from "../types";
import { Link as RouterLink } from "@tanstack/react-router";
import { ActionIcon, Menu } from "@mantine/core";

interface SettingsMenuSortItemProps {
  value: SortMethod;
  selectedValue: SortMethod;
  displayText: string;
  onSelect: (value: SortMethod) => void;
}

const SettingsMenuSortItem = (props: SettingsMenuSortItemProps) => {
  const isSelected = props.value === props.selectedValue;
  return (
    <Menu.Item
      rightSection={isSelected && <IconCheck />}
      onClick={() => props.onSelect(props.value)}
      style={{ textTransform: "capitalize" }}
    >
      {props.displayText}
    </Menu.Item>
  );
};

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

        {[sortMethods.default, sortMethods.alphabetical, sortMethods.by_count].map((sortMethod) => (
          <SettingsMenuSortItem
            value={sortMethod}
            selectedValue={props.sortMethod}
            onSelect={onChangeSortMethod}
            displayText={sortMethod.toString().replace("_", " ")}
          />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
