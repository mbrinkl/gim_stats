import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, FormControl, FormHelperText, IconButton, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MAX_NUM_USERNAMES, MIN_NUM_USERNAMES, USERNAME_REGEX } from "../config";

const ZzInput = (props: { value: string; onChange: (value: string) => void; onDelete: () => void }) => {
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!USERNAME_REGEX.test(value)) {
      setError("invalid");
    } else {
      setError("");
    }
    props.onChange(e.target.value);
  };

  return (
    <Flex gap="1rem" alignItems="center" justify="center">
      <FormControl>
        <Input value={props.value} onChange={onChange} isRequired maxLength={12} />
        {error && <FormHelperText color="red">{error}</FormHelperText>}
      </FormControl>
      <IconButton aria-label="delete" icon={<DeleteIcon />} onClick={props.onDelete} colorScheme="red" />
    </Flex>
  );
};

export const UsernameInputs = (props: { usernames: string[]; onSubmit: (usernames: string[]) => void }) => {
  const [usernames, setUsernames] = useState(props.usernames);
  const [error, setError] = useState("");

  const onUsernameChange = (value: string, index: number) => {
    setUsernames((prev) => prev.map((u, i) => (i === index ? value : u)));
  };

  const onAddClick = () => {
    setUsernames((prev) => [...prev, ""]);
  };

  const onDeleteClick = (index: number) => {
    if (usernames.length === MIN_NUM_USERNAMES) {
      setUsernames((prev) => prev.map((u, i) => (i === index ? "" : u)));
    } else {
      setUsernames((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasDuplicates = new Set(usernames).size !== usernames.length;
    if (hasDuplicates) {
      setError("duplicates");
    } else {
      setError("");
      props.onSubmit(usernames);
    }
  };

  const isAddDisabled: boolean = usernames.length === MAX_NUM_USERNAMES;
  const isSubmitDisabled: boolean = usernames.some((u) => !u || !USERNAME_REGEX.test(u));

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Flex direction="column" gap="1rem">
          {usernames.map((u, index) => (
            <ZzInput
              key={index}
              value={u}
              onChange={(value) => onUsernameChange(value, index)}
              onDelete={() => onDeleteClick(index)}
            />
          ))}
          <Text color="red">{error}</Text>
        </Flex>
        <Flex justify="space-between">
          <Button leftIcon={<AddIcon />} onClick={onAddClick} isDisabled={isAddDisabled} colorScheme="blue">
            Add Username
          </Button>
          <Button type="submit" isDisabled={isSubmitDisabled} colorScheme="green">
            Done
          </Button>
        </Flex>
      </form>
    </Container>
  );
};
