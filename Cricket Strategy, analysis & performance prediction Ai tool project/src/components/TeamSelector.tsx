import React, { useState } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { recommendTeam } from '../utils/gemini';
import { ErrorMessage } from './ErrorMessage';

export function TeamSelector() {
  const [squad, setSquad] = useState('');
  const [conditions, setConditions] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await recommendTeam(squad, conditions);
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
        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
        <h2 className="text-lg sm:text-xl font-bold">Team Selector</h2>
      </div>
      
      <div className="space-y-4">
        <textarea
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px] text-sm sm:text-base"
          value={squad}
          onChange={(e) => setSquad(e.target.value)}
          placeholder="Enter squad members (comma-separated):
Example: Virat Kohli, Rohit Sharma, KL Rahul..."
        />
        
        <textarea
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
          rows={3}
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          placeholder="Enter match conditions:
- Pitch type (spinning, seaming, flat)
- Weather conditions
- Opposition strengths"
        />
        
        <button
          onClick={handleRecommend}
          disabled={loading || !squad.trim() || !conditions.trim()}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            'Recommend Team'
          )}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      
      {recommendation && (
        <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-100">
          <h3 className="font-semibold mb-2 text-green-900 text-sm sm:text-base">Recommended Team:</h3>
          <div className="prose prose-sm max-w-none text-green-800 text-sm sm:text-base">
            {recommendation.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}