import * as z from "zod";
import { USERNAME_REGEX } from "../config";

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
      playerNames.forEach((item, index) => {
        const firstAppearanceIndex = uniqueValues.get(item.value);
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
        uniqueValues.set(item.value, index);
      });
    }),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;
