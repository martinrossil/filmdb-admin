import ITMDBPerson from './ITMDBPerson';
import ITMDBPersonTranslations from './ITMDBPersonTranslations';
import sanitize from './sanitize';
import TMDBPersonTranslations from './TMDBPersonTranslations';

export default class TMDBPerson implements ITMDBPerson {
    public adult: boolean;
    public biography: string | null;
    public birthday: string | null;
    public deathday: string | null;
    public gender: 0 | 2 | 1 | 3;
    public id: number;
    public imdb_id: string | null;
    public known_for_department: string;
    public name: string;
    public place_of_birth: string | null;
    public popularity: number;
    public profile_path: string | null;
    public translations: ITMDBPersonTranslations;
    public constructor({ adult, biography, birthday, deathday, gender, id, imdb_id, known_for_department, name, place_of_birth, popularity, profile_path, translations }: ITMDBPerson) {
        this.adult = adult;
        this.biography = biography ? sanitize(biography) : null;
        this.birthday = birthday;
        this.deathday = deathday;
        this.gender = gender;
        this.id = id;
        this.imdb_id = imdb_id;
        this.known_for_department = sanitize(known_for_department);
        this.name = sanitize(name);
        this.place_of_birth = place_of_birth ? sanitize(place_of_birth) : null;
        this.popularity = popularity;
        this.profile_path = profile_path;
        this.translations = new TMDBPersonTranslations(translations);
    }
}
