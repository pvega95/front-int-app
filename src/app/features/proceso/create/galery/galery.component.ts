import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from '@core/interfaces/image-interface';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { CloudService } from '@core/services/cloud/cloud.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {

  idProcess: string;
  images: any = [];

  // interfaz
  activeloadingfull = false;

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
  public hasBaseDropZoneOver: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cloudinary: Cloudinary,
    private renderer: Renderer,
    public snackBar: MatSnackBar,
    private _location: Location,
    private _svgRegisterService:SvgRegisterService,
    private _cloudService : CloudService
  ) { 
    this._svgRegisterService.init();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params) {
        this.idProcess = params.id;
      }
    });

    this.getDocumentos();

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

    //END CLOUDINARY CONFIG

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
    // this._http.post(url, body, options).subscribe(response => {
    //   // console.log(`Deleted image - ${data.public_id} ${response.result}`);
    //   // Remove deleted item for responses
    //   // this.responses.splice(index, 1);
    // });
  };

  saveFileTemp(urlFile: string, nameFile: string, tokenDelete: string) {
    const data = {
      docTemporal: urlFile,
      docOriginalName: nameFile,
      tokenDeleteCloud: tokenDelete
    };
    console.log("DATA: ", data);

    this.subirDocumentos(data)
  }

  goback(){
    this._location.back();
  }

  subirDocumentos(fileTemp : any){
    let data = {
      name : fileTemp.docOriginalName,
      url : fileTemp.docTemporal,
      ref : this.idProcess
    }
    console.log('data a enviar', data);

    this._cloudService.setCloudDocument(data).pipe(take(1)).subscribe(
      val=>{
        console.log('val',val);
        this.getDocumentos();
      },
      (err:HttpErrorResponse)=>{
        console.log('err',err);
      }
    )
    
  }

  getDocumentos(){
    this.activeloadingfull = true;
    this._cloudService.getCloudDocumentById(this.idProcess).pipe(take(1)).subscribe(
      val=>{
        this.activeloadingfull = false;
        this.images = val;
        console.log('this.images',this.images);
        
      },
      (err:HttpErrorResponse)=>{
        this.activeloadingfull = false;
        console.log('err',err);
      }
    )
  }
  
  verImagen(url)  {
    window.open(url)
  }

}
