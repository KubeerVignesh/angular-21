import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { AuthActions } from './auth-action';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.login, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }),
    on(AuthActions.loginSuccess, (state, action) => {
      return {
        ...state,
        user: action.user,
        token: action.token,
        loading: false,
        error: null,
      };
    }),
    on(AuthActions.loginFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }),
    on(AuthActions.register, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }),
    on(AuthActions.registerSuccess, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.user,
        token: action.token,
        error: null,
      };
    }),
    on(AuthActions.registerFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }),
  ),
});
