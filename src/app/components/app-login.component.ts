import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppFormHelper } from 'src/app/modules/shared/helpers/app-form-helper';
import { AppFocusService } from '../services/app-focus.service';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppMessages } from '../messages/app-messages';

interface LoginForm {
  loginEmail: FormControl<string>;
  loginPassword: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent {

  public loginForm : FormGroup<LoginForm>;
  public loginInProgress : boolean;
  public loginErrorMessageHeader : string;

  constructor(
    public loginService : AppLoginService,
    private focusService : AppFocusService,
    private formBuilder : FormBuilder,
    private router : Router) { 
        
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
        this.loginForm.controls.loginPassword.value,).
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
      this.focusService.focusErrorHeader();
    }
  }

  loginErrors(err : any) : void {
    this.loginErrorMessageHeader = null;

    switch (err.code) {
    case AppLoginService.ERR_BAD_EMAIL_FORMAT:
      this.loginForm.controls.loginEmail.
        setErrors({badEmailFormat : true});
      break;
    case AppLoginService.ERR_TOO_MANY_REQUESTS:
      this.loginForm.setErrors({invalidLogin : true});
      this.loginErrorMessageHeader = 
        AppMessages.MSG_LOGIN_TOO_MANY_REQUESTS;
      break;
    default:
      this.loginForm.setErrors({invalidLogin : true});
      this.loginErrorMessageHeader = 
        AppMessages.MSG_LOGIN_INVALID_CREDENTIALS;
    }
  }

  getHeaderErrorMessage() : string {
    return this.loginErrorMessageHeader ? this.loginErrorMessageHeader : 
      AppFormHelper.getInstance().getErrorCountHeaderMessage(this.loginForm);
  }
}