import ITMDBBackdrop from './ITMDBBackdrop';
import ITMDBImages from './ITMDBImages';
import ITMDBPoster from './ITMDBPoster';
import TMDBBackdrop from './TMDBBackdrop';
import TMDBPoster from './TMDBPoster';

export default class TMDBImages implements ITMDBImages {
    public backdrops: ITMDBBackdrop[];
    public posters: ITMDBPoster[];
    public constructor({ backdrops, posters }: ITMDBImages) {
        this.backdrops = backdrops.map(backdrop => new TMDBBackdrop(backdrop));
        this.posters = posters.map(poster => new TMDBPoster(poster));
    }
}
