import { ActionType, getType } from 'typesafe-actions';
import * as sessionActions from '../actions';
export type SessionAction = ActionType<typeof sessionActions>;

import User from '../models/User';

export interface ISessionState {
  authUser: User | null
};

const applySetAuthUser = (state: ISessionState, action: SessionAction) => ({
  ...state,
  authUser: action.payload ? new User(action.payload) : null
});

export function sessionReducer(state: ISessionState = { authUser: null }, action: SessionAction) {
  switch (action.type) {
    case getType(sessionActions.setAuthUserAction): {
      return applySetAuthUser(state, action);
    }

    default:
      return state;
  }
}
