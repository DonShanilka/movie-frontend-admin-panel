export class TvSeries {
    ID          !: number;
	Title       !: string;
	Description !: string;
	ReleaseYear !: number;
	Language    !: string;
	SeasonCount !: number;
	Banner      ?: File | string;

    constructor(data: Partial<TvSeries>) {
        Object.assign(this, data);
    }
}