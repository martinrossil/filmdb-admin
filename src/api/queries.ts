import { GenreType } from '../domain/genre/GenreType';
import Movie from '../domain/movie/Movie';
import { genreMapping } from './tmdb';

export const getMovieWithHighestIdQuery = JSON.stringify({
    query: `query {
        getMovieWithHighestId {
            _id
            id
            title
        }
    }`
});

export function createMovieQuery(movie: Movie): string {
    return JSON.stringify({
        query: `mutation {
            createMovie(data: {
                adult: ${movie.adult}
                id: ${movie.id}
                title: "${movie.title}"
                budget: ${movie.budget}
                original_language: "${movie.original_language}"
                original_title: "${movie.original_title}"
                overview: ${movie.overview === null ? null : '"' + movie.overview + '"'}
                popularity: ${movie.popularity}
                release_date: "${movie.release_date}"
                revenue: ${movie.revenue}
                runtime: ${movie.runtime}
                status: "${movie.status}"
                vote_average: ${movie.vote_average}
                vote_count: ${movie.vote_count}
                genres: {
                    connect: ${getGenreConnectArray(movie)}
                }
            }) {
                _id
                id
                adult
                title
                budget
                original_language
                original_title
                overview
                popularity
                release_date
                revenue
                runtime
                status
                vote_average
                vote_count
                genres {
                    data {
                        id
                        name
                    }
                }
            }
        }`
    })
}

function getGenreConnectArray(movie: Movie): string {
    const genres: Array<string> = [];
    for (const genre of movie.genres) {
        // @ts-ignore
        const _id: string = genreMapping[genre.id];
        genres.push(_id);
    }
    const s = JSON.stringify(genres);
    return s;
}
