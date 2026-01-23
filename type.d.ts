interface IMovies {
  id: number;
  title: string;
  name?: string;
  isTrending?: boolean;
  isBookmarked: boolean;
  rating: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  year: number;
  category: string;
  media_type?: string;
}

type TMovies = IMovies[];
