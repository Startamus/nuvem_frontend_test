import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-500">
      <AlertCircle data-testid="error-icon" className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}
