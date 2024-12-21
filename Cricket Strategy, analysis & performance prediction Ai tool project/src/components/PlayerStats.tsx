import React from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { Award } from 'lucide-react';

interface PlayerData {
  player: string;
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  form: string;
}

const data: PlayerData[] = [
  {
    player: 'Virat Kohli',
    matches: 45,
    runs: 2100,
    average: 52.50,
    strikeRate: 138.5,
    form: 'Excellent',
  },
  {
    player: 'Rohit Sharma',
    matches: 42,
    runs: 1850,
    average: 48.20,
    strikeRate: 142.3,
    form: 'Good',
  },
  {
    player: 'KL Rahul',
    matches: 38,
    runs: 1620,
    average: 45.80,
    strikeRate: 135.8,
    form: 'Average',
  },
];

const columns: Column<PlayerData>[] = [
  {
    Header: 'Player',
    accessor: 'player',
  },
  {
    Header: 'Matches',
    accessor: 'matches',
  },
  {
    Header: 'Runs',
    accessor: 'runs',
  },
  {
    Header: 'Average',
    accessor: 'average',
  },
  {
    Header: 'Strike Rate',
    accessor: 'strikeRate',
  },
  {
    Header: 'Current Form',
    accessor: 'form',
  },
];

export function PlayerStats() {
  const tableInstance = useTable<PlayerData>(
    { 
      columns, 
      data 
    }, 
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-6 h-6 text-yellow-600" />
        <h2 className="text-xl font-bold">Player Statistics</h2>
      </div>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(column => {
                  const sortProps = column.getSortByToggleProps();
                  return (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      onClick={sortProps.onClick}
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
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.cells.map(cell => (
                    <td
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
        </table>
      </div>
    </div>
  );
}