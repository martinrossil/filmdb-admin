import FilmDBAdmin from '../FilmDBAdmin';
import { FilmDBError } from '../api/errors';
import { createCast, createCompany, createCountry, createCrew, createGenre, createMovie, createMovieCompany, createMovieCountry, createMovieGenre, createMovieProvider, createPerson, createWatchProvider, getCompaniesCount, getCountriesCount, getGenresCount, getHighestMovieId, getMoviesCount, getPersonById, getPersonsCount, getProvidersCount, movies } from '../api/planet';
import ITMDBMovie from '../api/tmdb/ITMDBMovie';
import { DK } from '../api/tmdb/ITMDBWatchProviders';
import { getMovie, getPerson, getWatchProviders } from '../api/tmdb/tmdb';
import Model from '../model/Model';

export default class FilmDBLogic {
    private app: FilmDBAdmin;
    public constructor(app: FilmDBAdmin) {
        this.app = app;
        this.start = this.start.bind(this);
        app.addEventListener('click', this.start);
        this.updateModel();
    }

    private async start(): Promise<void> {
        this.app.removeEventListener('click', this.start);
        // movies();
        this.loadNextMovie();
    }

    private async updateModel(): Promise<void> {
        const [id] = await getHighestMovieId();
        if (id !== null) {
            Model.currentIndex.value = id;
        }
        const [moviesCount] = await getMoviesCount();
        if (moviesCount !== null) {
            Model.moviesCount.value = moviesCount;
        }
        const [personsCount] = await getPersonsCount();
        if (personsCount !== null) {
            Model.personsCount.value = personsCount;
        }
        const [genresCount] = await getGenresCount();
        if (genresCount !== null) {
            Model.genresCount.value = genresCount;
        }
        const [countriesCount] = await getCountriesCount();
        if (countriesCount !== null) {
            Model.countriesCount.value = countriesCount;
        }
        const [providersCount] = await getProvidersCount();
        if (providersCount !== null) {
            Model.providersCount.value = providersCount;
        }
        const [companiesCount] = await getCompaniesCount();
        if (companiesCount !== null) {
            Model.companiesCount.value = companiesCount;
        }
    }

    private async loadNextMovie(): Promise<void> {
        Model.currentIndex.value++;
        const [movie, error] = await getMovie(Model.currentIndex.value);
        if (movie) {
            if (movie.adult) {
                this.loadNextMovie();
            } else {
                Model.movie.value = movie;
                this.setMovieModelData(movie);
                this.createGenres(movie);
                // this.createCountries(movie);
            }
        } else if (error) {
            this.loadNextMovie();
        }
    }

    private setMovieModelData(movie: ITMDBMovie): void {
        Model.createdGenresValue.value = 0;
        Model.createdGenresMaximum.value = movie.genres.length;
        Model.createdCountriesValue.value = 0;
        Model.createdCountriesMaximum.value = movie.production_countries.length;
        Model.createdCompaniesValue.value = 0;
        Model.createdCompaniesMaximum.value = movie.production_companies.length;
        Model.createdPersonsValue.value = 0;
        Model.createdPersonsMaximum.value = movie.credits.cast.length + movie.credits.crew.length;
        Model.createdCastValue.value = 0;
        Model.createdCastMaximum.value = movie.credits.cast.length;
        Model.createdCrewValue.value = 0;
        Model.createdCrewMaximum.value = movie.credits.crew.length;
    }

    private async createGenres(movie: ITMDBMovie): Promise<void> {
        const genres = movie.genres;
        for (const genre of genres) {
            const [result, error] = await createGenre(genre);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
            if (result) {
                Model.genresCount.value++;
            }
            Model.createdGenresValue.value++;
        }
        this.createCountries(movie);
    }

    private async createCountries(movie: ITMDBMovie): Promise<void> {
        const countries = movie.production_countries
        for (const country of countries) {
            const [result, error] = await createCountry(country);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
            if (result) {
                Model.countriesCount.value++;
            }
            Model.createdCountriesValue.value++;
        }
        this.createCompanies(movie);
    }

    private async createCompanies(movie: ITMDBMovie): Promise<void> {
        const companies = movie.production_companies;
        for (const company of companies) {
            const [result, error] = await createCompany(company);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
            if (result) {
                Model.companiesCount.value++;
            }
            Model.createdCompaniesValue.value++;
        }
        this.createPersons(movie);
    }

    private async createPersons(movie: ITMDBMovie): Promise<void> {
        const credits = movie.credits;
        for (const cast of credits.cast) {
            const error = await this.createPerson(cast.id);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
            Model.createdPersonsValue.value++;
        }
        for (const crew of credits.crew) {
            const error = await this.createPerson(crew.id);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
            Model.createdPersonsValue.value++;
        }
        this.createCast(movie);
    }

    private personsCache: Map<number, boolean> = new Map();

    private async createPerson(id: number): Promise<FilmDBError | null> {
        if (this.personsCache.get(id)) {
            return null;
        }
        const [person, error] = await getPersonById(id);
        if (person) {
            return null;
        } else if (error) {
            return error;
        }

        // await new Promise(resolve => setTimeout(resolve, 200));

        const [tmdbPerson, tmdbError] = await getPerson(id);
        if (tmdbPerson) {
            Model.person.value = tmdbPerson;
            const [createdPerson, createPersonError] = await createPerson(tmdbPerson);
            if (createdPerson) {
                this.personsCache.set(id, true);
                Model.personsCount.value++;
                return null;
            } else if (createPersonError) {
                if (createPersonError.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(createPersonError.code, createPersonError.message);
                    return createPersonError;
                }
            }
        } else if (tmdbError) {
            return tmdbError;
        }
        return null;
    }

    private async createCast(movie: ITMDBMovie): Promise<void> {
        for (const cast of movie.credits.cast) {
            const [result, error] = await createCast(cast);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
            Model.createdCastValue.value++;
        }
        this.createCrew(movie);
    }

    private async createCrew(movie: ITMDBMovie): Promise<void> {
        for (const crew of movie.credits.crew) {
            const [result, error] = await createCrew(crew);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
            Model.createdCrewValue.value++;
        }
        this.createProviders(movie);
    }

    private async createProviders(movie: ITMDBMovie): Promise<void> {
        const [providers, error] = await getWatchProviders(movie.id);
        if (error) {
            console.log(error.code, error.message);
            return;
        }
        if (providers?.results?.DK) {
            const DK = providers.results.DK;
            if (DK?.buy) {
                const buy = DK.buy;
                for (const provider of buy) {
                    const [result, error] = await createWatchProvider(provider);
                    if (result) {
                        Model.providersCount.value++;
                    } else if (error) {
                        if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                            console.log(error.code, error.message);
                            return;
                        }
                    }
                }
            }
            if (DK?.flatrate) {
                const flatrate = DK.flatrate;
                for (const provider of flatrate) {
                    const [result, error] = await createWatchProvider(provider);
                    if (result) {
                        Model.providersCount.value++;
                    } else if (error) {
                        if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                            console.log(error.code, error.message);
                            return;
                        }
                    }
                }
            }
            if (DK?.rent) {
                const rent = DK.rent;
                for (const provider of rent) {
                    const [result, error] = await createWatchProvider(provider);
                    if (result) {
                        Model.providersCount.value++;
                    } else if (error) {
                        if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                            console.log(error.code, error.message);
                            return;
                        }
                    }
                }
            }
        }
        if (providers?.results?.DK) {
            this.createMovieProviders(movie, providers.results.DK);
        } else {
            this.createMovieGenres(movie);
        }
    }

    private async createMovieProviders(movie: ITMDBMovie, dk: DK): Promise<void> {
        if (dk?.buy) {
            const buy = dk.buy;
            for (const provider of buy) {
                const [result, error] = await createMovieProvider(movie, provider, 'buy');
                if (error) {
                    if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                        console.log(error.code, error.message);
                        return;
                    }
                }
            }
        }
        if (dk?.flatrate) {
            const flatrate = dk.flatrate;
            for (const provider of flatrate) {
                const [result, error] = await createMovieProvider(movie, provider, 'flatrate');
                if (error) {
                    if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                        console.log(error.code, error.message);
                        return;
                    }
                }
            }
        }
        if (dk?.rent) {
            const rent = dk.rent;
            for (const provider of rent) {
                const [result, error] = await createMovieProvider(movie, provider, 'rent');
                if (error) {
                    if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                        console.log(error.code, error.message);
                        return;
                    }
                }
            }
        }
        this.createMovieGenres(movie);
    }

    private async createMovieGenres(movie: ITMDBMovie): Promise<void> {
        for (const genre of movie.genres) {
            const [result, error] = await createMovieGenre(movie, genre);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
        }
        this.createMovieCompanies(movie);
    }

    private async createMovieCompanies(movie: ITMDBMovie): Promise<void> {
        for (const company of movie.production_companies) {
            const [result, error] = await createMovieCompany(movie, company);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
        }
        this.createMovieCountries(movie);
    }

    private async createMovieCountries(movie: ITMDBMovie): Promise<void> {
        for (const country of movie.production_countries) {
            const [result, error] = await createMovieCountry(movie, country);
            if (error) {
                if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                    console.log(error.code, error.message);
                    return;
                }
            }
        }
        this.createMovie(movie);
    }

    private async createMovie(movie: ITMDBMovie): Promise<void> {
        const [result, error] = await createMovie(movie);
        if (result) {
            Model.moviesCount.value++;
            this.loadNextMovie();
        } else if (error) {
            if (error.code !== FilmDBError.DUPLICATE_ENTRY) {
                console.log(error.code, error.message);
            }
            // loadnextMovie so I can run on both computers :)
        }
    }
}
