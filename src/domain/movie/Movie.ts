/* eslint-disable camelcase */
import MovieInterface from './MovieInterface';
import { MovieType } from './MovieType';

export default class Movie implements MovieInterface {
    public adult: boolean;
    public backdrop_path: string | null;
    public budget: number;
    public id: number;
    public imdb_id: string | null;
    public original_language: string;
    public original_title: string;
    public overview: string | null;
    public popularity: number;
    public poster_path: string | null;
    public release_date: string;
    public revenue: number;
    public runtime: number | null;
    public status: string;
    public tagline: string | null;
    public title: string;
    public vote_average: number;

    public constructor(init: MovieType) {
        this.adult = init['adult'];
        this.backdrop_path = init['backdrop_path'];
        this.budget = init['budget'];
        this.id = init['id'];
        this.imdb_id = init['imdb_id'];
        this.original_language = init['original_language'];
        this.original_title = init['original_title'];
        this.overview = init['overview'];
        this.popularity = init['popularity'];
        this.poster_path = init['poster_path'];
        this.release_date = init['release_date'];
        this.revenue = init['revenue'];
        this.runtime = init['runtime'];
        this.status = init['status'];
        this.tagline = init['tagline'];
        this.title = init['title'];
        this.vote_average = init['vote_average'];
    }
}
