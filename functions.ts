import { BookmarkStorage } from "@/lib/bookmarkStorage";

export const handleBookMarkToggle = async (
  movie: IMovies,
  setMovies: React.Dispatch<React.SetStateAction<TMovies>>
) => {
  try {
    const newBookmarkState = BookmarkStorage.toggleBookmark(movie);

    setMovies((prev) =>
      prev.map((m) =>
        m.id === movie.id ? { ...m, isBookmarked: newBookmarkState } : m
      )
    );
  } catch {
  }
};
