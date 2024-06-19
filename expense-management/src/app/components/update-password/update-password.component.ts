import { Component } from '@angular/core';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  updatePassword() {
    console.log("working");
  }

  lighton(passwordFieldId: string, spanId: string, flashlightId: string) {
    const spanElement = document.getElementById(spanId);
    const passwordField = document.getElementById(passwordFieldId) as HTMLInputElement;
    const flashlight = document.getElementById(flashlightId) as HTMLImageElement;

    if (spanElement !== null && passwordField !== null && flashlight !== null) {
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        spanElement.style.background =
          "Linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.5),yellow)";
        flashlight.src = "image/flashlight.png";
      } else {
        passwordField.type = 'password';
        spanElement.style.background = "none";
        flashlight.src = "image/flashlight.png";
      }
    }
  }
}
