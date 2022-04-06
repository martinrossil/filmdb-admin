import { Application } from 'fuix';
import { getMovieWithHighestId } from './api/graphql';
import { getMovie, getPerson } from './api/tmdb';
export default class FilmDBAdmin extends Application {
    public constructor() {
        super();
        this.style.height = '100vh';
        this.bodyBackgroundColor = '#000d1a';
        // this.addEventListener('click', this.start);
        // this.start();
        this.loadMovieFromTMDB(49051);
        // this.loadPersonFromTMDB(1327);
    }

    private currentIndex = NaN;

    private async start(): Promise<void> {
        const [movie, error] = await getMovieWithHighestId();
        if (movie) {
            this.loadMovieFromTMDB(movie.id + 1);
        } else {
            if (error instanceof TypeError) {
                console.log('Network error.');
            } else {
                this.loadMovieFromTMDB(0);
            }
        }
    }

    private async loadMovieFromTMDB(id: number): Promise<void> {
        console.log('loadMovieFromTMDB(' + id + ')');
        const [movie, error] = await getMovie(id);
        if (movie) {
            console.log(movie);
            // create movie in fauna
        } else {
            console.log(error);
            setTimeout(() => {
                this.loadMovieFromTMDB(id + 1);
            }, 500);
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
