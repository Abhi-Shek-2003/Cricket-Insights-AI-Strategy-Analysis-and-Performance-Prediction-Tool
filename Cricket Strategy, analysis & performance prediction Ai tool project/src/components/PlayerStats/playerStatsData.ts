export interface PlayerData {
  player: string;
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  form: string;
}

export const playerData: PlayerData[] = [
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

export const playerColumns = [
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
] as const;