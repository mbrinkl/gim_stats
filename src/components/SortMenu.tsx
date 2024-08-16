import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import { SortMethod } from "../enums";

interface ISortMenuProps {
  value: SortMethod;
  onChange: (sortMethod: SortMethod) => void;
}

export const SortMenu = (props: ISortMenuProps) => {
  const onChangeSortMethod = (val: string | string[]) => {
    props.onChange(val as SortMethod);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="6.5rem">
        Sort
      </MenuButton>
      <MenuList>
        <MenuOptionGroup type="radio" value={props.value} onChange={onChangeSortMethod}>
          <MenuItemOption value={SortMethod.DEFAULT}>OSRS Default</MenuItemOption>
          <MenuItemOption value={SortMethod.ALPHABETICAL}>Alphabetical</MenuItemOption>
          <MenuItemOption value={SortMethod.BY_COUNT}>By Combined Count</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
