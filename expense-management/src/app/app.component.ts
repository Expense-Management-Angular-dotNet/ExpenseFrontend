import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';  // Import the AuthService
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { Nav1Component } from './components/nav1/nav1.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AdminComponent } from './components/admin/admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    AdminComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'expense-management';

  islogin: boolean = false;
  userRole: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.islogin = this.authService.hasToken();
    this.userRole = this.authService.getUserRole();
    this.authService.loginstatus$.subscribe(status => {
      this.islogin = status;
      this.userRole = this.authService.getUserRole();
    });
  }

  updatedLoginStatus(status: boolean) {
    this.islogin = status;
    if (status) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
