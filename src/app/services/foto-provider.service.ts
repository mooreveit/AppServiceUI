import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { ActionSheetController, Platform, LoadingController, ToastController, AlertController} from '@ionic/angular';

//camara
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

import { GeneralService } from '../services/general.service';
import { IUsuario } from '../interfaces/iusuario';
import { CobAdjuntosCobranzaDto, CobAdjuntosCobranzaUploadDto } from '../models/cob-adjuntos-cobranza-dto';
import { ListPageRoutingModule } from '../pages/adjuntos/list/list-routing.module';

import { DataStorageService } from '../services/data-storage.service';

declare var cordova: any;

const PHOTOS_KEY: string = 'photos';

class Photo {  
    key: number;
    numeroDocumento: any;
    idTipoDocumento;
    header: any;
    extension: any;
    data: any;
    base64: any;
}

@Injectable({
  providedIn: 'root'
})
export class FotoProviderService {

    public numeroDocumento: number = 0;
    public idTipoDocumento: number = 0;

    public photos: Photo[] = [];

    cameraOptions: CameraOptions;

    constructor(        
        public gs: GeneralService,
        public imagePicker: ImagePicker,        
        public camera: Camera,        
        public file: File,        
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,       
        public http: HttpClient,
        public storage: Storage,
        public ds: DataStorageService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) { }
    
    //Load app gallery
    public loadSaved(): any {
       
        let res = this.ds.readDataAsJSON(PHOTOS_KEY);

        this.photos = res || [];

        return this.photos

    }
    
    //Add photo
    public addPhoto(base64data: any) {

        //50 asegura tomar el header completo
        let header = base64data.substr(0, 50)

        let head = this.getHeader(header)
        let ext = this.getExtension(header)
        let data = this.getData(base64data)

        let dataObject = {
            key: this.photos.length + 1,
            numeroDocumento: this.numeroDocumento,
            idTipoDocumento: this.idTipoDocumento,
            header: head,
            extension: ext,
            data: data,
            base64: base64data
        }

        //Add to photos array
        this.photos.unshift(dataObject)
        
        //this.savePhotosToDb()

    }


    public async presentActionSheet(_numeroDocumento: number = 0, _idTipoDocumento: number = 0) {

        //numero y tipo de documento
        this.numeroDocumento = _numeroDocumento;
        this.idTipoDocumento = _idTipoDocumento
    
        let actionSheet = this.actionSheetCtrl.create({
            header: 'Cargar adjunto(s) desde...',
            buttons: [
                {
                    text: 'La Galería',
                    handler: () => {
                        this.pickPicture();
                    }
                },
                {
                    text: 'La Cámara',
                    handler: () => {
                        this.takePicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });

        (await actionSheet).present()
    }

    //PICK PICTURE - GALLERY
    pickPicture() {

        //this.camera.PictureSourceType.PHOTOLIBRARY

        let options: ImagePickerOptions = {
            quality: 50,
            outputType: 1,    //FILE_URI,  1=DATA_URL
            maximumImagesCount: 10
        };

        this.imagePicker.getPictures(options).then(selectedImg => {

            selectedImg.forEach(i => {

                let path = i.substr(0, i.lastIndexOf('/') + 1);
                let filename = i.substring(i.lastIndexOf('/') + 1);

                this.file.readAsDataURL(path, filename).then((base64data) => {
                                      
                    this.addPhoto(base64data)  
                    
                    this.savePhotosToDb()

                })

            });            

        })

    }


    //TAKE PICTURE - CAMERA
    takePicture() {
        //this.camera.PictureSourceType.CAMERA

        let options: CameraOptions = {
            quality: 50,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };

        this.camera.getPicture(options).then(imageData => {

            let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
            let fileName = imageData.substring(imageData.lastIndexOf('/') + 1);

            this.file.readAsDataURL(path, fileName).then(base64data => {

                this.addPhoto(base64data)

                this.savePhotosToDb()

            })
        })
    }

    //Devuelve la entension del archivo de imagen tomado de la galeria o de la camara
    //extrayendola desde el header: data:image/jpeg;base64,
    getExtension(header: string): string{ 
        
        header = header.toLowerCase()

        let extension = ""
        
        if (header.includes('data')) {
            
            let from = header.indexOf('/') + 1
            
            let to = header.indexOf(';')
            
            extension = "." + header.substring(from, to)
        }
        
        return extension
    }

    //Devuelve el header del archivo de imagen tomado de la galeria o de la camara
    //extrayendola desde el header: data:image/jpeg;base64,
    getHeader(header: string): string {

        header = header.toLowerCase()

        let result = ""

        if (header.includes('data')) {

            let from = 0

            let to = header.indexOf(',') + 1

            result = header.substring(from, to)
        }

        return result
    }

    //Devuelve el base64 (data)
    getData(data: string): string {

        let result = ""

        let from = data.indexOf(',') + 1

        result = data.substring(from)

        return result
    }


    //Return array with photos
    public getPhotos(): any {
    
        return this.photos
    
    }

    async presentToast(text) {
        let toast = await this.toastCtrl.create({
            message: text,
            duration: 2500,
            position: 'top'
        });
        toast.present();
    }

    //--------------------------------------------------------------------------

    async presentConfirm(header: any, message: any, cancelText: any, okText: any): Promise<any> {
        return new Promise(async (resolve) => {
            const alert = await this.alertCtrl.create({
                header: header,
                message: message,
                buttons: [
                    {
                        text: cancelText,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (cancel) => {
                            resolve('cancel');
                        }
                    }, {
                        text: okText,
                        handler: (ok) => {
                            resolve('ok');
                        }
                    }
                ]
            });
            alert.present();
        });
    }
    
    //clear array 
    async clearAll() {
        this.photos = []
        this.savePhotos(this.photos)
    }


    //Save array
    async savePhotos(imagesList: any) {

        //actualiza lista de imagenes del servicio
        this.photos = imagesList

        this.ds.saveObject(PHOTOS_KEY, this.photos)
    }


    //Graba array de photos
    async savePhotosToDb() {
        this.ds.saveObject(PHOTOS_KEY, this.photos)
    }
    

    //Upload images - Called from web version
    public  async uploadFromWebVersion(imagesList: any) {
        
        this.photos = [];
        
        //update images aarray
        imagesList.forEach(item => { 
            this.addPhoto(item.base64);            
        });

        //save images & upload
        return await this.savePhotosToDb().then(r => {
            return this.upload();            
        });
                
    }

    
    public async upload() {
       
        //Arry de imagenes a subir al server
        let vmList: CobAdjuntosCobranzaDto[] = []

        let contador = 0

        let usuario: IUsuario

        usuario = this.gs.GetUsuario()

        //Mensaje del proceso
        let mensajes: CobAdjuntosCobranzaUploadDto = new CobAdjuntosCobranzaUploadDto();
        
        mensajes.Valid = false
        mensajes.Message="No hay fotos para procesar."

        //cargo lista con imagenes 
        this.photos.forEach(function (item) {
                                    
            //prepara la view model por cada foto a subir
            let vm = new CobAdjuntosCobranzaDto()
                
            contador += 1

            vm.Documento = item.numeroDocumento,
                
            vm.IdTipoDocumento = item.idTipoDocumento,
        
            vm.Indice = item.key,    //key asignado a cada foto al añadirla a la lista

            vm.Header = item.header,

            vm.Extension = item.extension,
                
            vm.Data = item.data,
                                        
            vm.IdUsuarioCreacion = usuario.user,
        
            vm.NombreArchivo = "",              //se asigna en la api +++
            
            vm.Valid = false
                
            //añado objeto a la lista
            vmList.push(vm)
                
            vm = null
                
        });

        let promise = new Promise(resolve => { } )

        if (vmList.length > 0) {
        
            //Spinner
            const loading = this.loadingCtrl.create({
                message: 'Por favor, espere...'
            });

            loading.then(o => {
                o.present();
            }); 

            return this.PostImage(vmList).then(response => {
    
                //Oculta el spinner
                this.loadingCtrl.dismiss();
                
                if (!response.meta.isValid) {                    
                    //Envio Invalido  
                    
                    return response
                }
                else {

                    //Envio Fue Valido                                

                    //en response.data vienen las imagenes q no se pudieron grabar y deben ser subidas nuevamente
                    let filtered = this.photos.filter((foto) => response.data.find(o => foto.key === o.Indice))

                    //Borra del dispositivo las imagenes enviadas
                    this.clearAll()

                    //establezco nuevo array de photos a subir
                    this.photos = filtered

                    //persisto nuevo array de photos
                    this.savePhotosToDb()

                    return response
                    
                }
                
            });

        }
              
        return promise;
        
    }

    PostImage(vmList: CobAdjuntosCobranzaDto[]) {

        try {
            let basePath = this.gs.basePath;

            let controller = 'CobAdjuntosCobranza/';

            let accionPath = "PostImage";

            let jsonData = JSON.stringify(vmList);   
                       
            const promise = this.http.post<any>(basePath + controller + accionPath, jsonData).toPromise();

            return promise.then((response) => {               

                return response;

            }, (error) => {
                                  
                alert(error);

            });

        }
        catch (err) {
            return  err.message;
        }

    }
    
}

