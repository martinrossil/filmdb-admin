import Movie from '../domain/movie/Movie';
import { headers } from './headers';
import { createMovieQuery, getMovieWithHighestIdQuery } from './queries';

type RequestInit = {
    method: string,
    headers: {
        'Content-Type': string,
        authorization: string
    },
    body: string
}

export const getMovieWithHighestIdRequestInit = {
    method: 'POST',
    headers: headers,
    body: getMovieWithHighestIdQuery
}

export function createMovieRequestInit(movie: Movie): RequestInit {
    return {
        method: 'POST',
        headers: headers,
        body: createMovieQuery(movie)
    }
}
