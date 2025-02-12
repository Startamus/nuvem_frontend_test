import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      data-testid="search-form"
      onSubmit={handleSubmit}
      className="mb-6 w-full max-w-2xl"
    >
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for jokes..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-12 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
        <Search
          data-testid="search-icon"
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400"
        />
      </div>
    </form>
  );
}
