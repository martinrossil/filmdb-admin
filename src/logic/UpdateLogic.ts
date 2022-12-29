import { getMovieById } from '../api/planet';
import { getMovieChanges, getSingleMovieChanges, TMDBMovieChange } from '../api/tmdb/tmdb';
import FilmDBAdmin from '../FilmDBAdmin';
import Model from '../model/Model';

export default class UpdateLogic {
    private app: FilmDBAdmin;
    public constructor(app: FilmDBAdmin) {
        this.app = app;
        this.start = this.start.bind(this);
        app.addEventListener('click', this.start);
    }

    private async start(): Promise<void> {
        this.app.removeEventListener('click', this.start);
        this.loadMovieChanges();
    }

    private async loadMovieChanges(): Promise<void> {
        const [result, error] = await getMovieChanges(Model.updateStartDate.value, Model.updateEndDate.value);
        if (result) {
            Model.updatedMoviesMaximum.value = result.length;
            Model.changedMovies.addItems(result);
            this.updateNextMovie();
        }
        if (error) {
            console.log(error.code, error.message);
        }
    }

    private async updateNextMovie(): Promise<void> {
        if (Model.changedMovies.length > 0) {
            const change = Model.changedMovies.getItemAt(0);
            Model.changedMovies.removeItemAt(0);
            if (change) {
                if (change.adult) {
                    this.shouldContinueMovieUpdate();
                } else {
                    const [movie, error] = await getMovieById(change.id);
                    if (movie) {
                        this.updateMovie(change.id);
                    } else if (error) {
                        console.log(error.code, error.message);
                    } else {
                        console.log('Movie does not exist', change.id);
                        this.shouldContinueMovieUpdate();
                    }
                }
            }
        }
    }

    private async updateMovie(id: number): Promise<void> {
        const [changes, error] = await getSingleMovieChanges(id, Model.updateStartDate.value, Model.updateEndDate.value);
        if (changes) {
            for (const change of changes) {
                await this.updateMovieKey(change);
            }
            this.shouldContinueMovieUpdate();
            return;
        }
        if (error) {
            console.log(error.code, error.message);
            return;
        }
        console.log('No changes for id', id);
        this.shouldContinueMovieUpdate();
    }

    private async updateMovieKey(change: TMDBMovieChange): Promise<void> {
        console.log(change.key, change.items);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    private shouldContinueMovieUpdate(): void {
        if (Model.updatedMoviesValue.value < 1) {
            Model.updatedMoviesValue.value++;
            this.updateNextMovie();
        } else {
            console.log('DONE!!');
        }
    }
}
