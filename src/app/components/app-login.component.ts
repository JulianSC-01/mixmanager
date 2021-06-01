import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppFormHelper } from 'src/app/modules/shared/helpers/app-form-helper';
import { AppLoginService } from 'src/app/services/app-login.service';

const LOGIN_EMAIL : string = "loginEmail";
const LOGIN_PASSW : string  = "loginPassword";

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent {

  public loginForm : FormGroup;
  public loginInProgress : boolean;
  public loginErrorMessage : string;

  private loginFormBuilder : FormBuilder;

  constructor(
    private loginService : AppLoginService,
    private router : Router) { 
      
    this.loginFormBuilder = new FormBuilder();
        
    this.loginForm = this.loginFormBuilder.group({
        loginEmail : ['', Validators.required],
        loginPassword : ['', Validators.required]
    });

    this.loginInProgress = false;
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
          }, 
          err => { 
            this.loginErrors(err);
            this.loginInProgress = false; 
          });
    }
  }

  loginErrors(err : any) : void {
    switch (err.code) {
    case AppLoginService.ERR_PASSWORD_ERROR:
        this.loginForm.controls[LOGIN_PASSW].
          setErrors({invalidPassword : true}); 
        break;
    default:
        this.loginForm.controls[LOGIN_EMAIL].
          setErrors({invalidEmail : true});
    }
        
    this.loginErrorMessage = err.message;
  }

  getHeaderErrorMessage() {
    return AppFormHelper.getInstance().getHeaderErrorMessage(this.loginForm);
  }
}
