interface MatchDataResult {
  currentScore: number;
  predictedScore: number;
  overs: number;
  remainingOvers: number;
}

export function parseMatchData(input: string, prediction: string): MatchDataResult {
  // Extract current score
  const currentScoreMatch = input.match(/score[:\s]+(\d+)/i);
  const currentScore = currentScoreMatch ? parseInt(currentScoreMatch[1]) : 0;

  // Extract overs
  const oversMatch = input.match(/overs[:\s]+(\d+(\.\d+)?)/i);
  const overs = oversMatch ? parseFloat(oversMatch[1]) : 0;

  // Extract predicted score from AI response
  const predictedScoreMatch = prediction.match(/predicted[^0-9]*(\d+)/i);
  const predictedScore = predictedScoreMatch ? parseInt(predictedScoreMatch[1]) : currentScore + 100;

  // Calculate remaining overs (assuming T20 match if not specified)
  const totalOvers = 20;
  const remainingOvers = totalOvers - overs;

  return {
    currentScore,
    predictedScore,
    overs,
    remainingOvers,
  };
}