import { type Liability } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table';
import ActionableTable from './ActionableTable';
import { Card, Title, Button } from '@tremor/react';
import { api } from '~/utils/api';

const LiabilitiesSection = () => {
    const liabilities = api.liability.getLiabilities.useQuery();
    const columnHelper = createColumnHelper<Liability>()
    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('amount', {
            cell: info => `£${info.getValue().toFixed(2)}`,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('type', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
    ]
    return (
        <div className="flex flex-col gap-y-4 overflow-x-auto w-full">
            <Card>
                <div className="flex flex-row">
                    <Title className='flex-1'>Liabilities</Title>
                    <Button size='xs'>Add liability</Button>
                </div>
                <ActionableTable<Liability> data={liabilities.data ?? []} columns={columns} />
            </Card>
        </div>
    )
}

export default LiabilitiesSection