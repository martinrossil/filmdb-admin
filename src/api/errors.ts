import { DatabaseError } from '@planetscale/database/dist';

export function catchError(error: unknown): FilmDBError {
    if (error instanceof TypeError) {
        if (error.message === 'Failed to fetch') {
            return new FilmDBError(FilmDBError.NETWORK_ERROR, error.message);
        }
        return new FilmDBError(FilmDBError.FATAL_ERROR, error.message);
    } else if (error instanceof DatabaseError) {
        if (error.body.code === 'ALREADY_EXISTS' || error.body.message.includes('Duplicate entry')) {
            return new FilmDBError(FilmDBError.DUPLICATE_ENTRY, error.name);
        }
        return new FilmDBError(FilmDBError.DATABASE_ERROR, error.body.code);
    } else if (error instanceof Error) {
        return new FilmDBError(FilmDBError.UNKNOWN_ERROR, error.message);
    }
    return new FilmDBError(FilmDBError.UNKNOWN_ERROR, 'Unknown Error');
}

export type FilmDBErrorType = {
    code: number,
    message: string
}

export class FilmDBError extends Error {
    public static NETWORK_ERROR = 0;
    public static FATAL_ERROR = 1;
    public static DUPLICATE_ENTRY = 2;
    public static MOVIE_DOESNT_EXIST = 3;
    public static UNKNOWN_ERROR = 4;
    public static PERSON_DOESNT_EXIST = 5;
    public static DATABASE_ERROR = 6;

    public code: number;

    public constructor(code: number, message: string) {
        super(message)
        this.code = code;
    }
}
