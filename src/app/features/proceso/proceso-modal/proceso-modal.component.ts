import { Component, OnInit, Inject } from '@angular/core';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-proceso-modal',
  templateUrl: './proceso-modal.component.html',
  styleUrls: ['./proceso-modal.component.scss']
})
export class ProcesoModalComponent implements OnInit {
  dataRecieved: any;
  constructor(
    private _processService : ProcesosService,
    public dialogRef: MatDialogRef<ProcesoModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dataRecieved = data;
    console.log(this.dataRecieved)
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  save() {
    let id = this.dataRecieved
    this._processService.setDeleteById(id).pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          // this.status = res.status;
          // console.log('status',this.status)
          this.dialogRef.close(res);
        }
      }, (err: HttpErrorResponse) => {
        console.log(err)
      });

  }

}
