import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGN_UP),
    map((action: AuthActions.TrySignUp) => {
      return action.payLoad;
    }),
    switchMap((authData: { username: string, password: string }) => {
      return from(firebase.auth().createUserWithEmailAndPassword(
        authData.username,
        authData.password
      ));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    switchMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {type: AuthActions.SIGN_UP},
        {
          type: AuthActions.SET_TOKEN,
          payLoad: token
        }
      ];
    })
  );

  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGN_IN),
    map((action: AuthActions.TrySignIn) => {
      return action.payLoad;
    }),
    switchMap((authData: { username: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(
        authData.username,
        authData.password
      ));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    switchMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {type: AuthActions.SIGN_IN},
        {
          type: AuthActions.SET_TOKEN,
          payLoad: token
        }
      ];
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.SIGN_OUT),
    tap(() => {
      this.router.navigate(['/signin']);
    })
  );

  constructor(private actions$: Actions, private router: Router) {
  }
}
