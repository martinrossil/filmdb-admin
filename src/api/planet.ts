import { HOST, PASSWORD, USERNAME } from '../Config';
import { connect, DatabaseError, ExecutedQuery } from '@planetscale/database/dist';
import ITMDBMovie from './tmdb/ITMDBMovie';
import ITMDBGenre from './tmdb/ITMDBGenre';
import ITMDBPerson from './tmdb/ITMDBPerson';
import ITMDBCompany from './tmdb/ITMDBCompany';
import ITMDBCountry from './tmdb/ITMDBCountry';
import ITMDBCast from './tmdb/ITMDBCast';
import sanitize from './tmdb/sanitize';
import ITMDBCrew from './tmdb/ITMDBCrew';
import { ITMDBWatchProvider } from './tmdb/ITMDBWatchProviders';
import { catchError, FilmDBError } from './errors';
import TMDBMovie from './tmdb/TMDBMovie';

export async function movies(): Promise<void> {
    try {
        const results = await conn.execute('SELECT * FROM movies LIMIT 10;');
        console.log(results);
    } catch (error) {
        console.log(error);
    }
}

export async function getHighestMovieId(): Promise<[number | null, FilmDBError | null]> {
    try {
        const results = await conn.execute('SELECT MAX(id) as id FROM movies;');
        if (results.rows.length > 0) {
            const row = results.rows[0];
            return [row.id, null];
        }
        return [0, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function getMovieById(id: number): Promise<[{ id: number } | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`SELECT * FROM movies WHERE id = ${id};`);
        if (results.rows.length === 1) {
            const id = parseInt(results.rows[0].id);
            return [{ id: id }, null];
        }
        return [null, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function getPersonById(id: number): Promise<[{ id: number } | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`SELECT * FROM persons WHERE id = ${id};`);
        if (results.rows.length === 1) {
            const id = parseInt(results.rows[0].id);
            return [{ id: id }, null];
        }
        return [null, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function getMoviesCount(): Promise<[number | null, FilmDBError | null]> {
    return await getCount('SELECT COUNT(*) as count FROM movies;');
}

export async function getPersonsCount(): Promise<[number | null, FilmDBError | null]> {
    return await getCount('SELECT COUNT(*) as count FROM persons;');
}

export async function getGenresCount(): Promise<[number | null, FilmDBError | null]> {
    return await getCount('SELECT COUNT(*) as count FROM genres;');
}

export async function getCountriesCount(): Promise<[number | null, FilmDBError | null]> {
    return await getCount('SELECT COUNT(*) as count FROM countries;');
}

export async function getProvidersCount(): Promise<[number | null, FilmDBError | null]> {
    return await getCount('SELECT COUNT(*) as count FROM providers;');
}

export async function getCompaniesCount(): Promise<[number | null, FilmDBError | null]> {
    return await getCount('SELECT COUNT(*) as count FROM companies;');
}

async function getCount(sql: string): Promise<[number | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(sql);
        if (results.rows.length === 1) {
            const count: number = parseInt(results.rows[0].count);
            return [count, null];
        }
        return [0, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createMovieGenre(movie:ITMDBMovie, genre: ITMDBGenre): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`INSERT INTO movie_genre VALUES (${movie.id}, ${genre.id});`);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createMovieProvider(movie: ITMDBMovie, provider: ITMDBWatchProvider, type: string): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`INSERT INTO movie_provider VALUES (${movie.id}, ${provider.provider_id}, '${type}');`);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createMovieCompany(movie:ITMDBMovie, company: ITMDBCompany): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`INSERT INTO movie_company VALUES (${movie.id}, ${company.id});`);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createMovieCountry(movie:ITMDBMovie, country: ITMDBCountry): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`INSERT INTO movie_country VALUES (${movie.id}, '${country.iso_3166_1}');`);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createMovie(movie: ITMDBMovie): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const id = movie.id;
        const title = movie.title;
        const adult = movie.adult ? 1 : 0;
        const backdrop = movie.backdrop_path;
        const imdb = movie.imdb_id;
        const or_language = movie.original_language;
        const or_title = movie.original_title;
        const overview = movie.overview;
        const popularity = movie.popularity;
        const poster = movie.poster_path;
        const revenue = movie.revenue;
        const runtime = movie.runtime;
        const status = movie.status;
        const tagline = movie.tagline ? sanitize(movie.tagline) : null;
        const vote_average = movie.vote_average;
        const count = movie.vote_count;
        const release = movie.release_date;
        const budget = movie.budget;
        const [danish_title, danish_overview, danish_tagline] = getDanishMovieTranslations(movie);
        const certification = getCertification(movie);
        const hash = await getIdHash(id);

        let SQL = `INSERT INTO movies VALUES (${id}, '${title}', ${adult}, `;
        SQL += backdrop ? "'" + backdrop + "', " : null + ', ';
        SQL += imdb ? "'" + imdb + "', " : null + ', ';
        SQL += `'${or_language}', '${or_title}', `;
        SQL += overview ? "'" + overview + "', " : null + ', ';
        SQL += `${popularity}, `;
        SQL += poster ? "'" + poster + "', " : null + ', ';
        SQL += `${revenue}, ${runtime}, '${status}', `;
        SQL += tagline ? "'" + tagline + "', " : null + ', ';
        SQL += `${vote_average}, ${count}, '${release}', '${budget}', `;
        SQL += danish_title ? "'" + danish_title + "', " : null + ', ';
        SQL += danish_overview ? "'" + danish_overview + "', " : null + ', ';
        SQL += danish_tagline ? "'" + danish_tagline + "', " : null + ', ';
        SQL += certification ? "'" + certification + "', " : null + ', ';
        SQL += `now(), '${hash}');`;
        const results = await conn.execute(SQL);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createPerson(person: ITMDBPerson): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const adult = person.adult ? 1 : 0;
        const id = person.id;
        const bio = person.biography ? sanitize(person.biography) : null;
        const birth = person.birthday ? person.birthday : null;
        const death = person.deathday ? person.deathday : null;
        const gen = person.gender;
        const imdb = person.imdb_id;
        const depart = sanitize(person.known_for_department);
        const name = sanitize(person.name);
        const pBirth = person.place_of_birth ? sanitize(person.place_of_birth) : null;
        const popularity = person.popularity;
        const profile = person.profile_path;
        const danish_biography = getDanishPersonBio(person);
        const hash = await getIdHash(id);
        let SQL = `INSERT INTO persons VALUES (${id}, ${adult}, `;
        SQL += bio ? "'" + bio + "', " : 'null, ';
        SQL += birth ? "'" + birth + "', " : 'null, ';
        SQL += death ? "'" + death + "', " : 'null, ';
        SQL += gen + ', ';
        SQL += imdb ? "'" + imdb + "', " : 'null, ';
        SQL += `'${depart}', `;
        SQL += `'${name}', `;
        SQL += pBirth ? "'" + pBirth + "', " : 'null, ';
        SQL += `${popularity}, `;
        SQL += profile ? "'" + profile + "', " : 'null, ';
        SQL += danish_biography ? "'" + danish_biography + "', " : 'null, ';
        SQL += `now(), '${hash}');`;
        // const SQL = `INSERT INTO persons VALUES (${id}, ${adult}, '${bio}', '${birth}', '${death}', ${gen}, '${imdb}', '${depart}', '${name}', '${pBirth}', ${popularity}, '${profile}', '${danish_biography}');`;
        const results = await conn.execute(SQL);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

const encoder = new TextEncoder();

async function getIdHash(id: number): Promise<string> {
    const data = encoder.encode(id + '');
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map((b) => b.toString(16)).join('').substring(0, 11);
    return hashHex;
}

function getCertification(movie: ITMDBMovie): string | null {
    const results = movie.release_dates.results;
    for (const release of results) {
        if (release.iso_3166_1 === 'DK') {
            const dates = release.release_dates;
            for (const date of dates) {
                if (date.certification) {
                    return date.certification;
                }
            }
        }
    }
    return null;
}

function getDanishMovieTranslations(movie: ITMDBMovie): [string | null, string | null, string | null] {
    const translations = movie.translations.translations;
    let title = null;
    let overview = null;
    let tagline = null;
    for (const translation of translations) {
        if (translation.iso_3166_1 === 'DK') {
            const data = translation.data;
            title = title ? sanitize(data.title) : null;
            overview = overview ? sanitize(data.overview) : null;
            tagline = tagline ? sanitize(data.tagline) : null;
        }
    }
    return [title, overview, tagline];
}

function getDanishPersonBio(person: ITMDBPerson): string | null {
    const translations = person.translations.translations;
    for (const translation of translations) {
        if (translation.iso_3166_1 === 'DK') {
            const biography = sanitize(translation.data.biography);
            return biography;
        }
    }
    return null;
}

export async function createCast(cast: ITMDBCast): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const credit_id = cast.credit_id;
        const person_id = cast.id;
        const character = sanitize(cast.character);
        const order = cast.order;
        const SQL = `INSERT INTO casts VALUES ('${credit_id}', ${person_id}, '${character}', ${order});`
        const results = await conn.execute(SQL);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createCrew(crew: ITMDBCrew): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const credit_id = crew.credit_id;
        const person_id = crew.id;
        const department = sanitize(crew.department);
        const job = sanitize(crew.job);
        const SQL = `INSERT INTO crew VALUES ('${credit_id}', ${person_id}, '${department}', '${job}');`
        const results = await conn.execute(SQL);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createWatchProvider(provider: ITMDBWatchProvider): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute('INSERT INTO providers VALUES (' + provider.provider_id + ', "' + provider.provider_name + '");');
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createGenre(genre: ITMDBGenre): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute('INSERT INTO genres VALUES (' + genre.id + ', "' + genre.name + '");');
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createCompany(company: ITMDBCompany): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`INSERT INTO companies VALUES (${company.id}, '${company.name}', '${company.origin_country}');`);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

export async function createCountry(country: ITMDBCountry): Promise<[ExecutedQuery | null, FilmDBError | null]> {
    try {
        const results = await conn.execute(`INSERT INTO countries VALUES ('${country.iso_3166_1}', '${country.name}');`);
        return [results, null];
    } catch (error) {
        return [null, catchError(error)];
    }
}

const config = {
    host: HOST,
    username: USERNAME,
    password: PASSWORD
};

const conn = connect(config);
