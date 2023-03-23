/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type AssetType, type Asset, type Prisma } from '@prisma/client'
import { useMemo } from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import ActionableTable from './ActionableTable';
import { api } from '~/utils/api';
import { Card, Title, Button } from '@tremor/react';
import { AddItemDialog } from './AddItemDialog';
import useDialogStore from '~/stores/dialogStore';

const AssetsSection = () => {
    const assets = api.asset.getAssets.useQuery();
    const openDialog = useDialogStore(state => state.openDialog);
    const onOpenAddItemDialog = () => {
        openDialog('add-item');
    }
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
            cell: info => info.getValue() as AssetType,
            footer: info => info.column.id,
        }),
    ], []);
    return (
        <>
            <div className="flex flex-col gap-y-4 overflow-x-auto w-full h-full">
                <Card className='h-full'>
                    <div className="flex flex-row">
                        <Title className='flex-1'>Assets</Title>
                        <Button size='xs' onClick={onOpenAddItemDialog}>Add asset</Button>
                    </div>
                    <ActionableTable<Asset> data={assets.data ?? []} columns={columns} />
                </Card>
            </div>
            <AddItemDialog onSubmit={() => { }} />
        </>
    )
}

export default AssetsSection