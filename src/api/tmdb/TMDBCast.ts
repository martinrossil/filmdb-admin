import ITMDBCast from './ITMDBCast';

export default class TMDBCast implements ITMDBCast {
    public adult: boolean;
    public cast_id: number;
    public character: string;
    public credit_id: string;
    public gender: number;
    public id: number;
    public known_for_department: string;
    public name: string;
    public order: number;
    public original_name: string;
    public popularity: number;
    public profile_path: string;
    public constructor({ adult, cast_id, character, credit_id, gender, id, known_for_department, name, order, original_name, popularity, profile_path }: ITMDBCast) {
        this.adult = adult;
        this.cast_id = cast_id;
        this.character = character.length < 255 ? character : character.substring(0, 255);
        this.credit_id = credit_id;
        this.gender = gender;
        this.id = id;
        this.known_for_department = known_for_department;
        this.name = name;
        this.order = order;
        this.original_name = original_name;
        this.popularity = popularity;
        this.profile_path = profile_path;
    }
}
