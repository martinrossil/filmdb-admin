import ITMDBPersonData from './ITMDBPersonData';

export default interface ITMDBPersonTranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: ITMDBPersonData
}
