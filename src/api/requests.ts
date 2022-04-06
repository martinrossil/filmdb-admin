import { headers } from './headers';
import { getMovieWithHighestIdQuery } from './queries';

export const getMovieWithHighestIdRequestInit = {
    method: 'POST',
    headers: headers,
    body: getMovieWithHighestIdQuery
}
