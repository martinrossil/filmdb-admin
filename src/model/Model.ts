import { ArrayCollection } from 'fuix';
import ITMDBChange from '../api/tmdb/ITMDBChange';
import ObservableMovie from './ObservableMovie';
import ObservableNumber from './ObservableNumber';
import ObservablePerson from './ObservablePerson';
import ObservableString from './ObservableString';

export default class Model {
    public static currentIndex = new ObservableNumber();
    public static moviesCount = new ObservableNumber();
    public static personsCount = new ObservableNumber();
    public static genresCount = new ObservableNumber();
    public static countriesCount = new ObservableNumber();
    public static providersCount = new ObservableNumber();
    public static companiesCount = new ObservableNumber();
    public static movie = new ObservableMovie();
    public static person = new ObservablePerson();

    public static createdGenresValue = new ObservableNumber(0);
    public static createdGenresMaximum = new ObservableNumber(14);

    public static createdCountriesValue = new ObservableNumber(0);
    public static createdCountriesMaximum = new ObservableNumber(28);

    public static createdCompaniesValue = new ObservableNumber(0);
    public static createdCompaniesMaximum = new ObservableNumber(42);

    public static createdPersonsValue = new ObservableNumber(0);
    public static createdPersonsMaximum = new ObservableNumber(56);

    public static createdCastValue = new ObservableNumber(0);
    public static createdCastMaximum = new ObservableNumber(70);

    public static createdCrewValue = new ObservableNumber(0);
    public static createdCrewMaximum = new ObservableNumber(84);

    public static updateStartDate = new ObservableString('2022-10-10');
    public static updateEndDate = new ObservableString('2022-10-11');

    public static changedMovies = new ArrayCollection<ITMDBChange>();

    public static updatedMoviesValue = new ObservableNumber();
    public static updatedMoviesMaximum = new ObservableNumber();

    public static updateMovie = new ObservableMovie();
}
