import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { TypeDocument } from '@core/services/models/type-document/type-document';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Image } from '@core/interfaces/image-interface';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.scss']
})
export class CreateProcessComponent implements OnInit {

  registerPersonForm: FormGroup;
  // campo numberForm de los formularios registerPersonForm y registerCompanyForm
  public minLength: object = (new TypeDocument).documents;
  selectMinLength = 1;

  // pais select
  country: any;
  listCountry = [];

  //uploader cloudinary
@ViewChild('fbxFileInput', { static: false }) fileInputElement: ElementRef;
URL_UPLOAD_CLOUDINARY = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`;
URL_DELETE_CLOUDINARY = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
existImage: boolean = false;
imageDelete: any;
imagen: Image = {
  nombre: '',
  imagen: '',
};

public uploader: FileUploader;
  private hasBaseDropZoneOver: boolean = false;

  constructor(
    public _dashboardService: DashboardService,
    private router: Router,
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _svgRegisterService:SvgRegisterService,
    private cloudinary: Cloudinary,
    private renderer: Renderer,
    private _processService : ProcesosService
  ) { }

  ngOnInit() {

    this.registerPersonForm = this.formB.group({
      contratistaForm: new FormControl('', [
        Validators.required
      ]),
      tipoContratistaForm: new FormControl('', [
        Validators.required
      ]),
      tipoProcedimientoForm: new FormControl('', [
        Validators.required
      ]),
      numProcedimientoForm: new FormControl('', [
        Validators.required
      ]),
      añoProcesoForm: new FormControl('', [
        Validators.required
      ]),
      descripcionForm: new FormControl('', [
        Validators.required
      ]),
      fechaRecepcionForm: new FormControl(new Date()),
      itemsForm: new FormControl('', [
        Validators.required
      ]),

    });


    // Inicializamos el valor del pais selecionado
    this.country = {
      abbreviation: "pe",
      codePhone: "+51",
      name: "peru"
    }

    //CLOUDINARY CONFIG
    const uploaderOptions: FileUploaderOptions = {
      url: this.URL_UPLOAD_CLOUDINARY,
      autoUpload: true, // Cargar archivos automáticamente al agregarlos a la cola de carga
      isHTML5: true, // Use xhrTransport a favor de iframeTransport
      allowedMimeType: ['application/pdf', 'image/jpeg', 'image/png'],
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      removeAfterUpload: true, // Calcule el progreso de forma independiente para cada archivo cargado
      headers: [ // XHR request headers
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    const upsertResponse = fileItem => {
      console.log('fileItem', fileItem)
      // Check if HTTP request was successful
      if (fileItem.status !== 200) {
        console.log('Upload to cloudinary Failed');
        // console.log(fileItem);
        return false;
      }
      console.log('Upload to cloudinary');
      console.log(fileItem);
      console.log(fileItem.data.url);
      this.imagen.nombre = fileItem.file.name;
      this.imagen.imagen = fileItem.data.url;
      if (this.existImage) {
        this.deleteImage(this.imageDelete.data);
      }
      this.imageDelete = fileItem;
      this.existImage = true;

      // this.listaImagenes.push(fileItem.data.url);
      this.saveFileTemp(this.imagen.imagen, this.imagen.nombre, this.imageDelete.data.delete_token);
    }

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Agregue el preajuste de carga sin firmar de Cloudinary al formulario de carga
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('folder', 'proceso');

      // Add file to upload
      form.append('file', fileItem);
      // Usar el valor predeterminado "withCredentials" para las solicitudes CORS
      fileItem.withCredentials = false;
      return { fileItem, form };
    }

    // Actualizar el modelo al finalizar la carga de un archivo
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response),
        }
      );

       // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
    upsertResponse(
      {
        file: fileItem.file,
        progress,
        data: {}
      }
    );

    this.uploader.onWhenAddingFileFailed = (fileItem, filter) => {
      this.snackBar.open('Solo se acepta documentos PDF de máximo 5MB', 'error', {
        duration: 2000,
      });
    }

    this.uploader.onAfterAddingFile = f => {
      console.log("onAfterAddingFile");
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      // f.withCredentials = false;
    };

  }

  onPdocFormChange(e) {
    this.selectMinLength = e.value;
    // actualiza los validadores del campo numero de documento
    this.registerPersonForm.controls['pnumberForm'].setValidators([
      Validators.required,
      Validators.minLength(this.minLength[this.selectMinLength].length),
      Validators.maxLength(this.minLength[this.selectMinLength].length)
    ]);
    // vuelve a cargar la validacion del campo del formulario
    this.registerPersonForm.controls['pnumberForm'].updateValueAndValidity();
  }

  onSubmitPerson(miForm : NgForm){
    // miForm = this.registerPersonForm.value
    console.log('miForm',miForm.value)
    let data = {
      contract: miForm.value.contratistaForm,
      type_contract: miForm.value.tipoContratistaForm,
      type: miForm.value.tipoProcedimientoForm,
      number: miForm.value.numProcedimientoForm,
      year: miForm.value.añoProcesoForm,
      description: miForm.value.descripcionForm,
      date: miForm.value.fechaRecepcionForm,
      items: miForm.value.itemsForm
  }
  console.log('data a enviar',data)
    this._processService.setProcess(data).pipe(take(1))
      .subscribe(res=>{
        console.log('res',res)
      },(err : HttpErrorResponse)=>{
        console.log('err',err)
      })
  }

  //cloudinary
  onImageClicked() {
    this.renderer.invokeElementMethod(this.fileInputElement.nativeElement, 'click');
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    // console.log('drogOver: ',this.hasBaseDropZoneOver);
  }

  deleteImage = function (data: any) {
    console.log(data)
    const url = this.URL_DELETE_CLOUDINARY;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };
    this._http.post(url, body, options).subscribe(response => {
      // console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      // this.responses.splice(index, 1);
    });
  };

  saveFileTemp(urlFile: string, nameFile: string, tokenDelete: string) {
    const data = {
      rucTemporal: urlFile,
      rucOriginalName: nameFile,
      tokenDeleteCloud: tokenDelete
    };
    console.log("DATA: ", data);
  }

}
