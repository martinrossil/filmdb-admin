import Movie from '../domain/movie/Movie';
import Person from '../domain/person/Person';
import { MovieType } from '../domain/movie/MovieType';
import { PersonType } from '../domain/person/PersonType';
import { catchError } from './errors';
import { getMovieUrl, getPersonUrl } from './urls';

export async function getMovie(id: number): Promise<[Movie | null, Error | null]> {
    try {
        const response = await fetch(getMovieUrl(id));
        if (response.ok) {
            const result: MovieType = await response.json();
            return [new Movie(result), null];
        } else {
            if (response.status === 404) {
                return [null, new Error('Movie id ' + id + ' does not exist.')];
            }
        }
        return [null, new Error('Unknown Error')];
    } catch (error) {
        return catchError(error);
    }
}

export async function getPerson(id: number): Promise<[Person | null, Error | null]> {
    try {
        const response = await fetch(getPersonUrl(id));
        if (response.ok) {
            const result: PersonType = await response.json();
            return [new Person(result), null];
        } else {
            if (response.status === 404) {
                return [null, new Error('Person id ' + id + ' does not exist.')];
            }
        }
        return [null, new Error('Unknown Error')];
    } catch (error) {
        return catchError(error);
    }
}
