import { WOMClient } from "@wise-old-man/utils";

export const client = new WOMClient({
  apiKey: import.meta.env.VITE_WOM_API_KEY,
  userAgent: import.meta.env.VITE_DISCORD_USERNAME,
});
