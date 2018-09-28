import { createAction } from 'typesafe-actions';

import * as Firebase from 'firebase';

import * as C from '../constants/actions';

export const setAuthUserAction = createAction(C.AUTH_USER_SET, resolve => (user: Firebase.User | null) => resolve(user));