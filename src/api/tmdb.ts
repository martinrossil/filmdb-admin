import Movie from '../domain/movie/Movie';
import Person from '../domain/person/Person';
import { MovieType } from '../domain/movie/MovieType';
import { PersonType } from '../domain/person/PersonType';
import { catchError, get404ErrorTuple, getUnknownErrorTuple } from './errors';
import { getMovieUrl, getPersonUrl } from './urls';

export async function getMovie(id: number): Promise<[Movie | null, Error | null]> {
    try {
        const response = await fetch(getMovieUrl(id));
        if (response.ok) {
            const result: MovieType = await response.json();
            const cleaned: string | undefined = result.overview?.replaceAll('"', "'");
            if (cleaned !== undefined) {
                result.overview = cleaned;
            }
            return [new Movie(result), null];
        } else {
            if (response.status === 404) {
                return get404ErrorTuple('Movie id ' + id);
            }
        }
        return getUnknownErrorTuple();
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
                return get404ErrorTuple('Person id ' + id);
            }
        }
        return getUnknownErrorTuple();
    } catch (error) {
        return catchError(error);
    }
}

export const genreMapping = {
    28: '335923296575946952',
    12: '335923333538250952',
    16: '335923356557639880',
    35: '335923375167766728',
    80: '335923395134750919',
    99: '335923418960494792',
    18: '335923443842154696',
    10751: '335923465284485312',
    14: '335923487058165960',
    36: '335923516903784647',
    27: '335923540667662535',
    10402: '335923558899253447',
    9648: '335923582264672455',
    10749: '335923606197371080',
    878: '335923629993754816',
    10770: '335923661859979463',
    53: '335923683598008519',
    10752: '335923705490178240',
    37: '335923730246009024'
} as const;
