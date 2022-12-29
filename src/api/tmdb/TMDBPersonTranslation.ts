import ITMDBPersonData from './ITMDBPersonData';
import ITMDBPersonTranslation from './ITMDBPersonTranslation';
import TMDBPersonData from './TMDBPersonData';

export default class TMDBPersonTranslation implements ITMDBPersonTranslation {
    public english_name: string;
    public iso_3166_1: string;
    public iso_639_1: string;
    public name: string;
    public data: ITMDBPersonData;
    public constructor({ data, english_name, iso_3166_1, iso_639_1, name }: ITMDBPersonTranslation) {
        this.data = new TMDBPersonData(data);
        this.english_name = english_name;
        this.iso_3166_1 = iso_3166_1;
        this.iso_639_1 = iso_639_1;
        this.name = name;
    }
}
