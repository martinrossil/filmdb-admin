export function catchError(error: unknown): [null, Error] {
    if (error instanceof TypeError) {
        return [null, error];
    }
    return [null, new Error('Error')];
}

export function get404ErrorTuple(type: string): [null, Error] {
    return [null, new Error(type + ' does not exist.')];
}

export function getUnknownErrorTuple(): [null, Error] {
    return [null, new Error('Unknown Error')];
}

export type FaunaErrorType = {
    extensions: {
        code: string
    },
    message: string
}

export class FaunaError extends Error {
    public constructor(init: FaunaErrorType) {
        super(init.message);
    }
}

export function getFaunaError(init: FaunaErrorType): FaunaError {
    return new FaunaError(init);
}
