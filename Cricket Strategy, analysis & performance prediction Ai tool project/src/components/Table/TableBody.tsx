import React from 'react';
import { Row } from 'react-table';

interface TableBodyProps<T extends object> {
  rows: Row<T>[];
  prepareRow: (row: Row<T>) => void;
}

export function TableBody<T extends object>({ rows, prepareRow }: TableBodyProps<T>) {
  return (
    <tbody>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-50">
            {row.cells.map(cell => (
              <td
                {...cell.getCellProps()}
                key={cell.column.id}
                className="px-4 py-2 border-t"
              >
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}