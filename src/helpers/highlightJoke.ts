export function highlightJoke(joke: string, searchQuery?: string) {
  if (!searchQuery) return joke;
  const words = joke.split(" ");
  if (words.length === 1) return joke;

  const formattedWords = words.map((word) => {
    if (word.toLowerCase() === searchQuery.toLowerCase()) {
      return `<span class="bg-yellow-200 p-0.5">${word}</span>`;
    }
    return word;
  });
  return formattedWords.join(" ");
}
