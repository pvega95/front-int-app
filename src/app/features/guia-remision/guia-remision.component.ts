import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrls: ['./guia-remision.component.scss']
})
export class GuiaRemisionComponent implements OnInit {
  guiaForm : FormGroup
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.guiaForm = this.formB.group({
      pnameForm: new FormControl('', [
        Validators.required
      ]),
    });
  }

}
