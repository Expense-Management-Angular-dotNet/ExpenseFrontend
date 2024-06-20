import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-nav1',
  standalone: true,
  imports: [],
  templateUrl: './nav1.component.html',
  styleUrl: './nav1.component.css'
})
export class Nav1Component {
  constructor(private appcomponent: AppComponent) { }

  logout() {
    this.appcomponent.logout();
  }
}
