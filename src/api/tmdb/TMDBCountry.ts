import ITMDBCountry from './ITMDBCountry';
import sanitize from './sanitize';

export default class TMDBCountry implements ITMDBCountry {
    public iso_3166_1: string;
    public name: string;
    public constructor({ iso_3166_1, name }: ITMDBCountry) {
        this.iso_3166_1 = iso_3166_1;
        this.name = sanitize(name);
    }
}
