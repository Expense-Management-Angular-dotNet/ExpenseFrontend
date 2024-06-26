import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { SearchComponent } from "../search/search.component";
@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [ReactiveFormsModule, CommonModule, SearchComponent]
})
export class AdminComponent {
  userForm: FormGroup;
  userTypes = ["Admin", "User", "Manager"];
  showSearch = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@iut-dhaka.edu$')]],
      title: ['', [Validators.required]],
      userType: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }

  get email() {
    return this.userForm.get('email');
  }

  openSearch() {
    this.showSearch = true;
  }

  closeSearch() {
    this.showSearch = false;
  }

  logout() {
    this.authService.logout();
  }
}
