import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from '../guard/auth.guard';  // Import the AuthGuard
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},  // Redirect to dashboard by default
  { path: 'login', component: LoginComponent },
  { path: 'update-password', component: UpdatePasswordComponent},  // Protect the update-password route
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Protect the dashboard route
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },   // Protect other routes as needed
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard] }
];

