import ITMDBPersonData from './ITMDBPersonData';
import sanitize from './sanitize';

export default class TMDBPersonData implements ITMDBPersonData {
    public biography: string;
    public constructor({ biography }: ITMDBPersonData) {
        this.biography = sanitize(biography);
    }
}
