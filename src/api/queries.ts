export const getMovieWithHighestIdQuery: string = JSON.stringify({
    query: `query {
        getMovieWithHighestId {
            id
            title
        }
    }`
});
