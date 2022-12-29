import ITMDBCrew from './ITMDBCrew';

export default class TMDBCrew implements ITMDBCrew {
    public adult: boolean;
    public credit_id: string;
    public department: string;
    public gender: number;
    public id: number;
    public job: string;
    public known_for_department: string;
    public name: string;
    public original_name: string;
    public popularity: number;
    public profile_path: string;
    public constructor({ adult, credit_id, department, gender, id, job, known_for_department, name, original_name, popularity, profile_path }: ITMDBCrew) {
        this.adult = adult;
        this.credit_id = credit_id;
        this.department = department;
        this.gender = gender;
        this.id = id;
        this.job = job;
        this.known_for_department = known_for_department;
        this.name = name;
        this.original_name = original_name;
        this.popularity = popularity;
        this.profile_path = profile_path;
    }
}
