/* eslint-disable camelcase */
import { CountryType } from '../country/CountryType';
import { GenreType } from '../genre/GenreType';
import { MovieType } from './MovieType';

export default class Movie {
    public adult: boolean;
    public title: string;
    public id: number;
    public _id: string | null = null;
    public budget: number;
    public original_language: string;
    public original_title: string;
    public overview: string | null = null;
    public popularity: number;
    public release_date: string;
    public revenue: number;
    public runtime: number | null;
    public status: string;
    public vote_average: number;
    public vote_count: number;
    public genres: Array<GenreType>;
    public production_countries: Array<CountryType>;

    public constructor({ adult, id, title, budget, original_language, original_title, overview, popularity, release_date, revenue, runtime, status, vote_average, vote_count, genres, production_countries, _id }: MovieType) {
        this.adult = adult;
        this.title = title;
        this.id = id;
        this._id = _id;
        this.budget = budget;
        this.original_language = original_language;
        this.original_title = original_title;
        this.overview = overview;
        this.popularity = popularity;
        this.release_date = release_date;
        this.revenue = revenue;
        this.runtime = runtime;
        this.status = status;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.genres = genres;
        this.production_countries = production_countries;
    }
}
