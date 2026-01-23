"use client";
import { EmblaCarousel } from "./EmblaCarousel";
import { useEffect, useState } from "react";
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
    media_type: 'movie',
    isTrending: true
  };
}

export default function Trending() {
  const [trending, setTrending] = useState<TMovies>([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const moviesRes = await movieApi.getTrendingMovies();
        const movies = moviesRes.results || moviesRes.data || [];

        const convertedMovies = movies.map(item => {
          const isBookmarked = BookmarkStorage.isBookmarked(item.id);
          return convertApiToMovie(item, isBookmarked);
        });
        setTrending(convertedMovies);
      } catch {
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div
      className="mt-[2.4rem] flex flex-col gap-[1.6rem]
        pl-[1.6rem] md:pl-[2.5rem]"
    >
      <h1
        className="text-[2rem] font-[300] tracking-[-0.31px]
        text-white md:text-[3.2rem] md:tracking-[-0.5px]"
      >
        Trending
      </h1>
      <EmblaCarousel slides={trending} setMovies={setTrending} />
    </div>
  );
}
