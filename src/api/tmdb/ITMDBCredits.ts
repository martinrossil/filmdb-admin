import ITMDBCast from './ITMDBCast';
import ITMDBCrew from './ITMDBCrew';

export default interface ITMDBCredits {
    cast: ITMDBCast[];
    crew: ITMDBCrew[];
}
