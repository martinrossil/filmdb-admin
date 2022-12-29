import ITMDBRelease from './ITMDBRelease';

export default class TMDBRelease implements ITMDBRelease {
    public certification: string;
    public iso_639_1: string;
    public note: string;
    public release_date: string;
    public type: number;
    public constructor({ certification, iso_639_1, note, release_date, type }: ITMDBRelease) {
        this.certification = certification;
        this.iso_639_1 = iso_639_1;
        this.note = note;
        this.release_date = release_date;
        this.type = type;
    }
}
