import User, { IUserHash } from './User';

export interface IRootState {
  sessionState: ISessionState;
  userState: IUsersState
}

export interface ISessionState {
  authUser: User | null
};

export interface IUsersState {
  users: IUserHash
};