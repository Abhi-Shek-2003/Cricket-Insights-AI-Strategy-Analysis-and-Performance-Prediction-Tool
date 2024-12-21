import React, { useState } from 'react';
import { TrendingUp, Loader2 } from 'lucide-react';
import { useSpring } from 'react-spring';
import { predictScore } from '../../utils/gemini';
import { ErrorMessage } from '../ErrorMessage';
import { PredictionChart } from './PredictionChart';
import { PredictionResult } from './PredictionResult';
import { parseMatchData } from '../../utils/matchDataParser';

export function ScorePrediction() {
  const [matchData, setMatchData] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ReturnType<typeof parseMatchData> | null>(null);

  const fadeIn = useSpring({
    opacity: prediction ? 1 : 0,
    transform: prediction ? 'translateY(0)' : 'translateY(20px)',
  });

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictScore(matchData);
      setPrediction(result);
      const parsed = parseMatchData(matchData, result);
      setParsedData(parsed);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setPrediction('');
      setParsedData(null);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Score Prediction</h2>
      </div>
      
      <textarea
        className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
        value={matchData}
        onChange={(e) => setMatchData(e.target.value)}
        placeholder="Enter match details:
- Current score
- Overs played
- Wickets fallen
- Pitch conditions
- Weather conditions"
      />
      
      <button
        onClick={handlePredict}
        disabled={loading || !matchData.trim()}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          'Predict Score'
        )}
      </button>

      {error && <ErrorMessage message={error} />}
      
      {parsedData && (
        <div className="mt-6">
          <PredictionChart
            currentScore={parsedData.currentScore}
            predictedScore={parsedData.predictedScore}
            overs={parsedData.overs}
            remainingOvers={parsedData.remainingOvers}
          />
        </div>
      )}
      
      {prediction && <PredictionResult prediction={prediction} style={fadeIn} />}
    </div>
  );
}