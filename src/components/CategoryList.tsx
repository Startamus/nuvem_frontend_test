import React from 'react';
import { Category } from '../types';
import { Dumbbell, Coffee, Move as Movie, Music, Book, Globe, Code, Bone as Money, Briefcase, Gamepad2 } from 'lucide-react';

const categoryIcons = {
  sport: Dumbbell,
  food: Coffee,
  movie: Movie,
  music: Music,
  career: Briefcase,
  celebrity: Movie,
  animal: Gamepad2,
  science: Globe,
  dev: Code,
  money: Money,
  fashion: Book
};

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export function CategoryList({ categories, selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons] || Book;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 
              ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="capitalize">{category}</span>
          </button>
        );
      })}
    </div>
  );
}