import { Application } from 'fuix';
import { createMovie, getMovieWithHighestId } from './api/graphql';
import { getMovie, getPerson } from './api/tmdb';
import { FAUNA_SECRET_FILMDB } from './Config';
export default class FilmDBAdmin extends Application {
    public constructor() {
        super();
        this.style.height = '100vh';
        this.bodyBackgroundColor = '#000d1a';
        this.addEventListener('click', this.start);
    }

    private currentIndex = NaN;

    private async start(): Promise<void> {
        this.loadMovieFromTMDB(13);
        /* const [movie, error] = await getMovieWithHighestId();
        if (movie) {
            const nextId = movie.id + 1;
            if (nextId < 25) {
                this.loadMovieFromTMDB(movie.id + 1);
            } else {
                console.log('DONE!!');
            }
        } else {
            if (error instanceof TypeError) {
                console.log('Network error.');
            } else {
                this.loadMovieFromTMDB(0);
            }
        } */
    }

    private async loadMovieFromTMDB(id: number): Promise<void> {
        console.log('loadMovieFromTMDB(' + id + ')');
        const [movie, error] = await getMovie(id);
        if (movie) {
            const [created, error] = await createMovie(movie);
            console.log(created, error);
            if (error) {
                console.log(error);
                // return;
            }
            // return;
            /* const nextId = movie.id + 1;
            if (nextId < 25) {
                this.loadMovieFromTMDB(nextId);
            } else {
                console.log('DONE!!');
            } */
        } else {
            console.log(error);
            // this.loadMovieFromTMDB(id + 1);
        }
    }

    private async loadPersonFromTMDB(id: number): Promise<void> {
        console.log('loadPersonFromTMDB(' + id + ')');
        const [person, error] = await getPerson(id);
        if (person) {
            console.log(person);
            // create person in fauna
        } else {
            console.log(error);
        }
    }
}
customElements.define('film-db-admin', FilmDBAdmin);
