import { Joke } from '../types/joke';

const API_URL = 'https://api.chucknorris.io/jokes';

export async function fetchRandomJoke(category?: string): Promise<Joke> {
  const url = new URL(`${API_URL}/random`);
  if (category) {
    url.searchParams.append('category', category);
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch joke');
  }
  return response.json();
}

export async function searchJokes(query: string): Promise<Joke[]> {
  if (!query.trim()) return [];
  const response = await fetch(
    `${API_URL}/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Failed to search jokes');
  }
  const data = await response.json();
  return data.result || [];
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}