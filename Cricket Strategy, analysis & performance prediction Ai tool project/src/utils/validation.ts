export const validateMatchData = (input: string): boolean => {
  if (!input?.trim()) return false;
  
  // Enhanced validation for match data format
  const requiredFields = ['score', 'overs', 'wickets'];
  const hasRequiredInfo = requiredFields.every(field => 
    input.toLowerCase().includes(field)
  );
  
  // Basic number validation
  const hasNumbers = /\d+/.test(input);
  
  return hasRequiredInfo && hasNumbers;
};

export const validateSquadData = (input: string): boolean => {
  if (!input?.trim()) return false;
  
  // Check if input contains a list of players (comma-separated)
  const players = input.split(',').map(p => p.trim()).filter(Boolean);
  return players.length >= 11;
};

export const validateSituationData = (input: string): boolean => {
  if (!input?.trim()) return false;
  
  // Check if situation description is detailed enough
  const minWords = 10;
  const words = input.trim().split(/\s+/);
  return words.length >= minWords;
};