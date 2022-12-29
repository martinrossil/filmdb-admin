import ITMDBRelease from './ITMDBRelease';

export default interface ITMDBCountryRelease {
    iso_3166_1: string;
    release_dates: ITMDBRelease[];
}
