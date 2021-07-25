import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppFormHelper } from 'src/app/modules/shared/helpers/app-form-helper';
import { AppFocusService } from '../services/app-focus.service';
import { AppLoginService } from 'src/app/services/app-login.service';
import { AppMessages } from '../messages/app-messages';

const LOGIN_EMAIL : string = "loginEmail";
const LOGIN_PASSW : string  = "loginPassword";

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent implements AfterViewInit {

  public loginForm : FormGroup;
  public loginInProgress : boolean;
  public loginErrorMessageHeader : string;

  private loginFormBuilder : FormBuilder;

  constructor(
    private focusService : AppFocusService,
    public loginService : AppLoginService,
    private router : Router) { 
      
    this.loginFormBuilder = new FormBuilder();
        
    this.loginForm = this.loginFormBuilder.group({
        loginEmail : ['', Validators.required],
        loginPassword : ['', Validators.required]
    });

    this.loginInProgress = false;
  }

  ngAfterViewInit() : void {
    this.focusService.focusNavbar();
  }

  login() : void {
    if (this.loginForm.valid) {
      this.loginInProgress = true;
      this.loginService.login(
        this.loginForm.controls[LOGIN_EMAIL].value,
        this.loginForm.controls[LOGIN_PASSW].value).
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
      this.loginForm.controls[LOGIN_EMAIL].
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