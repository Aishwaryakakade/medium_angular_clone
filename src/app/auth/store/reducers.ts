import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';
import { state } from '@angular/animations';
import { routerNavigatedAction } from '@ngrx/router-store';

// Define the initial state of the authentication feature
const initialState: AuthStateInterface = {
  isSubmitting: false, // Initially, the form is not being submitted
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};

// Create a feature for the authentication module
const authFeature = createFeature({
  name: 'auth', // The name of the feature, which will be used as a key in the store
  reducer: createReducer(
    initialState, // Set the initial state
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, actions) => ({
      ...state,
      isSubmitting: false,
      currentUser: actions.currentUser,
    })),
    on(authActions.registerFailure, (state, actions) => ({
      ...state,
      isSubmitting: true,
      validationErrors: actions.errors,
    })),
    // When the 'register' action is dispatched, set 'isSubmitting' to true

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, actions) => ({
      ...state,
      isSubmitting: false,
      currentUser: actions.currentUser,
    })),
    on(authActions.loginFailure, (state, actions) => ({
      ...state,
      isSubmitting: true,
      validationErrors: actions.errors,
    })),

    on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null }))
  ),
});

// Export the feature name and reducer function
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
