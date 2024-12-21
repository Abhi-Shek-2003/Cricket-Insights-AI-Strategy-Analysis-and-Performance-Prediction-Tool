import { GoogleGenerativeAI } from '@google/generative-ai';
import toast from 'react-hot-toast';
import { 
  validateMatchData, 
  validateSquadData, 
  validateSituationData 
} from './validation';
import {
  generateScorePredictionPrompt,
  generateTeamSelectionPrompt,
  generatePlayerRecommendationPrompt
} from './prompts';

const API_KEY = 'AIzaSyBgmSk9mGK3MjFDJ8lKpsWmmhzp-qDoTXQ';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

const cleanResponse = (text: string): string => {
  return text
    .replace(/\*\*/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const handleGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text?.trim()) {
      throw new Error('Empty response received from AI model');
    }
    
    return cleanResponse(text);
  } catch (error) {
    console.error('Gemini API error:', error);
    toast.error('Failed to get AI response. Please try again.');
    throw new Error('Failed to get response from AI model. Please try again.');
  }
};

export const predictScore = async (matchData: string): Promise<string> => {
  if (!validateMatchData(matchData)) {
    toast.error('Please provide complete match data');
    throw new Error('Please provide complete match data including score, overs, and wickets.');
  }

  const prompt = generateScorePredictionPrompt(matchData);
  return handleGeminiResponse(prompt);
};

export const recommendTeam = async (squad: string, conditions: string): Promise<string> => {
  if (!validateSquadData(squad)) {
    toast.error('Please provide at least 11 players');
    throw new Error('Please provide at least 11 players in the squad (comma-separated).');
  }
  if (!conditions?.trim()) {
    toast.error('Please provide match conditions');
    throw new Error('Please provide match conditions.');
  }

  const prompt = generateTeamSelectionPrompt(squad, conditions);
  return handleGeminiResponse(prompt);
};

export const recommendPlayer = async (situation: string, stats: string): Promise<string> => {
  if (!validateSituationData(situation)) {
    toast.error('Please provide a detailed match situation');
    throw new Error('Please provide a detailed match situation (at least 10 words).');
  }
  if (!stats?.trim()) {
    toast.error('Please provide player statistics');
    throw new Error('Please provide player statistics.');
  }

  const prompt = generatePlayerRecommendationPrompt(situation, stats);
  return handleGeminiResponse(prompt);
};