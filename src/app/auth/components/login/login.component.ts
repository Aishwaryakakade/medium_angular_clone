import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { AuthService } from '../../services/auth.service';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { authActions } from '../../store/actions';
import { Store } from '@ngrx/store';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true, // allows to use all the compoenents without modules
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
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
    private store: Store,
    private authService: AuthService
  ) {}

  onSubmit = () => {
    //  creating request as a prop to action in a correct format.
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    //Dispatching an action
    //
    this.store.dispatch(authActions.login({ request }));
    // this.authService.login(request).subscribe((res) => console.log(res));
  };
}
