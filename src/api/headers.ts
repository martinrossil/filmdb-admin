import { FAUNA_SECRET_FILMDB } from '../Config';

export const headers = {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + FAUNA_SECRET_FILMDB
}
