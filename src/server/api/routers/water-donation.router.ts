import { TRPCError } from "@trpc/server";
import { updateWaterDonationSchema } from "../schemas/water-donation.schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const waterDonationRouter = createTRPCRouter({
  getWaterDonation: publicProcedure.query(async ({ ctx }) => {
    const waterDonations = await ctx.db.waterDonation.findMany();
    let waterDonation = waterDonations[0];

    // if there is no water donation, create one
    if (!waterDonations.length) {
      waterDonation = await ctx.db.waterDonation.create({
        data: {},
      });
    }

    // if water donation more than 1, delete all except the first one
    if (waterDonations.length > 1) {
      await ctx.db.waterDonation.deleteMany({
        where: {
          id: {
            not: waterDonations[0]?.id,
          },
        },
      });
    }

    return waterDonation;
  }),
  updateWaterDonation: adminProcedure
    .input(updateWaterDonationSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, amount, targetAmount } = input;

      const waterDonation = await ctx.db.waterDonation.findUnique({
        where: {
          id,
        },
      });

      if (!waterDonation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Donasi tidak ditemukan",
        });
      }

      return await ctx.db.waterDonation.update({
        where: {
          id,
        },
        data: {
          amount,
          targetAmount,
          isCompleted: amount >= targetAmount,
        },
      });
    }),
});
