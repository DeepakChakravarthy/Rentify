import { Component, Inject, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from '../services/user-auth.service';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  currentStep: number = 1;
  showPassword: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    @Inject(ToastrService) private toastr: ToastrService,
    private router: Router,
    private authService: UserAuthService,
    private loader: LoaderService
  ) {
    this.authForm = this.fb.group({
      emailOrPhone: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', '#f4f4f4');

    const emailControl = this.authForm.get('emailOrPhone');
    const passwordControl = this.authForm.get('password');

    if (emailControl && passwordControl) {
      this.subscriptions.push(
        emailControl.valueChanges.subscribe(() => {
          this.updateStep4Validity();
        }),
        passwordControl.valueChanges.subscribe(() => {
          this.updateStep4Validity();
        })
      );
    }
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  goToStep(step: number): void {
    if (step === 2 && !this.isEmailValid()) {
      this.toastr.error('Invalid email ID', 'Error');
      return;
    }
    this.currentStep = step;
  }

  async login(): Promise<void> {
    const email = this.authForm.value.emailOrPhone;
    const password = this.authForm.value.password;
    this.loader.show();
    this.authService.validateCredentials(email, password).subscribe(response => {
      this.loader.hide();
      if (response.error) {
        this.toastr.error(response.error, 'Error');
      } else {
        this.toastr.success('Login successful', 'Success');
        console.log('Login response userId:', response.data);
        this.authService.loginSuccess(response.data);
        this.router.navigate(['/']);
      }
    }, error => {
      this.loader.hide();
      this.toastr.error('Login failed', 'Invalid Credentials');
    });
  }

  async createAccount(): Promise<void> {
    const accountData = {
      firstname: this.authForm.value.firstName,
      lastname: this.authForm.value.lastName,
      email: this.authForm.value.emailOrPhone,
      phoneNumber: this.authForm.value.mobileNumber,
      passwordHash: this.authForm.value.password,
      createdAt: new Date().toUTCString()
    };
    this.loader.show();
    this.authService.createAccount(accountData).subscribe(response => {
      this.loader.hide();
      if (response.isSuccess) {
        this.toastr.success('Account created successfully', 'Success');
        console.log('Account creation response userId:', response.data.id);
        this.authService.loginSuccess(response.data.id);
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Account creation failed', 'Error');
      }
    }, error => {
      this.loader.hide();
      this.toastr.error('Account creation failed', 'Error');
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isEmailValid(): boolean {
    const control = this.authForm.get('emailOrPhone');
    return control ? control.valid : false;
  }

  isPasswordValid(): boolean {
    const control = this.authForm.get('password');
    return control ? control.valid : false;
  }

  isNameFieldsValid(): boolean {
    const firstNameValid = this.authForm.get('firstName')?.valid ?? false;
    const lastNameValid = this.authForm.get('lastName')?.valid ?? false;
    return firstNameValid && lastNameValid;
  }

  isCreateAccountFormValid(): boolean {
    const emailValid = this.authForm.get('emailOrPhone')?.valid ?? false;
    const passwordValid = this.authForm.get('password')?.valid ?? false;
    return emailValid && passwordValid;
  }

  isMobileNumberValid(): boolean {
    const control = this.authForm.get('mobileNumber');
    return control ? control.valid : false;
  }

  updateStep4Validity(): void {
    const emailControl = this.authForm.get('emailOrPhone');
    const passwordControl = this.authForm.get('password');
    if (emailControl && passwordControl) {
      const valid = emailControl.valid && passwordControl.value.length > 5;
      this.authForm.get('emailOrPhone')?.setValidators(valid ? null : Validators.email);
      this.authForm.get('password')?.setValidators(valid ? null : Validators.minLength(6));
    }
  }

  onSubmit(): void {
    if (this.currentStep === 5) {
      this.createAccount();
    } else if (this.currentStep === 2) {
      this.login();
    }
  }
}
