import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email,this.emailDomainValidator]],
    Password: ["", [Validators.required]]
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  //for IUT mails only
  emailDomainValidator(control: FormControl) {
    const email = control.value;
    if (email && email.indexOf('@iut-dhaka.edu') === -1) {
      return { emailDomain: true }
    }
    return null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
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

