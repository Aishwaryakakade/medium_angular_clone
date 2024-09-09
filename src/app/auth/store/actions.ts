import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendError.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),
  },
});

// // Create a new action for user registration
// export const register = createAction(
//   '[Auth] Register', // The action type, which describes what this action does
//   props<{ request: RegisterRequestInterface }>()
//   // The `props` function is used to define the payload for this action
//   // The payload is an object containing the registration request data
//   // This is the only way to pass data (like user input) into an action in NgRx
// );

// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{ request: RegisterRequestInterface }>()
// );

// export const registerFail = createAction(
//   '[Auth] Register Failure',
//   props<{ request: RegisterRequestInterface }>()
// );
