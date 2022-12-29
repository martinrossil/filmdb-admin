import ITMDBLanguage from './ITMDBLanguage';

export default class TMDBLanguage implements ITMDBLanguage {
    public iso_639_1: string;
    public name: string;
    public constructor({ iso_639_1, name }: ITMDBLanguage) {
        this.iso_639_1 = iso_639_1;
        this.name = name;
    }
}
