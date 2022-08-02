import { useEffect, useState } from "react";
import { api } from "./services/api";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState('');
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps,
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      const currentPickGenre = response.data?.find((genre) =>
        genre.id === selectedGenreId
      ) as GenreResponseProps;

      setGenres(response.data);
      setSelectedGenre(currentPickGenre);
    });

    handlePickedGenreId(selectedGenreId);
  }, []);

  const handlePickedGenreId = (genreId: number) => {
    if (genreId === selectedGenreId) return;

    setSelectedGenreId(genreId);
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(
      (response) => {
        setMovies(response.data);
      },
    );

    const currentSelectedGenre = genres.find(
      (genre) => genre.id === genreId,
    ) as GenreResponseProps;
    setSelectedGenre(currentSelectedGenre);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
       genres={genres}
       selectedGenreId={selectedGenreId}
       setSelectedGenreId={handlePickedGenreId}
      />

      <Content
        selectedGenre={selectedGenre}
        movies={movies}
      />
    </div>
  );
}
