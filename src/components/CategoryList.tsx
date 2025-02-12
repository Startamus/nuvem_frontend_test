import {
  Dumbbell,
  Coffee,
  Move as Movie,
  Music,
  Book,
  Globe,
  Code,
  Bone as Money,
  Briefcase,
  Gamepad2,
} from "lucide-react";

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
  fashion: Book,
};

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <div className="mb-6 grid max-w-2xl grid-cols-3 gap-2 md:grid-cols-6">
      {categories.map((category) => {
        const Icon =
          categoryIcons[category as keyof typeof categoryIcons] || Book;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } `}
          >
            <Icon className="h-4 w-4" />
            <span className="capitalize">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
