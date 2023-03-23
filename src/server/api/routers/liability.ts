import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const liabilityRouter = createTRPCRouter({
  getLiabilities: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.liability.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
