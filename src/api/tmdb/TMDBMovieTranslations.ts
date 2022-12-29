import ITMDBMovieTranslation from './ITMDBMovieTranslation';
import ITMDBMovieTranslations from './ITMDBMovieTranslations';
import TMDBMovieTranslation from './TMDBMovieTranslation';

export default class TMDBMovieTranslations implements ITMDBMovieTranslations {
    public translations: ITMDBMovieTranslation[];
    public constructor({ translations }: ITMDBMovieTranslations) {
        this.translations = translations.map(translation => new TMDBMovieTranslation(translation));
    }
}
