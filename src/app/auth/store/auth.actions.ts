import { Action } from '@ngrx/store';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const SET_TOKEN = 'SET_TOKEN';
export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const TRY_SIGN_IN = 'TRY_SIGN_IN';

export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payLoad: string) {
  }
}

export class TrySignUp implements Action {
  readonly type = TRY_SIGN_UP;

  constructor(public payLoad: {username: string, password: string}) {
  }
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGN_IN;

  constructor(public payLoad: {username: string, password: string}) {
  }
}

export type AuthActions = SignIn | SignOut | SignUp | SetToken | TrySignUp | TrySignIn;
