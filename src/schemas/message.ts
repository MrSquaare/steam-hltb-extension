import { z } from "zod/mini";

import { HLTBGameSchema } from "./game";

export const FetchGameMessageSchema = z.object({
  type: z.literal("hltb-fetch-game"),
  steamAppId: z.number(),
});

export type FetchGameMessage = z.infer<typeof FetchGameMessageSchema>;

export const FetchGameResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    result: z.nullable(HLTBGameSchema),
  }),
  z.object({
    success: z.literal(false),
    error: z.string(),
  }),
]);

export type FetchGameResponse = z.infer<typeof FetchGameResponseSchema>;
