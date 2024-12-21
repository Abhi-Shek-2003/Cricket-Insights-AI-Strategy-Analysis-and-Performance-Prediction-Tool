import React from 'react';
import { Column, useTable, useSortBy } from 'react-table';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

export function Table<T extends object>({ columns, data }: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full">
        <TableHeader headerGroups={headerGroups} />
        <TableBody {...getTableBodyProps()} rows={rows} prepareRow={prepareRow} />
      </table>
    </div>
  );
}