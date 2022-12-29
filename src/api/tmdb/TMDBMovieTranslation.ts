import ITMDBMovieData from './ITMDBMovieData';
import ITMDBMovieTranslation from './ITMDBMovieTranslation';
import TMDBMovieData from './TMDBMovieData';

export default class TMDBMovieTranslation implements ITMDBMovieTranslation {
    public english_name: string;
    public iso_3166_1: string;
    public iso_639_1: string;
    public name: string;
    public data: ITMDBMovieData;
    public constructor({ data, english_name, iso_3166_1, iso_639_1, name }: ITMDBMovieTranslation) {
        this.data = new TMDBMovieData(data);
        this.english_name = english_name;
        this.iso_3166_1 = iso_3166_1;
        this.iso_639_1 = iso_639_1;
        this.name = name;
    }
}
