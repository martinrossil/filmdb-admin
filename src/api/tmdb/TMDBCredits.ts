import ITMDBCast from './ITMDBCast';
import ITMDBCredits from './ITMDBCredits';
import ITMDBCrew from './ITMDBCrew';
import TMDBCast from './TMDBCast';
import TMDBCrew from './TMDBCrew';

export default class TMDBCredits implements ITMDBCredits {
    public cast: ITMDBCast[];
    public crew: ITMDBCrew[];
    public constructor({ cast, crew }: ITMDBCredits) {
        this.cast = cast.map(item => new TMDBCast(item));
        this.crew = crew.map(item => new TMDBCrew(item));
    }
}
