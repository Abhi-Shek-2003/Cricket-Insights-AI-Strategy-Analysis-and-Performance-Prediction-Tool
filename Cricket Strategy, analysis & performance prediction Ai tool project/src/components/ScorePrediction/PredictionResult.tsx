import React from 'react';
import { animated } from 'react-spring';

interface PredictionResultProps {
  prediction: string;
  style: any;
}

export function PredictionResult({ prediction, style }: PredictionResultProps) {
  return (
    <animated.div style={style} className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
      <h3 className="font-semibold mb-2 text-blue-900">Prediction:</h3>
      <div className="prose prose-sm max-w-none text-blue-800">
        {prediction.split('\n').map((line, i) => (
          <p key={i} className="mb-2">{line}</p>
        ))}
      </div>
    </animated.div>
  );
}