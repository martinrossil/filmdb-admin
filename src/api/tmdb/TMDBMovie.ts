import ITMDBCompany from './ITMDBCompany';
import ITMDBCountry from './ITMDBCountry';
import ITMDBCountryReleases from './ITMDBCountryReleases';
import ITMDBCredits from './ITMDBCredits';
import ITMDBGenre from './ITMDBGenre';
import ITMDBImages from './ITMDBImages';
import ITMDBLanguage from './ITMDBLanguage';
import ITMDBMovie from './ITMDBMovie';
import ITMDBMovieTranslations from './ITMDBMovieTranslations';
import sanitize from './sanitize';
import TMDBCompany from './TMDBCompany';
import TMDBCountry from './TMDBCountry';
import TMDBCountryReleases from './TMDBCountryReleases';
import TMDBCredits from './TMDBCredits';
import TMDBGenre from './TMDBGenre';
import TMDBImages from './TMDBImages';
import TMDBLanguage from './TMDBLanguage';
import TMDBMovieTranslations from './TMDBMovieTranslations';
import { TMDBStatus } from './TMDBStatus';

export default class TMDBMovie implements ITMDBMovie {
    public adult: boolean;
    public backdrop_path: string | null;
    public budget: number;
    public genres: ITMDBGenre[];
    public id: number;
    public imdb_id: string | null;
    public original_language: string;
    public original_title: string;
    public overview: string | null;
    public popularity: number;
    public poster_path: string | null;
    public production_companies: ITMDBCompany[];
    public production_countries: ITMDBCountry[];
    public release_date: string;
    public revenue: number;
    public runtime: number | null;
    public spoken_languages: ITMDBLanguage[];
    public status: TMDBStatus;
    public tagline: string | null;
    public title: string;
    public vote_average: number;
    public vote_count: number;
    public release_dates: ITMDBCountryReleases;
    public images: ITMDBImages;
    public credits: ITMDBCredits;
    public translations: ITMDBMovieTranslations;
    public constructor({ id, adult, backdrop_path, budget, genres, imdb_id, original_language, original_title, overview, popularity, poster_path, production_companies, production_countries, release_date, revenue, runtime, spoken_languages, status, tagline, title, vote_average, vote_count, release_dates, images, credits, translations }: ITMDBMovie) {
        this.adult = adult;
        this.backdrop_path = backdrop_path;
        this.budget = budget;
        this.genres = genres.map(genre => new TMDBGenre(genre));
        this.id = id;
        this.imdb_id = imdb_id;
        this.original_language = original_language;
        this.original_title = sanitize(original_title);
        this.overview = overview ? sanitize(overview) : null;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.production_companies = production_companies.map(company => new TMDBCompany(company));
        this.production_countries = production_countries.map(country => new TMDBCountry(country));
        this.release_date = this.getValidReleaseDate(release_date);
        this.revenue = revenue;
        this.runtime = runtime;
        this.spoken_languages = spoken_languages.map(language => new TMDBLanguage(language));
        this.status = status;
        this.tagline = this.getValidTagline(tagline);
        this.title = sanitize(title);
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.release_dates = new TMDBCountryReleases(release_dates);
        this.images = new TMDBImages(images);
        this.credits = new TMDBCredits(credits);
        this.translations = new TMDBMovieTranslations(translations);
    }

    getValidTagline(tagline: string | null): string | null {
        if (tagline) {
            const sanitized = sanitize(tagline);
            if (sanitized.length < 255) {
                return sanitized;
            }
            return sanitized.substring(0, 255);
        }
        return null;
    }

    getValidReleaseDate(releaseDate: string): string {
        if (releaseDate && releaseDate.length === 10) {
            return releaseDate;
        }
        return '1000-01-01';
    }
}
