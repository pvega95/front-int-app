import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  passHide: boolean = true;
  constructor(
    public formB: FormBuilder,
    private _svgRegisterService: SvgRegisterService,
    private _router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) { 
    this._svgRegisterService.init()
  }

  ngOnInit() {
    this.registerForm = this.formB.group({
      emailForm: new FormControl('', [
        Validators.required,
      ]),
      passForm: new FormControl('', [
        Validators.required,
      ])
    });
  }

  onSubmitLogin(miForm) {
    let data = {
      email: miForm.value.emailForm,
      password: miForm.value.passForm
    }
    this._authService.login(data).pipe(take(1))
      .subscribe(val => {
    
        this.openSnackBar(val.message,'ok')
        this._router.navigate(['/login']);
      },
        (err: HttpErrorResponse) => {
        
          this.openSnackBar(err.error.message,'ok')
          
        })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
