import { Route } from '@angular/router';

// creating this to lazy load the register component. When register path is hit only components in "registerRoutes"  will load,
//  this must be provied in main.ts

// lazy loading helps us to split our application and make every single chunk smaller and make application faster
export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
];
