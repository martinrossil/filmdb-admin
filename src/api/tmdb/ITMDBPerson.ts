import ITMDBPersonTranslations from './ITMDBPersonTranslations';

export default interface ITMDBPerson {
    adult: boolean;
    biography: string | null;
    birthday: string | null;
    deathday: string | null;
    gender: 0 | 1 | 2 | 3;
    id: number;
    imdb_id: string | null;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number;
    profile_path: string | null;
    translations: ITMDBPersonTranslations;
}
