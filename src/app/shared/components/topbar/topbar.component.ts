import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/reducers';

@Component({
  selector: 'mc-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TopBarComponent {
  currentUser$ = this.store.select(selectCurrentUser);
  constructor(private store: Store) {}
}
