import ITMDBMovieData from './ITMDBMovieData';

export default interface ITMDBMovieTranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: ITMDBMovieData;
}
