import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { ActionIcon, Button, Flex, Radio, TextInput } from "@mantine/core";
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
  // const toast = useToast();

  // useEffect(() => {
  //   if (isError) {
  //     toast({
  //       id: "get_group_error_toast",
  //       title: "Error.",
  //       description: "Unable to fetch usernames for group",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // }, [isError, toast]);

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
      <Flex direction="column" justify="center" gap="1rem">
        <Controller
          name="formType"
          control={control}
          render={({ field }) => (
            <Radio.Group
              name={field.name}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
              }}
            >
              <Flex gap="1rem">
                <Radio value="usernames" label="Usernames" />
                <Radio value="groupname" label="Group Name" />
              </Flex>
            </Radio.Group>
          )}
        />
        {formType === "groupname" && (
          <TextInput
            w="100%"
            maxLength={12}
            required
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...register("groupname")}
          />
        )}
        {formType === "usernames" && (
          <>
            {fields.map((u, index) => (
              <Flex key={u.id} gap="1rem" align="center" justify="center">
                <TextInput
                  w="100%"
                  maxLength={12}
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  {...register(`playerNames.${index}.value`, {
                    onChange: () => {
                      // Trigger non-empty fields to revalidate duplicate values
                      const nonEmptyFieldIndicies = fields
                        .map((playerName, index) => (playerName.value ? `playerNames.${index}` : null))
                        .filter((v) => v !== null);

                      trigger(nonEmptyFieldIndicies as `playerNames.${number}`[]);
                    },
                  })}
                  error={
                    (errors as any).playerNames?.[index]?.value?.message &&
                    (errors as any).playerNames[index].value.message
                  }
                />
                <ActionIcon aria-label="delete" onClick={() => onDeleteClick(index)} size="md">
                  <DeleteIcon />
                </ActionIcon>
              </Flex>
            ))}
            {fields.length < MAX_NUM_USERNAMES && (
              <Button leftSection={<AddIcon />} onClick={onAddClick} color="green" tabIndex={0}>
                Add Username
              </Button>
            )}
          </>
        )}
        <Flex justify="space-between" align="center">
          <Button component={RouterLink} to="/" search={true} color="red">
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid} color="blue" loading={isNavLoading}>
            Done
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
