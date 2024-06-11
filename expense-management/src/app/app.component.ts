import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, LoginComponent, DashboardComponent, RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expense-management';
}
