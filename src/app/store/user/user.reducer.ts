import { createReducer, on } from '@ngrx/store';
import { initialState, UserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserActions.addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UserActions.editUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u)),
  })),
  on(UserActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
  }))
);
