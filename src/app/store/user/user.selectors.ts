import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(selectUserState, state => state.users);
export const selectLoading = createSelector(selectUserState, state => state.loading);
export const selectSelectedUser = createSelector(selectUserState, state => state.selectedUser);
