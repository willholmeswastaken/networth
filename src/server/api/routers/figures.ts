import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type DashboardFigure } from "~/types/DashboardFigures";

export const figuresRouter = createTRPCRouter({
  getDashboardFigures: protectedProcedure.query(async ({ ctx }) => {
    const totalSavings = getTotalAmountOfDecimals(
      await ctx.prisma.asset.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      })
    );
    const totalDebt = getTotalAmountOfDecimals(
      await ctx.prisma.liability.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      })
    );
    const totalNetWorth = totalSavings.sub(totalDebt);
    const results: Array<DashboardFigure> = [
      {
        title: "Total Savings",
        amount: totalSavings.toFixed(2),
      },
      {
        title: "Total Debt",
        amount: totalDebt.toFixed(2),
      },
      {
        title: "Net Worth",
        amount: totalNetWorth.toFixed(2),
      },
    ];

    return results;
  }),
});

type DecimalProperty = {
  amount: Prisma.Decimal;
};
const getTotalAmountOfDecimals = <T extends DecimalProperty>(
  decimals: Array<T>
) => {
  return decimals.reduce(
    (acc, cur) => new Prisma.Decimal(acc).add(cur.amount),
    new Prisma.Decimal(0)
  );
};
