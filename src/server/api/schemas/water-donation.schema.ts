import { z } from "zod";

export const updateWaterDonationSchema = z.object({
  id: z.string().cuid(),
  amount: z.number().min(0),
  targetAmount: z.number().min(0),
});
