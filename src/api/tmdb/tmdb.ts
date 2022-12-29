import { catchError, FilmDBError } from '../errors';
import { getMovieChangesUrl, getMovieUrl, getPersonUrl, getSingleMovieChangedUrl, getWatchProviderUrl } from '../urls';
import ITMDBMovie from './ITMDBMovie';
import ITMDBPerson from './ITMDBPerson';
import TMDBMovie from './TMDBMovie';
import TMDBPerson from './TMDBPerson';
import { ITMDBWatchProviders } from './ITMDBWatchProviders';
import ITMDBChange from './ITMDBChange';
import TMDBChange from './TMDBChange';

type TMDBChangeResponse = {
    results: ITMDBChange[];
}

type TMDBMovieChangeItem = {
    action: string;
    value: unknown;
}

export type TMDBMovieChange = {
    key: string;
    items: TMDBMovieChangeItem[];
}

type TMDBSingleMovieChangeResponse = {
    changes: TMDBMovieChange[];
}

export async function getSingleMovieChanges(id: number, start: string, end: string): Promise<[TMDBMovieChange[] | null, FilmDBError | null]> {
    try {
        const response = await fetch(getSingleMovieChangedUrl(id, start, end));
        if (response.ok) {
            const result: TMDBSingleMovieChangeResponse = await response.json();
            return [result.changes, null];
        }
        return [null, new FilmDBError(FilmDBError.UNKNOWN_ERROR, 'Unknkown Error')];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function getMovieChanges(start: string, end: string): Promise<[ITMDBChange[] | null, FilmDBError | null]> {
    try {
        const response = await fetch(getMovieChangesUrl(start, end));
        if (response.ok) {
            const result: TMDBChangeResponse = await response.json();
            return [result.results.map(change => new TMDBChange(change)), null];
        }
        return [null, new FilmDBError(FilmDBError.UNKNOWN_ERROR, 'Unknkown Error')];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function getMovie(id: number): Promise<[ITMDBMovie | null, FilmDBError | null]> {
    try {
        const response = await fetch(getMovieUrl(id));
        if (response.ok) {
            const result: ITMDBMovie = await response.json();
            return [new TMDBMovie(result), null];
        } else {
            if (response.status === 404) {
                return [null, new FilmDBError(FilmDBError.MOVIE_DOESNT_EXIST, 'Movie doesnt exists ' + id)]
            }
        }
        return [null, new FilmDBError(FilmDBError.UNKNOWN_ERROR, 'Unknkown Error')];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function getPerson(id: number): Promise<[ITMDBPerson | null, FilmDBError | null]> {
    try {
        const response = await fetch(getPersonUrl(id));
        if (response.ok) {
            const result: ITMDBPerson = await response.json();
            return [new TMDBPerson(result), null];
        } else {
            if (response.status === 404) {
                return [null, new FilmDBError(FilmDBError.PERSON_DOESNT_EXIST, 'Person doesnt exists ' + id)]
            }
        }
        return [null, new FilmDBError(FilmDBError.UNKNOWN_ERROR, 'Unknkown Error')];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function getWatchProviders(id: number): Promise<[ITMDBWatchProviders | null, FilmDBError | null]> {
    try {
        const response = await fetch(getWatchProviderUrl(id));
        if (response.ok) {
            const watchProviders = await response.json() as ITMDBWatchProviders;
            return [watchProviders, null];
        }
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304
        if (response.status === 304) {
            return [null, null];
        }
        return [null, new FilmDBError(FilmDBError.UNKNOWN_ERROR, 'Unknkown Error')];
    } catch (error) {
        return [null, catchError(error)];
    }
}
