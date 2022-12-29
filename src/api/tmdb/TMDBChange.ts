import ITMDBChange from './ITMDBChange';

export default class TMDBChange {
    public id: number;
    public adult: boolean;
    public constructor({ id, adult }: ITMDBChange) {
        this.id = id;
        this.adult = adult;
    }
}
