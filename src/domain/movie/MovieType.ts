import { CountryType } from '../country/CountryType';
import { GenreType } from '../genre/GenreType';

export type MovieType = {
    adult: boolean;
    _id: string | null;
    id: number;
    title: string;
    budget: number;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    release_date: string;
    revenue: number;
    runtime: number | null;
    status: string;
    vote_average: number;
    vote_count: number;
    genres: Array<GenreType>;
    production_countries: Array<CountryType>;
}
