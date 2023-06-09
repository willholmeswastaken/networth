import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const assetRouter = createTRPCRouter({
  getAssets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.asset.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
