import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { MAX_NUM_USERNAMES, MIN_NUM_USERNAMES } from "../config";
import { Link as RouterLink } from "@tanstack/react-router";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema, EditFormSchema } from "../types";
import { useEffect, useState } from "react";
import { useFetchGroupMutation } from "../api";

interface EditUsernamesFormProps {
  usernames: string[];
  onSubmit: (usernames: string[]) => void;
}

export const EditUsernamesForm = (props: EditUsernamesFormProps) => {
  const [isNavLoading, setIsNavLoading] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: { formType: "usernames", playerNames: props.usernames.map((u) => ({ value: u })) },
    mode: "onChange",
  });

  const formType = watch("formType");

  const { fields, append, remove, update } = useFieldArray<EditFormSchema>({
    control,
    name: "playerNames",
  });

  const { mutate: fetchGroup, isError } = useFetchGroupMutation(props.onSubmit);
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        id: "get_group_error_toast",
        title: "Error.",
        description: "Unable to fetch usernames for group",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError, toast]);

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

  const onSubmit: SubmitHandler<EditFormSchema> = (e) => {
    setIsNavLoading(true);
    if (e.formType === "groupname") {
      fetchGroup(e.groupname);
    } else {
      props.onSubmit(e.playerNames.map((u) => u.value));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Flex direction="column" justifyContent="center" gap="1rem">
        <Controller
          name="formType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name={field.name}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
              }}
            >
              <HStack gap="1rem">
                <Radio value="usernames">Usernames</Radio>
                <Radio value="groupname">Group Name</Radio>
              </HStack>
            </RadioGroup>
          )}
        />
        {formType === "groupname" && <Input {...register("groupname")} />}
        {formType === "usernames" && (
          <>
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
                  {(errors as any).playerNames?.[index]?.value?.message && (
                    <FormHelperText color="red.500">{(errors as any).playerNames[index].value.message}</FormHelperText>
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
          </>
        )}
        <Flex justify="space-between" align="center">
          <Button as={RouterLink} to="/" search={true} colorScheme="red">
            Cancel
          </Button>
          <Button type="submit" isDisabled={!isValid} colorScheme="blue" isLoading={isNavLoading}>
            Done
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
