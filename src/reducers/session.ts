import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from '../actions';
import { ISessionState } from '../models/State';
import User from '../models/User';

type SessionAction = ActionType<typeof actions.setAuthUserAction>;

const INITIAL_STATE = {
  authUser: null
};

const applySetAuthUser = (state: ISessionState, action: SessionAction) => ({
  ...state,
  authUser: action.payload ? new User(action.payload) : null
});

export function sessionReducer(state: ISessionState = INITIAL_STATE, action: AnyAction) {
  // console.log('state sessionReducer', state);
  switch (action.type) {
    case getType(actions.setAuthUserAction): {
      return applySetAuthUser(state, action as SessionAction);
    }

    default:
      return state;
  }
}
