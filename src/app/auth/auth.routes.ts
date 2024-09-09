import { Route } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

// A root App,
// All components  related to Auth feature will be mentioned here

//Creating registerRoutes : a route array, path is mentioned as empty because its our loacl isolated inside our feature. This is not lazy loading.
//This is exactly what we want to load for our lazy loaded routing, but our routing will be specified inside app routes.

export const registerRoutes: Route[] = [
  {
    path: '', // leaving this empty as path is specified in auth.routes
    component: RegisterComponent,
  },
];

export const loginRoutes: Route[] = [
  {
    path: '', // leaving this empty as path is specified in auth.routes
    component: LoginComponent,
  },
];
