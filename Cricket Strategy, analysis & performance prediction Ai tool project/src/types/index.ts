export interface MatchData {
  currentScore?: number;
  overs?: number;
  wickets?: number;
  pitchConditions?: string;
  weather?: string;
}

export interface TeamData {
  squad: string[];
  conditions: string;
}

export interface PlayerData {
  situation: string;
  stats: {
    battingAverage?: number;
    strikeRate?: number;
    bowlingAverage?: number;
    economyRate?: number;
    recentForm?: string;
  };
}