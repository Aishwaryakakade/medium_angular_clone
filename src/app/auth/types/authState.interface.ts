import { BackendErrorsInterface } from 'src/app/shared/types/backendError.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
// signup button and we want to disable it At the moment when we are making an API call

// and we are setting is submitting to true and when it is finished we are setting it back to false and

// by default it must be in false.
