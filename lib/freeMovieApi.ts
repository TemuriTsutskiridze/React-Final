const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com';

export interface Movie {
  id: number;
  title: string;
  body: string;
  userId: number;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  actors: string[];
  plot: string;
  poster: string;
  trailer: string;
  runtime: number;
  awards: string;
  country: string;
  language: string;
  boxOffice: string;
  production: string;
  website: string;
}

export interface ApiResponse<T> {
  data?: T[];
  movies?: T[];
  results?: T[];
}

class FreeMovieClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = JSONPLACEHOLDER_API;
  }

  private async request<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const moviesData = this.convertPostsToMovies(data);
      return { results: moviesData as T[] };
    } catch {
      return this.getMockData<T>();
    }
  }

  private convertPostsToMovies(posts: any[]): Movie[] {
    const movieImages = [
      'https://images.unsplash.com/photo-1489599904015-81b8b500da70?w=300&h=450',
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450',
      'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450',
      'https://images.unsplash.com/photo-1594736797933-d0701ba2fe65?w=300&h=450',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=450',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450',
      'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=300&h=450',
      'https://images.unsplash.com/photo-1489599904015-81b8b500da70?w=300&h=450',
      'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450'
    ];

    return posts.slice(0, 20).map((post, index) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
      year: 2020 + (index % 5),
      genre: ['Drama', 'Action', 'Comedy'][index % 3] ? [['Drama', 'Action', 'Comedy'][index % 3]] : ['Drama'],
      rating: 7.5 + (Math.random() * 2),
      director: 'Director ' + (index + 1),
      actors: ['Actor A', 'Actor B'],
      plot: post.body,
      poster: movieImages[index % movieImages.length],
      trailer: '',
      runtime: 120 + (index % 30),
      awards: index % 3 === 0 ? 'Oscar Winner' : 'Nominated',
      country: 'USA',
      language: 'English',
      boxOffice: '$' + (50 + index * 10) + 'M',
      production: 'Studio ' + (index % 5 + 1),
      website: ''
    }));
  }

  private getMockData<T>(): ApiResponse<T> {
    const mockMovies = [
      {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        genre: ["Drama"],
        rating: 9.3,
        director: "Frank Darabont",
        actors: ["Tim Robbins", "Morgan Freeman"],
        plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        poster: "https://via.placeholder.com/300x450/333/fff?text=The+Shawshank+Redemption",
        trailer: "",
        runtime: 142,
        awards: "Nominated for 7 Oscars",
        country: "USA",
        language: "English",
        boxOffice: "$16.3 million",
        production: "Castle Rock Entertainment",
        website: ""
      },
      {
        id: 2,
        title: "The Godfather",
        year: 1972,
        genre: ["Crime", "Drama"],
        rating: 9.2,
        director: "Francis Ford Coppola",
        actors: ["Marlon Brando", "Al Pacino"],
        plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster: "https://via.placeholder.com/300x450/444/fff?text=The+Godfather",
        trailer: "",
        runtime: 175,
        awards: "Won 3 Oscars",
        country: "USA",
        language: "English",
        boxOffice: "$134.9 million",
        production: "Paramount Pictures",
        website: ""
      },
      {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genre: ["Action", "Crime", "Drama"],
        rating: 9.0,
        director: "Christopher Nolan",
        actors: ["Christian Bale", "Heath Ledger"],
        plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        poster: "https://via.placeholder.com/300x450/555/fff?text=The+Dark+Knight",
        trailer: "",
        runtime: 152,
        awards: "Won 2 Oscars",
        country: "USA",
        language: "English",
        boxOffice: "$534.9 million",
        production: "Warner Bros.",
        website: ""
      },
      {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        genre: ["Crime", "Drama"],
        rating: 8.9,
        director: "Quentin Tarantino",
        actors: ["John Travolta", "Uma Thurman"],
        plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster: "https://via.placeholder.com/300x450/666/fff?text=Pulp+Fiction",
        trailer: "",
        runtime: 154,
        awards: "Won 1 Oscar",
        country: "USA",
        language: "English",
        boxOffice: "$214.2 million",
        production: "Miramax Films",
        website: ""
      },
      {
        id: 5,
        title: "Forrest Gump",
        year: 1994,
        genre: ["Drama", "Romance"],
        rating: 8.8,
        director: "Robert Zemeckis",
        actors: ["Tom Hanks", "Robin Wright"],
        plot: "The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
        poster: "https://via.placeholder.com/300x450/777/fff?text=Forrest+Gump",
        trailer: "",
        runtime: 142,
        awards: "Won 6 Oscars",
        country: "USA",
        language: "English",
        boxOffice: "$677.9 million",
        production: "Paramount Pictures",
        website: ""
      }
    ] as unknown as T[];

    return { results: mockMovies };
  }

  async getMovies(): Promise<ApiResponse<Movie>> {
    return this.request<Movie>('/posts');
  }

  async getTrendingMovies(): Promise<ApiResponse<Movie>> {
    return this.request<Movie>('/posts');
  }

  async getPopularMovies(): Promise<ApiResponse<Movie>> {
    return this.request<Movie>('/posts');
  }

  async getTopRatedMovies(): Promise<ApiResponse<Movie>> {
    return this.request<Movie>('/posts');
  }

  async getTrendingTvShows(): Promise<ApiResponse<Movie>> {
    return this.request<Movie>('/posts');
  }

  async getPopularTvShows(): Promise<ApiResponse<Movie>> {
    return this.request<Movie>('/posts');
  }

  async searchMovies(query: string): Promise<ApiResponse<Movie>> {
    const movies = await this.getMovies();
    const filteredMovies = (movies.results || movies.data || []).filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return { results: filteredMovies };
  }

  async searchMulti(query: string): Promise<ApiResponse<Movie>> {
    return this.searchMovies(query);
  }

  getImageUrl(path: string): string {
    return path || 'https://via.placeholder.com/300x450/999/fff?text=No+Image';
  }

  getBackdropUrl(path: string): string {
    return path || 'https://via.placeholder.com/1280x720/888/fff?text=No+Backdrop';
  }
}

export const movieApi = new FreeMovieClient();