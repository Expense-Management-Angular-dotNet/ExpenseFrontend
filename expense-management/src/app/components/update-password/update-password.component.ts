import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatepasswordService } from '../../Services/updatepassword/updatepassword.service';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  updatePasswordForm: FormGroup;
  constructor(private fb:FormBuilder, private router: Router, private updatepasswordservice: UpdatepasswordService){
    this.updatePasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]], 
      currentpassword: ["", [Validators.required]],
      newpassword:["", [Validators.required]],
      confirmpassword:["", Validators.required]
    })
  }
  updatePassword() {
    console.log("form", this.updatePasswordForm.value);
    if(this.updatePasswordForm.valid){

      const {email, currentpassword, newpassword, confirmpassword} = this.updatePasswordForm.value;
      if(newpassword!=confirmpassword){
        alert("New passwords do not match");
        return;
      }

      this.updatepasswordservice.update(email, newpassword, currentpassword ).pipe(
        tap(response => {
        console.log("Success", response);
        alert("Update password successful");
        this.router.navigate(['/login']);
      }), catchError(error=>{
        console.log("Error", error);
        alert(error.error.message || 'password update failed.');
        return of(null);
      })).subscribe();
    }else{
      console.log("Invalid Form", this.updatePasswordForm);
      Object.keys(this.updatePasswordForm.controls).forEach(key => {
        const controlErrors = this.updatePasswordForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(`Key control: ${key}, keyError: ${keyError}, err value: ${controlErrors[keyError]}`);
          });
        }
      });
    }
    
  }

  get password() {
    return this.updatePasswordForm.get('password');
  }

  get email() {
    return this.updatePasswordForm.get('email');
  }



  lighton(passwordFieldId: string, spanId: string, flashlightId: string) {
    const spanElement = document.getElementById(spanId);
    const passwordField = document.getElementById(passwordFieldId) as HTMLInputElement;
    const flashlight = document.getElementById(flashlightId) as HTMLImageElement;

    if (spanElement !== null && passwordField !== null && flashlight !== null) {
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        spanElement.style.background =
          "linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.5),yellow)";
        flashlight.src = "image/flashlight.png";
      } else {
        passwordField.type = 'password';
        spanElement.style.background = "none";
        flashlight.src = "image/flashlight.png";
      }
    }
  }
}
