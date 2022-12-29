import ITMDBCompany from './ITMDBCompany';
import sanitize from './sanitize';

export default class TMDBCompany implements ITMDBCompany {
    public id: number;
    public name: string;
    public origin_country: string;
    public constructor({ id, name, origin_country }: ITMDBCompany) {
        this.id = id;
        this.name = sanitize(name);
        this.origin_country = sanitize(origin_country);
    }
}
