import ITMDBCountryRelease from './ITMDBCountryRelease';
import ITMDBRelease from './ITMDBRelease';
import TMDBRelease from './TMDBRelease';

export default class TMDBCountryRelease implements ITMDBCountryRelease {
    public iso_3166_1: string;
    public release_dates: ITMDBRelease[];
    public constructor({ iso_3166_1, release_dates }: ITMDBCountryRelease) {
        this.iso_3166_1 = iso_3166_1;
        this.release_dates = release_dates.map(release => new TMDBRelease(release));
    }
}
