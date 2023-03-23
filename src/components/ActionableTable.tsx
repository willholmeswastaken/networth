import { getCoreRowModel, useReactTable, type ColumnDef, flexRender } from '@tanstack/react-table';
import { Bold, Icon, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

type Props<T> = {
    data: T[];
    columns: ColumnDef<T, any>[]
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

const ActionableTable = <T,>({ data, columns, onEdit, onDelete }: Props<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    const hasData = data.length > 0;
    return (
        <>
            {
                hasData
                    ? (
                        <Table className='w-full'>
                            <TableHead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <TableHeaderCell key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : <Bold className='capitalize' >{flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}</Bold>}
                                            </TableHeaderCell>
                                        ))}
                                        <TableHeaderCell></TableHeaderCell>
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                <Text>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Text>
                                            </TableCell>
                                        ))}
                                        <TableCell className='w-0'>
                                            <button onClick={() => onDelete && onDelete(row.original)} className='mr-2'>
                                                <Icon icon={PencilSquareIcon} variant='solid' />
                                            </button>
                                            <button onClick={() => onDelete && onDelete(row.original)}>
                                                <Icon icon={TrashIcon} variant='solid' color='red' />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                    : (
                        <Text className='self-center text-center'>No data available!</Text>
                    )
            }
        </>
    )
}

export default ActionableTable