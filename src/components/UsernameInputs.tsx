import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Flex, FormControl, FormHelperText, IconButton, Input } from "@chakra-ui/react";
import { MAX_NUM_USERNAMES, MIN_NUM_USERNAMES } from "../config";
import { Link as RouterLink } from "@tanstack/react-router";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema, EditFormSchema } from "../types";
import { useEffect } from "react";

export const UsernameInputs = (props: { usernames: string[]; onSubmit: (usernames: string[]) => void }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    trigger,
  } = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: { playerNames: props.usernames.map((u) => ({ value: u })) },
  });

  const { fields, append, remove, update } = useFieldArray<EditFormSchema>({
    control,
    name: "playerNames",
  });

  // trigger validation on load for default values
  useEffect(() => {
    trigger("playerNames");
  }, [trigger]);

  const onAddClick = () => {
    append({ value: "" });
  };

  const onDeleteClick = (index: number) => {
    if (fields.length === MIN_NUM_USERNAMES) {
      update(index, { value: "" });
    } else {
      remove(index);
    }
  };

  const onSubmit: SubmitHandler<EditFormSchema> = ({ playerNames }) => {
    props.onSubmit(playerNames.map((u) => u.value));
  };

  const isAddDisabled: boolean = fields.length === MAX_NUM_USERNAMES;
  const isSubmitDisabled: boolean = !isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="1rem">
        {fields.map((u, index) => (
          <Flex key={u.id} gap="1rem" alignItems="start" justify="center">
            <FormControl>
              <Input
                maxLength={12}
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...register(`playerNames.${index}.value`, {
                  // trigger revalidation for duplicate usernames errors
                  onChange: () => trigger("playerNames"),
                })}
              />
              {errors.playerNames?.[index]?.value?.message && (
                <FormHelperText color="red.500">{errors.playerNames[index].value.message}</FormHelperText>
              )}
            </FormControl>
            <IconButton aria-label="delete" icon={<DeleteIcon />} onClick={() => onDeleteClick(index)} />
          </Flex>
        ))}
        <Button leftIcon={<AddIcon />} onClick={onAddClick} isDisabled={isAddDisabled} colorScheme="green" tabIndex={0}>
          Add Username
        </Button>
        {errors.playerNames?.root?.message && (
          <Alert status="error">
            <AlertIcon />
            {errors.playerNames.root.message}
          </Alert>
        )}
        <Flex justify="space-between" align="center">
          <Button as={RouterLink} to="/" search={true} colorScheme="red">
            Cancel
          </Button>
          <Button type="submit" isDisabled={isSubmitDisabled} colorScheme="blue">
            Done
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
