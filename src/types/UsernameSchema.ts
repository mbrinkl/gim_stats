import * as z from "zod";
import { MAX_NUM_USERNAMES, MIN_NUM_USERNAMES, USERNAME_REGEX } from "../config";

const checkForDuplicates = (values: string[], ctx: z.RefinementCtx, path?: string) => {
  const uniqueValues = new Map<string, number>();
  values = values.map((value) => value.toLowerCase().replace(/-|_/g, " "));
  values.forEach((value, index) => {
    const firstAppearanceIndex = uniqueValues.get(value);
    if (firstAppearanceIndex !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `No duplicates allowed.`,
        path: path ? [index, path] : [index],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `No duplicates allowed.`,
        path: path ? [firstAppearanceIndex, path] : [firstAppearanceIndex],
      });
      return;
    }
    uniqueValues.set(value, index);
  });
};

export const usernameSearchSchema = z
  .array(z.string().regex(USERNAME_REGEX))
  .min(MIN_NUM_USERNAMES)
  .max(MAX_NUM_USERNAMES)
  .superRefine((usernames, ctx) => {
    checkForDuplicates(usernames, ctx);
  });

export const editFormSchema = z.object({
  // using 'playerNames' instead of 'usernames' to avoid password managers attempting to autofill
  playerNames: z
    .array(
      z.object({
        // add min and max handlers to differentiate error messages, even tho regex handles length
        value: z.string().min(1).max(12).regex(USERNAME_REGEX),
      }),
    )
    .min(MIN_NUM_USERNAMES)
    .max(MAX_NUM_USERNAMES)
    .superRefine((playerNames, ctx) => {
      checkForDuplicates(
        playerNames.map((p) => p.value),
        ctx,
        "value",
      );
    }),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;
