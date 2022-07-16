import { catchError, getFaunaError } from './errors';
import { createMovieRequestInit, getMovieWithHighestIdRequestInit } from './requests';
import { CreateMovieResponse, GetMovieWithHighestIdResponse } from './responses';
import { fauna } from './urls';
import Movie from '../domain/movie/Movie';

export async function createMovie(movie: Movie): Promise<[Movie | null, Error | null]> {
    try {
        const response: Response = await fetch(fauna, createMovieRequestInit(movie));
        if (response.ok) {
            const result = await response.json() as CreateMovieResponse;
            if (result.data) {
                return [new Movie(result.data.createMovie), null];
            }
            if (result.errors && result.errors.length > 0) {
                return [null, getFaunaError(result.errors[0])]
            }
        }
        return [null, new Error('Unknown Error')];
    } catch (error) {
        return catchError(error);
    }
}

export async function getMovieWithHighestId(): Promise<[Movie | null, Error | null]> {
    try {
        const response: Response = await fetch(fauna, getMovieWithHighestIdRequestInit);
        if (response.ok) {
            const result = await response.json() as GetMovieWithHighestIdResponse;
            if (result.data) {
                return [new Movie(result.data.getMovieWithHighestId), null];
            }
            if (result.errors && result.errors.length > 0) {
                return [null, getFaunaError(result.errors[0])]
            }
        }
        return [null, new Error('Unknown Error')];
    } catch (error) {
        return catchError(error);
    }
}
