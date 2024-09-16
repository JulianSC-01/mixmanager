import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertComponent, AppFocusService, AppFormService, FormErrorHeaderComponent, FormInputTextComponent,
  PageHeaderComponent, SpinnerComponent
} from 'js-shared';
import { AppLoginService } from 'src/app/services/app-login.service';

interface LoginForm {
  loginEmail: FormControl<string>;
  loginPassword: FormControl<string>;
}

@Component({
  imports: [
    AlertComponent,
    CommonModule,
    FormErrorHeaderComponent,
    FormInputTextComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  selector: 'app-login',
  standalone: true,
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent {
  public loginForm : FormGroup<LoginForm>;
  public loginInProgress : boolean;

  public loginErrorMessageHeader : string;

  public loginErrorMessageMap : {[key: string]: string} = {
    'required' :
      'Error: Field is required.',
    'badEmailFormat' :
      'Error: The e-mail address is badly formatted.'
  };

  constructor(
    private focusService : AppFocusService,
    private formService : AppFormService,
    private formBuilder : FormBuilder,
    private router : Router,
    public loginService : AppLoginService) {

    this.loginForm = this.formBuilder.group<LoginForm>({
      loginEmail : this.formBuilder.control('', {
        nonNullable: true,
        validators: Validators.required
      }),
      loginPassword : this.formBuilder.control('', {
        nonNullable: true,
        validators: Validators.required
      }),
    });

    this.loginInProgress = false;
  }

  login() : void {
    if (this.loginForm.valid) {
      this.loginInProgress = true;
      this.loginService.login(
        this.loginForm.controls.loginEmail.value,
        this.loginForm.controls.loginPassword.value).
        then(
          () => {
            this.router.navigate(['/home']);
            this.loginInProgress = false;
            this.loginService.loggedOut.next(false);
          },
          err => {
            this.loginErrors(err);
            this.loginInProgress = false;
            this.focusService.focusErrorHeader();
          }
        );
    } else {
      this.formService.revealAllErrors(this.loginForm);
      this.focusService.focusErrorHeader();
    }
  }

  loginErrors(err : any) : void {
    switch (err.code) {
    case AppLoginService.ERR_BAD_EMAIL_FORMAT:
      this.loginForm.controls.loginEmail.
        setErrors({badEmailFormat : true});
      break;
    case AppLoginService.ERR_TOO_MANY_REQUESTS:
      this.loginForm.setErrors({invalidLogin : true});
      this.loginErrorMessageHeader =
        AppLoginService.MSG_LOGIN_TOO_MANY_REQUESTS;
      break;
    default:
      this.loginForm.setErrors({invalidLogin : true});
      this.loginErrorMessageHeader =
        AppLoginService.MSG_LOGIN_INVALID_CREDENTIALS;
    }
  }
}