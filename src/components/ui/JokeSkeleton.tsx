export function JokerCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4" role="loading">
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          data-testid="skeleton-placeholder"
          className="h-4 w-full rounded bg-gray-200 sm:w-3/4 dark:bg-gray-200"
        />
        <div
          data-testid="skeleton-placeholder"
          className="h-4 w-full rounded bg-gray-200 sm:w-1/2 dark:bg-gray-200"
        />
        <div
          data-testid="skeleton-placeholder-mobile"
          className="h-4 w-1/2 rounded bg-gray-200 sm:hidden dark:bg-gray-200"
        />
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-2 sm:flex-row">
        <div className="flex items-center space-x-4">
          <div
            data-testid="skeleton-placeholder"
            className="h-10 w-25 rounded bg-gray-200 dark:bg-gray-200"
          />
          <div
            data-testid="skeleton-placeholder"
            className="h-10 w-25 rounded bg-gray-200 dark:bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
