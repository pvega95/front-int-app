import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

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
  // interfaz
  activeloadingfull = false;
  constructor(
    public formB: FormBuilder,
    private _svgRegisterService: SvgRegisterService,
    private _router : Router,
    private _authService : AuthService,
    private _snackBar: MatSnackBar
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

  onSubmitLogin(miForm){
    console.log('miForm',miForm.value);
    // this._router.navigate(['/main/proceso']);
    if (miForm.value){
      this.activeloadingfull = true;

      let data = {
        email : miForm.value.emailForm,
        password : miForm.value.passForm
      }
      this._authService.signIn(data).pipe(take(1))
        .subscribe(val =>{
          this.activeloadingfull = false;
          if (val){
            console.log('val',val)
            this.openSnackBar('Bienvenido: ' + val.userInfo.email , 'Gracias 😊')
            this._router.navigate(['/main/proceso']);
          }
          
        },
        (err:HttpErrorResponse)=>{
          this.activeloadingfull = false;
          console.log('err',err)
          this.openSnackBar(err.error,'Intentar de nuevo 🥺')
        });
    }
    
  }

  // signUp(miForm : NgForm){
  //     console.log('miForm',miForm.value)   
  //     let data = {
  //       email : miForm.value.emailForm,
  //       password : miForm.value.passForm
  //     }
  //     this._authService.login(data).pipe(take(1))
  //       .subscribe(val =>{
  //         console.log('val',val)
  //       },
  //       (err:HttpErrorResponse)=>{
  //         console.log('err',err)
  //       })
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
