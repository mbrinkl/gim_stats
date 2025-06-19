import { ActionIcon, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

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

  const clearButton = props.value ? (
    <ActionIcon aria-label="clear-search" onClick={onClearSearch} size="sm" color="gray" variant="subtle">
      <IconX />
    </ActionIcon>
  ) : null;

  return <TextInput placeholder="Search" w="100%" rightSection={clearButton} onChange={onSearch} value={props.value} />;
};
