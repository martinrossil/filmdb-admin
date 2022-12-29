import ITMDBPersonTranslation from './ITMDBPersonTranslation';
import ITMDBPersonTranslations from './ITMDBPersonTranslations';
import TMDBPersonTranslation from './TMDBPersonTranslation';

export default class TMDBPersonTranslations implements ITMDBPersonTranslations {
    public translations: ITMDBPersonTranslation[];
    public constructor({ translations }: ITMDBPersonTranslations) {
        this.translations = translations.map(translation => new TMDBPersonTranslation(translation));
    }
}
