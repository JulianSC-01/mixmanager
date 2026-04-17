import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertComponent, FocusService, FormA11yDirective, FormErrorHeaderComponent,
  FormInputTextComponent, PageHeaderComponent, SpinnerComponent
} from 'ngx-js-shared';
import { AppLoginService } from '../services/app-login.service';

interface LoginForm {
  loginEmail: FormControl<string>;
  loginPassword: FormControl<string>;
}

@Component({
  imports: [
    AlertComponent,
    FormA11yDirective,
    FormErrorHeaderComponent,
    FormInputTextComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoginComponent {
  private readonly focusService =
    inject(FocusService);
  private readonly formBuilder =
    inject(NonNullableFormBuilder);
  private readonly router =
    inject(Router);
  readonly loginService =
    inject(AppLoginService);

  loginForm:
    FormGroup<LoginForm>;

  readonly loginErrorMessage =
    signal('');
  readonly loginInProgress =
    signal(false);

  readonly errorMessageMap =
    signal<Record<string, string>>({
      'required' :
        'Error: Field is required.',
      'badEmailFormat' :
        'Error: The e-mail address is badly formatted.'
  });

  readonly formErrorHeader =
    viewChild.required(
      FormErrorHeaderComponent);

  constructor() {
    this.loginForm =
      this.formBuilder.
        group<LoginForm>({
      loginEmail:
        this.formBuilder.control('', {
          validators: Validators.required
        }),
      loginPassword:
        this.formBuilder.control('', {
          validators: Validators.required
        })
    });
  }

  login() {
    this.loginErrorMessage.set('');

    if (this.loginForm.valid) {
      this.loginInProgress.set(true);
      this.loginService.login(
        this.loginForm.controls.
          loginEmail.value,
        this.loginForm.controls.
          loginPassword.value).then(
        () => {
          this.router.navigate(['/home']);
          this.loginInProgress.set(false);
          this.loginService.userLogout.set(false);
        },
        err => {
          this.loginErrors(err);
          this.loginInProgress.set(false);
        }
      );
    }
  }

  loginErrors(err: any) {
    switch (err.code) {
    case AppLoginService.ERR_BAD_EMAIL_FORMAT:
      this.loginForm.controls.loginEmail.
        setErrors({ badEmailFormat : true });
      this.formErrorHeader().countErrors();
      break;
    case AppLoginService.ERR_TOO_MANY_REQUESTS:
      this.loginErrorMessage.set(
        AppLoginService.MSG_TOO_MANY_REQUESTS);
      this.focusService.focusErrorHeader();
      break;
    default:
      this.loginErrorMessage.set(
        AppLoginService.MSG_INVALID_CREDENTIALS);
      this.focusService.focusErrorHeader();
    }
  }
}