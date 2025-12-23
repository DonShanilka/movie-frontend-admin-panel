
export class Episode {
	ID            !: number;
	SeriesID      !: number;
	SeasonNumber  !: number;
	EpisodeNumber !: number;
	Title         !: string;
	Description   !: string;
	Duration      !: number;
	ThumbnailURL  !: string;
	Episode      !: string;
	ReleaseDate   !: string;

    constructor(data: Partial<Episode>) {
    Object.assign(this, data);
  }
}
