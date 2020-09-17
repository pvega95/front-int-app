import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take, takeWhile, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Subscription, timer } from 'rxjs';
import { TIMER } from '@core/constantes/timer';

//VALIDA QUE SEA UN CORREO SI O SI
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginform: FormGroup;
  passHide : boolean = true;
  activeloadingfull = false;
  timer: number = TIMER.SESSION_TIME;
  private subscriptions : Subscription = new Subscription();

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
    this.generateTime();
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

  onSubmitLogin(miForm) {
   
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
            this._authService.setToken(val.token);
            this.openSnackBar('Bienvenido' , 'Gracias 😊')
            this._router.navigate(['/main/proceso']);
          }
          
        },
        (err:HttpErrorResponse)=>{
          this.activeloadingfull = false;
         
          this.openSnackBar(err.error,'Intentar de nuevo 🥺')
        });
    }
    
  }

  generateTime() {
    this.subscriptions.add(timer(0, 1000) //Initial delay 1 seconds and interval countdown also 1 second
      .pipe(
        takeWhile(() => this.timer > 0),
        tap(() => this.timer--)
      )
      .subscribe((x)=>{
      },
      ()=>{

      },
      ()=>{
        this.reloadPage();
      }
      ));
  }

  reloadPage() {
    if(this.timer === 0) {
      window.location.reload();
    }

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
