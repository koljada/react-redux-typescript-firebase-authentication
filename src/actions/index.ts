import { createAction } from 'typesafe-actions';

import * as Firebase from 'firebase';

import * as C from '../constants/actions';
import { IUser } from '../models/User';

export const setAuthUserAction = createAction(C.AUTH_USER_SET, resolve => (user: Firebase.User | null) => resolve(user));
export const setUsersAction = createAction(C.USERS_SET, resolve => (users: { [key: string]: IUser }) => resolve(users));