import React, { useState } from 'react';
import { UserCheck, Loader2 } from 'lucide-react';
import { recommendPlayer } from '../utils/gemini';
import { ErrorMessage } from './ErrorMessage';

export function PlayerRecommender() {
  const [situation, setSituation] = useState('');
  const [stats, setStats] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await recommendPlayer(situation, stats);
      setRecommendation(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setRecommendation('');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
      <div className="flex items-center gap-2 mb-4">
        <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
        <h2 className="text-lg sm:text-xl font-bold">Player Recommender</h2>
      </div>
      
      <div className="space-y-4">
        <textarea
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[100px] text-sm sm:text-base"
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Describe the match situation:
- Required run rate
- Overs remaining
- Wickets in hand
- Match phase (powerplay/middle/death)"
        />
        
        <textarea
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
          value={stats}
          onChange={(e) => setStats(e.target.value)}
          placeholder="Enter player statistics:
- Batting average
- Strike rate
- Recent form
- Performance in similar situations"
        />
        
        <button
          onClick={handleRecommend}
          disabled={loading || !situation.trim() || !stats.trim()}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            'Recommend Player'
          )}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      
      {recommendation && (
        <div className="mt-4 p-4 bg-purple-50 rounded-md border border-purple-100">
          <h3 className="font-semibold mb-2 text-purple-900 text-sm sm:text-base">Recommendation:</h3>
          <div className="prose prose-sm max-w-none text-purple-800 text-sm sm:text-base">
            {recommendation.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}