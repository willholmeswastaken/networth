import { type Asset, Prisma, type Liability, LiabilityType } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table';
import ActionableTable from './ActionableTable';

const LiabilitiesSection = () => {
    const liabilities: Liability[] = [
        {
            id: '1',
            name: 'Mortgage',
            amount: new Prisma.Decimal(1000),
            type: LiabilityType.CreditCard,
            userId: '1',
            isPaid: false,
        }
    ];
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
            <ActionableTable<Liability> data={liabilities} columns={columns} />
            <button className="btn btn-primary">Add new liability</button>
        </div>
    )
}

export default LiabilitiesSection