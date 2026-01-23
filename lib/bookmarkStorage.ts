export class BookmarkStorage {
  private static STORAGE_KEY = 'entertainment-app-bookmarks';

  static getBookmarkedMovies(): IMovies[] {
    if (typeof window === 'undefined') return [];

    try {
      const bookmarks = localStorage.getItem(this.STORAGE_KEY);
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch {
      return [];
    }
  }

  static addBookmark(movie: IMovies): void {
    if (typeof window === 'undefined') return;

    try {
      const bookmarks = this.getBookmarkedMovies();
      const exists = bookmarks.find(b => b.id === movie.id);

      if (!exists) {
        const updatedBookmarks = [...bookmarks, { ...movie, isBookmarked: true }];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBookmarks));
      }
    } catch {
    }
  }

  static removeBookmark(movieId: number): void {
    if (typeof window === 'undefined') return;

    try {
      const bookmarks = this.getBookmarkedMovies();
      const updatedBookmarks = bookmarks.filter(b => b.id !== movieId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBookmarks));
    } catch {
    }
  }

  static isBookmarked(movieId: number): boolean {
    if (typeof window === 'undefined') return false;

    const bookmarks = this.getBookmarkedMovies();
    return bookmarks.some(b => b.id === movieId);
  }

  static toggleBookmark(movie: IMovies): boolean {
    const isCurrentlyBookmarked = this.isBookmarked(movie.id);

    if (isCurrentlyBookmarked) {
      this.removeBookmark(movie.id);
      return false;
    } else {
      this.addBookmark(movie);
      return true;
    }
  }
}