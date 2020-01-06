import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Router } from '@angular/router';

//VALIDA QUE SEA UN CORREO SI O SI
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  passHide : boolean = true;
  constructor(
    public formB: FormBuilder,
    private _svgRegisterService: SvgRegisterService,
    private _router : Router
  ) {
    this._svgRegisterService.init()
   }

  ngOnInit() {
    this.loginform = this.formB.group({
      emailForm: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]),
      passForm: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmitLogin(){
    console.log('onSubmitLogin')
    this._router.navigate(['/main/proceso']);
  }

}
