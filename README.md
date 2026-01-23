# Entertainment Web App

A modern frontend entertainment web application built with Next.js for browsing movies and TV series.

## Live Site

Deployed on Vercel: [https://react-final-gr5j.vercel.app](https://https://react-final-gr5j.vercel.app)

## Features

- Browse movies and TV series from JSONPlaceholder API
- Interactive trending carousel
- Real-time search functionality
- Local bookmark system using localStorage
- Frontend-only authentication
- Responsive design for all devices

## Tech Stack

- Next.js 16.0.1
- React 19.2.0
- TypeScript
- Tailwind CSS 4
- Embla Carousel

## Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd enetertainment-web-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── (main)/
│   ├── bookmarks/
│   ├── movies/
│   ├── tv-series/
│   ├── search/
│   └── page.tsx
├── login/
└── register/
components/
├── MoviesList.tsx
├── Trending.tsx
├── Search.tsx
└── AuthComponent.tsx
lib/
├── freeMovieApi.ts
└── bookmarkStorage.ts
```

## Key Features

- **Data Source**: Uses JSONPlaceholder API with movie-style data transformation
- **Bookmarks**: Stored locally in browser localStorage
- **Search**: Debounced real-time search with 500ms delay
- **Authentication**: Frontend-only, accepts any credentials
- **Images**: Random movie posters from Unsplash

## Build

```bash
npm run build
npm start
```
