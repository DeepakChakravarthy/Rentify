import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  emailOrPhone: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  mobileNumber: string = '';
  currentStep: number = 1;
  confirmPassword: string = '';
  showPassword: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', '#f4f4f4');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  login(): void {
    // Implement login logic
  }

  createAccount(): void {
    if (this.password === this.confirmPassword) {
      // Implement account creation logic
    } else {
      alert('Passwords do not match');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
