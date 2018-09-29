import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from '../actions';
import { IUsersState } from '../models/State';

export type UsersAction = ActionType<typeof actions.setUsersAction>;

const INITIAL_STATE = {
  users: {}
};

const applySetUsers = (state: IUsersState, action: UsersAction) => ({
  ...state,
  users: { ...action.payload }
});

export function userReducer(state: IUsersState = INITIAL_STATE, action: AnyAction) {
  // console.log('state usersReducer', state);
  switch (action.type) {
    case getType(actions.setUsersAction): {
      return applySetUsers(state, action as UsersAction);
    }

    default:
      return state;
  }
}
