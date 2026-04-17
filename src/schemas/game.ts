import { z } from "zod/mini";

export const HLTBGameTimesSchema = z.object({
  mainStory: z.number(),
  mainExtras: z.number(),
  completionist: z.number(),
});

export type HLTBGameTimes = z.infer<typeof HLTBGameTimesSchema>;

export const HLTBGameSchema = z.object({
  gameId: z.number(),
  name: z.string(),
  times: HLTBGameTimesSchema,
});

export type HLTBGame = z.infer<typeof HLTBGameSchema>;
