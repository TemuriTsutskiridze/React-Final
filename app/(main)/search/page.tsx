"use client";
import { handleBookMarkToggle } from "@/functions";
import BookmarkController from "@/components/BookmarkController";
import MovieDetails from "@/components/MovieDetails";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { movieApi } from "@/lib/freeMovieApi";
import type { Movie } from "@/lib/freeMovieApi";
import { BookmarkStorage } from "@/lib/bookmarkStorage";

function convertApiToMovie(item: Movie, isBookmarked: boolean = false): IMovies {
  return {
    id: item.id,
    title: item.title,
    isBookmarked,
    rating: item.rating ? item.rating.toString() : 'NR',
    poster_path: item.poster || movieApi.getImageUrl(''),
    backdrop_path: item.poster,
    overview: item.plot || 'No description available',
    release_date: item.year.toString(),
    vote_average: item.rating || 0,
    year: item.year,
    category: 'Movie',
    media_type: 'movie'
  };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const searchQuery = query.toLowerCase();
  const [searchedMovies, setSearchedMovies] = useState<TMovies>([]);

  useEffect(() => {
    async function searchMovies() {
      if (!searchQuery.trim()) {
        setSearchedMovies([]);
        return;
      }

      try {
        const searchResults = await movieApi.searchMovies(searchQuery);
        const movies = searchResults.results || searchResults.data || [];

        const convertedMovies = movies.map(item => {
          const isBookmarked = BookmarkStorage.isBookmarked(item.id);
          return convertApiToMovie(item, isBookmarked);
        });
        setSearchedMovies(convertedMovies);
      } catch {
      }
    }

    searchMovies();
  }, [searchQuery]);

  return (
    <div className="mt-[2.4rem] px-[1.6rem]">
      <h1
        className="text-[2rem] font-[300] tracking-[-0.31px] mb-[2.4rem]
        md:text-[3.2rem] md:tracking-[-0.5px]"
      >
        Found {searchedMovies.length}{" "}
        {searchedMovies.length > 1 ? <span>results</span> : <span>result</span>}{" "}
        for `{searchQuery}`
      </h1>
      <div
        className="mt-[2.4rem] grid grid-cols-2 gap-[1.5rem]
              md:grid-cols-3 md:gap-[3rem] xl:grid-cols-4 xl:gap-[4rem]"
      >
        {searchedMovies.map((movie: IMovies) => (
          <div key={movie.title}>
            <div className="relative mb-[0.8rem]">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="rounded-[0.8rem] w-full h-auto"
              />
              <BookmarkController
                bookmarked={movie.isBookmarked}
                onToggle={() =>
                  handleBookMarkToggle(movie as IMovies, setSearchedMovies)
                }
              />
            </div>
            <MovieDetails movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div>
          <p>Loading search results...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
