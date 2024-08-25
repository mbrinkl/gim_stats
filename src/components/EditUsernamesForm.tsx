import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormHelperText, IconButton, Input } from "@chakra-ui/react";
import { MAX_NUM_USERNAMES, MIN_NUM_USERNAMES } from "../config";
import { Link as RouterLink } from "@tanstack/react-router";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema, EditFormSchema } from "../types";

interface EditUsernamesFormProps {
  usernames: string[];
  onSubmit: (usernames: string[]) => void;
}

export const EditUsernamesForm = (props: EditUsernamesFormProps) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    trigger,
  } = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: { playerNames: props.usernames.map((u) => ({ value: u })) },
    mode: "onChange",
  });

  const { fields, append, remove, update } = useFieldArray<EditFormSchema>({
    control,
    name: "playerNames",
  });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Flex direction="column" justifyContent="center" gap="1rem">
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
                  onChange: () => {
                    // Trigger non-empty fields to revalidate duplicate values
                    const nonEmptyFieldIndicies = fields
                      .map((playerName, index) => (playerName.value ? `playerNames.${index}` : null))
                      .filter((v) => v !== null);

                    trigger(nonEmptyFieldIndicies as `playerNames.${number}`[]);
                  },
                })}
              />
              {errors.playerNames?.[index]?.value?.message && (
                <FormHelperText color="red.500">{errors.playerNames[index].value.message}</FormHelperText>
              )}
            </FormControl>
            <IconButton aria-label="delete" icon={<DeleteIcon />} onClick={() => onDeleteClick(index)} />
          </Flex>
        ))}
        {fields.length < MAX_NUM_USERNAMES && (
          <Button leftIcon={<AddIcon />} onClick={onAddClick} colorScheme="green" tabIndex={0}>
            Add Username
          </Button>
        )}
        <Flex justify="space-between" align="center">
          <Button as={RouterLink} to="/" search={true} colorScheme="red">
            Cancel
          </Button>
          <Button type="submit" isDisabled={!isValid} colorScheme="blue">
            Done
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
