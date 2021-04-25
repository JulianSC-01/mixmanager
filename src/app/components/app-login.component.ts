import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppLoginService } from 'src/app/services/app-login.service';

import { AppFormHelper } from 'src/app/modules/shared/helpers/app-form-helper';

const LOGIN_EMAIL : string = "loginEmail";
const LOGIN_PASSW : string  = "loginPassword";

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent implements OnInit {

  public loginForm : FormGroup;
  public loginInProgress : boolean;
  public loginErrorMessage : string;

  private loginFormBuilder : FormBuilder;

  constructor(
    private als : AppLoginService,
    private rtr : Router) { 
      
    this.loginFormBuilder = new FormBuilder();
        
    this.loginForm = this.loginFormBuilder.group({
        loginEmail : ['', Validators.required],
        loginPassword : ['', Validators.required]
    });

    this.loginInProgress = false;
  }

  ngOnInit(): void {
  }

  login() : void {
    if (this.loginForm.valid) {
      this.loginInProgress = true;
      this.als.login(
        this.loginForm.controls[LOGIN_EMAIL].value,
        this.loginForm.controls[LOGIN_PASSW].value).
        then( 
          () => {
            this.rtr.navigate(['/home']);
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
    case this.als.ERR_PASSWORD_ERROR:
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
