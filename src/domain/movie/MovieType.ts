/* eslint-disable camelcase */
export type MovieType = {
    adult: boolean,
    backdrop_path: string | null,
    budget: number,
    id: number,
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    revenue: number;
    runtime: number | null;
    status: string;
    tagline: string | null;
    title: string;
    vote_average: number;
}
