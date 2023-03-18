/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Asset, type Prisma } from '@prisma/client'
import { useMemo } from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import ActionableTable from './ActionableTable';
import { api } from '~/utils/api';

const AssetsSection = () => {
    const assets = api.asset.getAssets.useQuery();
    const columnHelper = createColumnHelper<Asset>()
    const columns = useMemo<ColumnDef<Asset, any>[]>(() => [
        columnHelper.accessor('name', {
            cell: info => <button className="text-blue-500 underline hover:text-blue-700">
                {info.getValue()}
            </button>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('amount', {
            cell: info => `£${(info.getValue() as Prisma.Decimal).toFixed(2)}`,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('type', {
            cell: info => info.getValue() as string,
            footer: info => info.column.id,
        }),
    ], []);
    return (
        <div className="flex flex-col gap-y-4 overflow-x-auto w-full">
            <ActionableTable<Asset> data={assets.data ?? []} columns={columns} />
            <button className="btn btn-primary">Add new asset</button>
        </div>
    )
}

export default AssetsSection