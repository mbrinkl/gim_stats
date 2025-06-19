import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Flex, Radio, TextInput } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useFetchGroupMutation } from "../api";
import { MAX_NUM_USERNAMES, MIN_NUM_USERNAMES } from "../config";
import { EditFormSchema, editFormSchema } from "../types";

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

  const onFetchGroupSuccess = (playerNames: string[]) => {
    setIsNavLoading(true);
    props.onSubmit(playerNames);
  };

  const { mutate: fetchGroup, isPending: isFetchingGroup } = useFetchGroupMutation(onFetchGroupSuccess);

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
    if (e.formType === "groupname") {
      fetchGroup(e.groupname);
    } else {
      setIsNavLoading(true);
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
                  error={"playerNames" in errors && errors.playerNames?.[index]?.value?.message}
                />
                <ActionIcon aria-label="delete" onClick={() => onDeleteClick(index)} size="md">
                  <IconTrash />
                </ActionIcon>
              </Flex>
            ))}
            {fields.length < MAX_NUM_USERNAMES && (
              <Button leftSection={<IconPlus />} onClick={onAddClick} color="green" tabIndex={0}>
                Add Username
              </Button>
            )}
          </>
        )}
        <Flex justify="space-between" align="center">
          <Button component={RouterLink} to="/" search={true} color="red">
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid} color="blue" loading={isFetchingGroup || isNavLoading}>
            Done
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
