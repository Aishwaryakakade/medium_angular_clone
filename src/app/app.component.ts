import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Standalone component is simply a mix of module and component.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'mediumclone_angular';
}
