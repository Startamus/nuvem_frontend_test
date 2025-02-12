import { Joke } from '../types/joke';

export async function fetchRandomJoke(category?: string): Promise<Joke> {
  const url = category
    ? `https://api.chucknorris.io/jokes/random?category=${category}`
    : 'https://api.chucknorris.io/jokes/random';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch joke');
  }
  return response.json();
}

export async function searchJokes(query: string): Promise<Joke[]> {
  if (!query.trim()) return [];
  const response = await fetch(
    `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Failed to search jokes');
  }
  const data = await response.json();
  return data.result || [];
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch('https://api.chucknorris.io/jokes/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}