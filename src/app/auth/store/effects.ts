import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { authActions } from './actions';
import { CurrentUserInterface } from 'src/app/shared/types/current.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

// Define an effect to handle the user registration process
export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    // Listen for the 'register' action
    return actions$.pipe(
      ofType(authActions.register), // Filter actions to only react to 'register' actions
      switchMap(({ request }) => {
        // Call the register method in AuthService with the request payload
        return authService.register(request).pipe(
          // If registration is successful, dispatch 'registerSuccess' with the current user data
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token); // setting a token value
            return authActions.registerSuccess({ currentUser });
          }),
          // If an error occurs, dispatch 'registerFailure'
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true } // Indicates that this is a functional effect
);

export const redirectAfterRegiosterEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const LoginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    // Listen for the 'register' action
    return actions$.pipe(
      ofType(authActions.login), // Filter actions to only react to 'login' actions
      switchMap(({ request }) => {
        // Call the register method in AuthService with the request payload
        return authService.login(request).pipe(
          // If registration is successful, dispatch 'registerSuccess' with the current user data
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token); // setting a token value
            return authActions.loginSuccess({ currentUser });
          }),
          // If an error occurs, dispatch 'registerFailure'
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true } // Indicates that this is a functional effect
);

// export const redirectAfterLoginEffect = createEffect(
//   (action$ = inject(Actions), router = inject(Router)) => {
//     return action$.pipe(
//       ofType(authActions.loginSuccess),
//       tap(() => {
//         router.navigateByUrl('/');
//       })
//     );
//   },
//   { functional: true, dispatch: false }
// );
