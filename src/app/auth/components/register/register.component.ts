import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true, // allows to use all the compoenents without modules
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmmiting: this.store.select(selectIsSubmitting), // Observable of boolean, can subscribe to it and every single change that will happen in state will change this property
    backendError: this.store.select(selectValidationErrors),
  });
  // to trigger Action, first must inject store
  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {}

  onSubmit = () => {
    //  creating request as a prop to action in a correct format.
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    //Dispatching an action
    //
    this.store.dispatch(authActions.register({ request }));
    this.authService.register(request).subscribe((res) => console.log(res));
  };
}
