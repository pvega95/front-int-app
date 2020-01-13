import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { TypeDocument } from '@core/services/models/type-document/type-document';
import { Image } from '@core/interfaces/image-interface';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {

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
  ) { 
    this._dashboardService.setDashboardStatus(true);
  }

  ngOnInit() {

    this.registerPersonForm = this.formB.group({
      pdocForm: new FormControl(1, [
        Validators.required
      ]),
      pnumberForm: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength[this.selectMinLength].length),
        Validators.maxLength(this.minLength[this.selectMinLength].length)
      ]),
      pemailForm: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]),
      pnameForm: new FormControl('', [
        Validators.required
      ]),
      psurnameForm: new FormControl('', [
        Validators.required
      ]),
      plastnameForm: new FormControl('', [
        Validators.required
      ]),
      ppassForm: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      pcountryForm: new FormControl('pe', [
        Validators.required
      ]),
      pphoneForm: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      pcodeForm: new FormControl('12345', [
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
    miForm = this.registerPersonForm.value
    console.log('miForm',miForm)
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

    // this._registerCompanyService.setCloudinaryTempCompany(data).pipe(take(1))
    //     .subscribe((res:any) =>{
    //       if (!res){
    //         this.snackBar.open('Ocurrio un error durante el Registro', 'error', {
    //           duration: 2000,
    //         });
    //       }
    //       const result = this._encrDecrService.getJson(res.value);
    //       console.log('saveFileTemp: ', result);
    //     }, (err: HttpErrorResponse) => {
    //       this.snackBar.open(err.error.message, 'error', {
    //         duration: 4000,
    //       });
    //     });
  }


}
