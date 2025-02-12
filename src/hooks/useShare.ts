export function useShare() {
  const shareJoke = async (text: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chuck Norris Joke",
          text,
          url,
        });
        return true;
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
        return false;
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        return false;
      }
    }
  };

  return { shareJoke };
}
