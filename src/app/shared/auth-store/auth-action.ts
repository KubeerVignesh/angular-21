import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User; token: string }>(),
    'login Failure': props<{ error: string }>(),

    Register: props<{ name: string; email: string; password: string }>(),
    'Register Success': props<{ user: User; token: string }>(),
    'Register Failure': props<{ error: string }>(),
  },
});
