import ITMDBCountryRelease from './ITMDBCountryRelease';
import ITMDBCountryReleases from './ITMDBCountryReleases';
import TMDBCountryRelease from './TMDBCountryRelease';

export default class TMDBCountryReleases implements ITMDBCountryReleases {
    public results: ITMDBCountryRelease[];
    public constructor({ results }: ITMDBCountryReleases) {
        this.results = results.map(countryRelease => new TMDBCountryRelease(countryRelease));
    }
}
