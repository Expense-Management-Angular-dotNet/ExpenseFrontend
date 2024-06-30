import {
  Component,
  EventEmitter,
  Output,
  resolveForwardRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, of, tap } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected property name to 'styleUrls'
})
export class LoginComponent {
  @Output() loginStatus = new EventEmitter<boolean>();
  loginForm: FormGroup;
  islogin: boolean = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], //, this.emailDomainValidator
      password: ['', [Validators.required]], // Corrected 'Password' to 'password'
    });
    // console.log(this.loginForm);
    // this.route.url.subscribe(url => {
    //   this.islogin = url[0].path === 'login';
    // });
  }

  isValid() {
    const valid = this.loginForm.status === 'VALID';
    console.log('Form is valid: ' + valid);
    return valid;
  }

  // emailDomainValidator(control: FormControl) {
  //   const email = control.value;
  //   if (email) {
  //     return { emailDomain: true };
  //   }
  //   return null;
  // }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .login(email, password)
        .pipe(
          tap((response) => {
            console.log('login', response);
            this.loginStatus.emit(true);
            this.router.navigate(['/dashboard']);
          }),
          catchError((error) => {
            console.log('Error', error);
            if (error.status == 303) {
              this.router.navigate(['/update-password']);
            }
            alert(error.error.message || 'Login failed');
            return of(null);
          })
        )
        .subscribe();
    } else {
      console.log('Invalid Form');
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }
}
