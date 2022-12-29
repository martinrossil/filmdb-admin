import ITMDBCompany from './ITMDBCompany';
import ITMDBCountry from './ITMDBCountry';
import ITMDBCountryReleases from './ITMDBCountryReleases';
import ITMDBCredits from './ITMDBCredits';
import ITMDBGenre from './ITMDBGenre';
import ITMDBImages from './ITMDBImages';
import ITMDBLanguage from './ITMDBLanguage';
import ITMDBMovieTranslations from './ITMDBMovieTranslations';
import { TMDBStatus } from './TMDBStatus';

export default interface ITMDBMovie {
    adult: boolean;
    backdrop_path: string | null;
    budget: number;
    genres: ITMDBGenre[];
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: ITMDBCompany[];
    production_countries: ITMDBCountry[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: ITMDBLanguage[];
    status: TMDBStatus;
    tagline: string | null;
    title: string;
    vote_average: number;
    vote_count: number;
    release_dates: ITMDBCountryReleases;
    images: ITMDBImages;
    credits: ITMDBCredits;
    translations: ITMDBMovieTranslations;
}
