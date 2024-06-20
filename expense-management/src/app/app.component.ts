import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { Nav1Component } from './components/nav1/nav1.component';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    RouterOutlet,
    RouterModule,
    FooterComponent,
    Nav1Component,
    CommonModule,
    UpdatePasswordComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'expense-management';

  islogin: boolean = false;

  constructor( private router: Router) {}

  ngOnInit() {
    const storedLoginStatus = localStorage.getItem('islogin');
    this.islogin = storedLoginStatus === 'true';
  }

  updatedLoginStatus(status: boolean) {
    this.islogin = status;
    if (status) {
      localStorage.setItem('islogin', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      localStorage.removeItem('islogin');
      this.router.navigate(['/login']);
    }
  }
  logout() {
    this.updatedLoginStatus(false);
  }

}
