"use client";
import { handleBookMarkToggle } from "@/functions";
import BookmarkController from "./BookmarkController";
import MovieDetails from "./MovieDetails";
import { useEffect, useState } from "react";
import PlayDisplay from "./PlayDisplay";
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

export default function MoviesList({ filter }: { filter: string }) {
  const [movies, setMovies] = useState<TMovies>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        let convertedMovies: IMovies[] = [];

        if (filter === "bookmarked movies") {
          const bookmarkedMovies = BookmarkStorage.getBookmarkedMovies();
          convertedMovies = bookmarkedMovies.filter(movie => movie.category === "Movie");
        } else if (filter === "bookmarked tv-series") {
          const bookmarkedMovies = BookmarkStorage.getBookmarkedMovies();
          convertedMovies = bookmarkedMovies.filter(movie => movie.category === "TV Series");
        } else {
          let data: Movie[] = [];

          if (filter === "all") {
            const response = await movieApi.getPopularMovies();
            data = response.results || response.data || [];
          } else if (filter === "movie") {
            const response = await movieApi.getPopularMovies();
            data = response.results || response.data || [];
          } else if (filter === "tv") {
            const response = await movieApi.getPopularTvShows();
            data = response.results || response.data || [];
          }

          convertedMovies = data.map(item => {
            const isBookmarked = BookmarkStorage.isBookmarked(item.id);
            return convertApiToMovie(item, isBookmarked);
          });
        }

        setMovies(convertedMovies);
      } catch {
      }
    }

    fetchMovies();
  }, [filter]);
  return (
    <div
      className="mt-[2.4rem] px-[1.6rem] pb-[6.1rem]
      md:px-[2.5rem] md:mt-[3.3rem]"
    >
      {filter === "all" && (
        <h1
          className="text-[2rem] font-[300] tracking-[-0.31px]
        md:text-[3.2rem] md:tracking-[-0.5px]"
        >
          Recommended for you
        </h1>
      )}
      {filter === "movie" && (
        <h1
          className="text-[2rem] font-[300] tracking-[-0.31px]
        md:text-[3.2rem] md:tracking-[-0.5px]"
        >
          Movies
        </h1>
      )}
      {filter === "tv" && (
        <h1
          className="text-[2rem] font-[300] tracking-[-0.31px]
        md:text-[3.2rem] md:tracking-[-0.5px]"
        >
          TV Series
        </h1>
      )}
      {filter === "bookmarked movies" && (
        <h1
          className="text-[2rem] font-[300] tracking-[-0.31px]
        md:text-[3.2rem] md:tracking-[-0.5px]"
        >
          Bookmarked Movies
        </h1>
      )}
      {filter === "bookmarked tv-series" && (
        <h1
          className="text-[2rem] font-[300] tracking-[-0.31px]
        md:text-[3.2rem] md:tracking-[-0.5px]"
        >
          Bookmarked TV Series
        </h1>
      )}
      <div
        className="mt-[2.4rem] grid grid-cols-2 gap-[1.5rem]
        md:grid-cols-3 md:gap-[3rem] xl:grid-cols-4 xl:gap-[4rem]"
      >
        {movies.map((movie) => (
          <div key={movie.title}>
            <div className="relative mb-[0.8rem] group">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="rounded-[0.8rem] w-full h-auto"
              />
              <BookmarkController
                bookmarked={movie.isBookmarked}
                onToggle={() => handleBookMarkToggle(movie, setMovies)}
              />
              <div
                className="absolute inset-0 flex items-center
                justify-center opacity-0 group-hover:opacity-100
                pointer-events-none
                bg-black/25 transition-all duration-300"
              >
                <div className="pointer-events-auto cursor-pointer">
                  <PlayDisplay />
                </div>
              </div>
            </div>
            <MovieDetails movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
