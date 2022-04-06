import { MovieType } from '../domain/movie/MovieType'
import { FaunaErrorType } from './errors'

export type GetMovieWithHighestIdResponse = {
    data: {
        getMovieWithHighestId: MovieType
    },
    errors: Array<FaunaErrorType> | null
}
