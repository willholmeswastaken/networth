import { Prisma } from '@prisma/client';
import { Card, Metric, Text } from '@tremor/react';
import React from 'react'
import { type DashboardFigure } from '~/types/DashboardFigures';
import { api } from '~/utils/api'
import { formatCurrency } from '~/utils/formatCurrency';

const AccountFigures = () => {
    const figures = api.figures.getDashboardFigures.useQuery();
    if (figures.isFetched && !figures.data) return null;

    const getColor = (figure: DashboardFigure) => {
        const amount = new Prisma.Decimal(figure.amount);
        if (amount.eq(0)) return 'green';
        if (figure.title === 'Total Debt') return 'red';
        else {
            if (new Prisma.Decimal(figure.amount).lte(0)) return 'red';
            else return 'green';
        }
    };

    return (
        <div className="flex flex-col gap-y-6 sm:gap-y-0 sm:flex-row sm:gap-x-6">
            {
                figures.data?.map(figure => {
                    return (
                        <Card key={figure.title} decoration="top" decorationColor={getColor(figure)}>
                            <Text>{figure.title}</Text>
                            <Metric>{formatCurrency(figure.amount)}</Metric>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default AccountFigures