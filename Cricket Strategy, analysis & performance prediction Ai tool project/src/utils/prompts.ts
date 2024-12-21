export const generateScorePredictionPrompt = (matchData: string): string => {
  return `
Based on the following match data:
${matchData}

Provide a clear analysis with these sections:
1. Predicted final score (single number)
2. Run rate analysis
3. Key factors affecting the prediction
4. Confidence level

Format the response in plain text without any markdown or special formatting.
`.trim();
};

export const generateTeamSelectionPrompt = (squad: string, conditions: string): string => {
  return `
Given the following:
Squad: ${squad}
Conditions: ${conditions}

Provide a clear analysis with these sections:
1. Recommended playing XI
2. Batting order
3. Reasoning for each selection
4. Alternative options

Format the response in plain text without any markdown or special formatting.
`.trim();
};

export const generatePlayerRecommendationPrompt = (situation: string, stats: string): string => {
  return `
Match Situation: ${situation}
Player Statistics: ${stats}

Provide a clear analysis with these sections:
1. Recommended player choice
2. Statistical justification
3. Historical performance
4. Risk assessment

Format the response in plain text without any markdown or special formatting.
`.trim();
};