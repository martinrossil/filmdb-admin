import { TMDB_KEY } from '../Config';

const BASE = 'https://api.themoviedb.org/3/';

export const fauna = 'https://graphql.eu.fauna.com/graphql';

export function getMovieUrl(id: number): string {
    return BASE + 'movie/' + id + '?api_key=' + TMDB_KEY + '&include_adult=false&append_to_response=images,alternative_titles,credits,release_dates,translations';
}

export function getPersonUrl(id: number): string {
    return BASE + 'person/' + id + '?api_key=' + TMDB_KEY + '&include_adult=false&append_to_response=images,credits,translations';
}
