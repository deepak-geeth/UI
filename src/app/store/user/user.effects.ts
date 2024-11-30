import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { User } from './user.model';

@Injectable()
export class UserEffects {
  private API_URL = 'http://localhost:3000/users';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.http.get<User[]>(this.API_URL).pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap(action =>
        this.http.post<User>(this.API_URL, action.user).pipe(
          map(user => UserActions.addUserSuccess({ user })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      mergeMap(action =>
        this.http.put<User>(`${this.API_URL}/${action.user.id}`, action.user).pipe(
          map(user => UserActions.editUserSuccess({ user })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.http.delete<number>(`${this.API_URL}/${action.userId}`).pipe(
          map(() => UserActions.deleteUserSuccess({ userId: action.userId })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
}
