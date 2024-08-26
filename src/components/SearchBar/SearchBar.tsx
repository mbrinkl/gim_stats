import { CloseIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  const onClearSearch = () => {
    props.onChange("");
  };

  return (
    <InputGroup size="md">
      <Input placeholder="Search" onChange={onSearch} value={props.value} />
      {props.value && (
        <InputRightElement>
          <IconButton size="xs" aria-label="clear-search" icon={<CloseIcon />} onClick={onClearSearch} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
