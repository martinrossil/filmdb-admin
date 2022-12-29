import { TMDB_KEY } from '../Config';

const BASE = 'https://api.themoviedb.org/3/';

export const fauna = 'https://graphql.eu.fauna.com/graphql';

export function getSingleMovieChangedUrl(id: number, start: string, end: string): string {
    // movie/160354/changes?api_key=b1873c6876da5e75d4e8531a13a3c7a2&start_date=2022-10-10&end_date=2022-10-11
    return BASE + 'movie/' + id + '/changes?api_key=' + TMDB_KEY + '&start_date=' + start + '&end_date=' + end;
}

export function getMovieChangesUrl(start: string, end: string): string {
    // movie/changes?api_key=b1873c6876da5e75d4e8531a13a3c7a2&end_date=2022-10-11&start_date=2022-10-10
    return BASE + 'movie/changes?api_key=' + TMDB_KEY + '&start_date=' + start + '&end_date=' + end;
}

export function getWatchProviderUrl(id: number): string {
    return BASE + 'movie/' + id + '/watch/providers?api_key=' + TMDB_KEY;
}

export function getMovieUrl(id: number): string {
    const include_adult = '&include_adult=false';
    const append_to_response = '&append_to_response=release_dates,credits,watch/providers,images,translations';
    return BASE + 'movie/' + id + '?api_key=' + TMDB_KEY + include_adult + append_to_response;
}

export function getPersonUrl(id: number): string {
    const include_adult = '&include_adult=false';
    const append_to_response = '&append_to_response=images,translations';
    return BASE + 'person/' + id + '?api_key=' + TMDB_KEY + include_adult + append_to_response;
}
