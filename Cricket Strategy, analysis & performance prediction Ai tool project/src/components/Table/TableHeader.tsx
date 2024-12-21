import React from 'react';
import { Column, HeaderGroup } from 'react-table';

interface TableHeaderProps<T extends object> {
  headerGroups: HeaderGroup<T>[];
}

export function TableHeader<T extends object>({ headerGroups }: TableHeaderProps<T>) {
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
          {headerGroup.headers.map(column => {
            const sortProps = column.getSortByToggleProps();
            return (
              <th
                {...column.getHeaderProps(sortProps)}
                key={column.id}
                className="px-4 py-2 text-left bg-gray-50 text-gray-600 font-semibold cursor-pointer hover:bg-gray-100"
              >
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}