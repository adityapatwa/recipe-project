import * as AuthActions from './auth.actions';

export interface State {
  authenticated: boolean;
  token: string;
}

const initialState: State = {
  authenticated: false,
  token: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    // When user Signs up / Signs In the authenticated flag will be set to true hence both cases can be combined
    case AuthActions.SIGN_UP:
    case AuthActions.SIGN_IN: {
      return {
        ...state,
        authenticated: true
      };
    }

    // Set the authenticated flag to true and clear the token property from the state when a user Signs out
    case AuthActions.SIGN_OUT: {
      return {
        ...state,
        authenticated: false,
        token: null
      };
    }
    case AuthActions.SET_TOKEN: {
      return {
        ...state,
        authenticated: true,
        token: action.payLoad
      };
    }
    default: {
      return state;
    }
  }
}

