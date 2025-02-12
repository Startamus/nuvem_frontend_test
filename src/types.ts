export interface Joke {
  id: string;
  value: string;
  categories: string[];
  created_at: string;
  updated_at: string;
  url: string;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
}