import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/jokes';

export function useCategories() {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return {
    categories,
    isLoading,
    error,
  };
}