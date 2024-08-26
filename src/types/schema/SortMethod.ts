import * as z from "zod";

export const sortMethodSchema = z.enum(["default", "alphabetical", "by_count"]).catch("default");

export type SortMethod = z.infer<typeof sortMethodSchema>;
