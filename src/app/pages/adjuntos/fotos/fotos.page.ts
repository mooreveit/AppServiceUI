import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, LoadingController, NavParams, IonButton, IonFab, IonSelect } from '@ionic/angular';

import { OfdTipoDocumentoDto } from 'src/app/models/ofd-tipo-documento-dto';
import { OfdTipoDocumentoServiceService } from 'src/app/services/ofd-tipo-documento-service.service';
import { OfdTipoDocumentoQueryFilter } from 'src/app/interfaces/ofd-tipo-documento-query-filter';
import { ModalController } from '@ionic/angular';
import { FotoProviderService } from '../../../services/foto-provider.service';

//import { Storage } from '@ionic/storage';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CobAdjuntosCobranzaUploadDto } from 'src/app/models/cob-adjuntos-cobranza-dto';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralCobranzaService } from 'src/app/services/general-cobranza.service';

const PHOTOS_KEY: string = 'photos';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss']
  //providers: [Camera]
})
export class FotosPage implements OnInit {

    @ViewChild('cbo', { static: false }) cbo: IonSelect

    public loading: any

    public numeroDocumento: number = 0;
    public idTipoDocumento: number = 0;    
    public imageList: any[] = [];  
              
    public listOfdTipoDocumentoDto: OfdTipoDocumentoDto[] = [];
    
    ofdTipoDocumentoQueryFilter: OfdTipoDocumentoQueryFilter;

    constructor(
        public fps: FotoProviderService,        
        public navPar: NavParams,
        public lc: LoadingController,
        private ofdTipoDocumentoServiceService: OfdTipoDocumentoServiceService,
        private modalCtrl: ModalController,
        public ds: DataStorageService,
        public platform: Platform)
    { }

    ionViewWillEnter() { //or whatever method you want to use
        this.cbo.open()
    }
    
    ngOnInit() { 
       
        //recibe el numero de documento
        this.numeroDocumento = this.navPar.get('numeroDocumento');

        this.imageList = [];

        this.listOfdTipoDocumentoDto = JSON.parse(localStorage.getItem("listTipoDocumento"));
        console.log('Lista de tipo Documento', this.listOfdTipoDocumentoDto);

        if (!this.listOfdTipoDocumentoDto) {

            this.ofdTipoDocumentoQueryFilter = {
                idGrupoTipoDocumento: 2,
                nombreDocumento: '',
                idTipoDocumento: 0,
            };

            this.ofdTipoDocumentoServiceService.listTipoDocumento(this.ofdTipoDocumentoQueryFilter).subscribe(resp => {
                this.listOfdTipoDocumentoDto = resp.data;
                localStorage.setItem("listTipoDocumento", JSON.stringify(this.listOfdTipoDocumentoDto));
            });
        }
                    
        this.imageList = this.fps.loadSaved();       
        
    }
   

    eliminar(index) {

        //elimina un index de la lista
        this.imageList.splice(index, 1)  

        //persiste la lista de fotos
        this.fps.savePhotos(this.imageList);

        this.imageList = this.fps.loadSaved();
    }

    //Upload
    async onUpload()
    { 
        let valid: Boolean

        if (this.numeroDocumento > 0) {

            this.fps.presentConfirm('Subir adjuntos al servidor.', 'Confirma iniciar el proceso?', 'Cancel', 'OK').then(res => {

                if (res == 'ok') {
                                       
                    this.fps.upload().then(msg => {
                        
                        alert(msg.meta.message)
                    
                        if (msg.meta.isValid) { 

                            this.dismiss();

                        }
                    
                    }); 
                    
                }

            });
                
        }
    }

    //selecciona tipo de documento
    onChange(event)
    {
        this.idTipoDocumento = event.target.value;  
        
        if (this.idTipoDocumento > 0) {
            //llama al actionsheet           
            this.fps.presentActionSheet(this.numeroDocumento, this.idTipoDocumento)
        } 
      
    }

    //selecciona fuente de adjunto
    onChangeAdjunto(event) {

    }
    
    onAddToList() { 
        this.fps.presentActionSheet(this.numeroDocumento, this.idTipoDocumento)
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'documento': this.numeroDocumento
        });
    }
}
