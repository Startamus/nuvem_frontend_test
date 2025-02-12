import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center space-x-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
      <AlertCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}