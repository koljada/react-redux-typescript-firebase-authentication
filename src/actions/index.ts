import { action } from 'typesafe-actions';

import * as Firebase from 'firebase';

import * as C from '../constants/actions';

export const setAuthUser = (user: Firebase.User) => action(C.AUTH_USER_SET, user);