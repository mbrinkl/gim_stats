import * as z from "zod";
import { MAX_NUM_USERNAMES, MIN_NUM_USERNAMES, USERNAME_REGEX } from "../config";

export const usernameSearchSchema = z
  .array(z.string().regex(USERNAME_REGEX))
  .min(MIN_NUM_USERNAMES)
  .max(MAX_NUM_USERNAMES)
  .superRefine((usernames, ctx) => {
    const uniqueValues = new Map<string, number>();
    const values = usernames.map((value) => value.toLowerCase().replace(/-|_/g, " "));
    values.forEach((value, index) => {
      const firstAppearanceIndex = uniqueValues.get(value);
      if (firstAppearanceIndex !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `No duplicates allowed.`,
          path: [index],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `No duplicates allowed.`,
          path: [firstAppearanceIndex],
        });
        return;
      }
      uniqueValues.set(value, index);
    });
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
    .superRefine((playerNames, ctx) => {
      const uniqueValues = new Map<string, number>();
      const values = playerNames.map((playerName) => playerName.value.toLowerCase().replace(/-|_/g, " "));
      values.forEach((value, index) => {
        const firstAppearanceIndex = uniqueValues.get(value);
        if (firstAppearanceIndex !== undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `No duplicates allowed.`,
            path: [index, "value"],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `No duplicates allowed.`,
            path: [firstAppearanceIndex, "value"],
          });
          return;
        }
        uniqueValues.set(value, index);
      });
    }),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;
