import ITMDBPoster from './ITMDBPoster';

export default class TMDBPoster implements ITMDBPoster {
    public aspect_ratio: number;
    public file_path: string;
    public height: number;
    public iso_639_1: string | null;
    public vote_average: number;
    public vote_count: number;
    public width: number;
    public constructor({ aspect_ratio, file_path, height, iso_639_1, vote_average, vote_count, width }: ITMDBPoster) {
        this.aspect_ratio = aspect_ratio;
        this.file_path = file_path;
        this.height = height;
        this.iso_639_1 = iso_639_1;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.width = width;
    }
}
