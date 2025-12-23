export class TvSeries {
    ID          !: number;
	Title       !: string;
	Description !: string;
	ReleaseYear !: number;
	Language    !: string;
	SeasonCount !: number;
    Rating      !: string;
    AgeRating   !: string;
    Country     !: string;
    Genre       !: string;
	Banner      ?: File | string;
    Trailer     ?: File | string;

    constructor(data: Partial<TvSeries>) {
        Object.assign(this, data);
    }
}