const INITIAL_STATE = {
  authUser: null
};

const applySetAuthUser = (state: any, action: any) => ({
  ...state,
  authUser: action.payload
});

export function sessionReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "AUTH_USER_SET": {
      console.log('set', action);
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
}
