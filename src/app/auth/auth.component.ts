import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionLockClosed, ionMail } from '@ng-icons/ionicons';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthfailurenotificationComponent } from './authfailurenotification/authfailurenotification.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIcon, FormsModule, ReactiveFormsModule, AuthfailurenotificationComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [provideIcons({ ionMail, ionLockClosed })],
})
export class AuthComponent {
  isLoading = signal<boolean>(false);
  isRegister = signal<boolean>(false);
  isFailure = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
  });

  toggleLoading = () => {
    this.isLoading.update((old) => !old);
  };

  changeToRegister() {
    this.isRegister.update((old) => !old);
  }

  authenticate = async () => {
    this.toggleLoading();
    if (!this.customFormValidate()) {
      this.isFailure.set(true);
      return;
    }

    let email = this.authForm.value.email ?? '';
    let password = this.authForm.value.password ?? '';
    let password_confirmation = this.authForm.value.password ?? '';
    let succeded = false;

    if (this.isRegister()) {
      succeded = await this.registerUser(email, password, password_confirmation);
      if (succeded) {
        this.isLoading.set(false);
        this.isRegister.set(false);
      }
    } else {
      succeded = await this.loginUser(email, password);
      console.log('logged in');
    }
    if (!succeded) {
      this.isFailure.set(true);
    }
    await this.router.navigate(['/chat']);
  };

  async registerUser(email: string, password: string, password_confirmation: string) {
    try {
      await this.authService.register(email, password, password_confirmation);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      await this.authService.login(email, password);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  customFormValidate() {
    let valid: undefined | boolean = false;
    if (this.isRegister()) {
      valid = this.authForm.valid;
      console.log(valid);
    } else {
      valid =
        this.authForm.get('email')?.touched &&
        this.authForm.get('password')?.touched &&
        this.authForm.get('email')?.valid &&
        this.authForm.get('password')?.valid;
      if (valid === undefined) {
        valid = false;
      }
    }

    return valid;
  }

  closeThis() {
    this.isFailure.set(false);
  }
}
