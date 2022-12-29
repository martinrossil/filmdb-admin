import ITMDBGenre from './ITMDBGenre';

export default class TMDBGenre implements ITMDBGenre {
    public id: number;
    public name: string;
    public constructor({ id, name }: ITMDBGenre) {
        this.id = id;
        this.name = name;
    }
}
