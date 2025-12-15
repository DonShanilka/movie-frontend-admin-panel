
export class Movie {
  title !: string;
  description !: string;
  release_year !: string;
  language !: string;
  duration !: string;
  rating !: string;
  age_rating !: string;
  country !: string;
  movie ?: File | string;
  thumbnail ?: File | string;
  banner ?: File | string;
  trailer ?: File | string;

  constructor(data: Partial<Movie>) {
    Object.assign(this, data);
  }
}
