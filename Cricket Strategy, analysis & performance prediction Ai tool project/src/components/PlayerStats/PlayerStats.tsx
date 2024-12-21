import React from 'react';
import { Award } from 'lucide-react';
import { Table } from '../Table/Table';
import { playerData, playerColumns } from './playerStatsData';

export function PlayerStats() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-6 h-6 text-yellow-600" />
        <h2 className="text-xl font-bold">Player Statistics</h2>
      </div>
      <Table columns={playerColumns} data={playerData} />
    </div>
  );
}