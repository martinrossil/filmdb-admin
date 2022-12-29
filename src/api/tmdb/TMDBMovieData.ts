import ITMDBMovieData from './ITMDBMovieData';
import sanitize from './sanitize';

export default class TMDBMovieData implements ITMDBMovieData {
    public homepage: string;
    public overview: string;
    public runtime: number;
    public tagline: string;
    public title: string;;
    public constructor({ homepage, overview, runtime, tagline, title }: ITMDBMovieData) {
        this.homepage = homepage;
        this.overview = sanitize(overview);
        this.runtime = runtime;
        this.tagline = sanitize(tagline);
        this.title = sanitize(title);
    }
}
