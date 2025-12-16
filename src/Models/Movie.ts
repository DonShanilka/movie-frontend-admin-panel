
export class Movie {
  Title !: string;
  Description !: string;
  ReleaseYear !: string;
  Language !: string;
  Duration !: string;
  Rating !: string;
  AgeRating !: string;
  Country !: string;
  Movie ?: File | string;
  Thumbnail ?: File | string;
  Banner ?: File | string;
  Trailer ?: File | string;

  constructor(data: Partial<Movie>) {
    Object.assign(this, data);
  }
}
