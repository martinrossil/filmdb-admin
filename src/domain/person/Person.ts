/* eslint-disable camelcase */
import PersonInterface from './PersonInterface';
import { PersonType } from './PersonType';

export default class Person implements PersonInterface {
    public adult: boolean;
    public biography: string;
    public birthday: string | null;
    public deathday: string | null;
    public gender: number;
    public id: number;
    public imdb_id: string;
    public known_for_department: string;
    public place_of_birth: string | null;
    public popularity: number;
    public profile_path: string | null;
    public constructor(init: PersonType) {
        this.adult = init['adult'];
        this.biography = init['biography'];
        this.birthday = init['birthday'];
        this.deathday = init['deathday'];
        this.gender = init['gender'];
        this.id = init['id'];
        this.imdb_id = init['imdb_id'];
        this.known_for_department = init['known_for_department'];
        this.place_of_birth = init['place_of_birth'];
        this.popularity = init['popularity'];
        this.profile_path = init['profile_path'];
    }
}
