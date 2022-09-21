import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavParams, LoadingController, Platform } from '@ionic/angular';

import { OfdTipoDocumentoDto } from 'src/app/models/ofd-tipo-documento-dto';
import { OfdTipoDocumentoServiceService } from 'src/app/services/ofd-tipo-documento-service.service';
import { OfdTipoDocumentoQueryFilter } from 'src/app/interfaces/ofd-tipo-documento-query-filter';
import { FotoProviderService } from 'src/app/services/foto-provider.service';

@Component({
    selector: 'app-fotos-web',
    templateUrl: './fotos-web.page.html',
    styleUrls: ['./fotos-web.page.scss'],
})
export class FotosWebPage implements OnInit {

    //file selector
    @ViewChild('selector') selector: ElementRef;

    public message: string = "";
    public maxFotos: number = 10;
    public numeroDocumento: any;
    public idTipoDocumento: number = 0;
    public imageList: any[] = [];
    public listOfdTipoDocumentoDto: OfdTipoDocumentoDto[] = [];
    ofdTipoDocumentoQueryFilter: OfdTipoDocumentoQueryFilter;


    //Variables para File upload   
    public imagePath: any;
    public base64: any;
    public base64Array: any[] = [];

    constructor(private modalCtrl: ModalController,
        public fps: FotoProviderService,
        public navPar: NavParams,
        public lc: LoadingController,
        private ofdTipoDocumentoServiceService: OfdTipoDocumentoServiceService,
        public platform: Platform
    ) { }

    ngOnInit() {
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

    }

    dismiss() {
        this.modalCtrl.dismiss({
            'documento': this.numeroDocumento
        });
    }


    //selecciona tipo de documento
    onChange(event) {
        this.idTipoDocumento = event.target.value;
    }


    //llamado desde el selector de imagenes
    onSelectorChange(event) {

        var reader = new FileReader();

        var f = this.selector.nativeElement.files;

        //console.log(f[0].name)

        console.log(f.length)

        let i = 0;

        for (i = 0; i < f.length; i++) {

            console.log(f[i].name)

            this.addImagesToArray(f[i])

        }

    }


    addImagesToArray(o: any) {

        var reader = new FileReader();

        // 2 step
        //con la funcion arrow, this se refiere a una variable de la clase
        reader.onloadend = () => {

            this.base64 = reader.result;

            this.base64Array.unshift({ base64: reader.result })

        }

        // 1 step
        reader.readAsDataURL(o);

    }

    eliminar(ndx) {

        //elimina un index de la lista
        this.base64Array.splice(ndx, 1)

        //persiste la lista de fotos
        //this.fps.savePhotos(this.imageList);

        //this.imageList = this.fps.loadSaved();

        //elimino imagen del selector
        var f = this.selector.nativeElement.files;

        f.splice(ndx, 1);

    }


    //Valida si el boton de upload se oculta o no
    validHide(): boolean {
        return this.base64Array.length <= 0 ? true : false
    }


    //valida si el boton de upload se deshabilita o no cuando se excede el numero max de fotos
    //logica invertida...y no me preguntes...
    validDisabled(): boolean {

        let deshabilitado = (this.idTipoDocumento <= 0 || this.base64Array.length > this.maxFotos) ? true : false;

        return deshabilitado;
    }


    //Subir fotos al servidor
    onUpload() {

        if (this.base64Array.length > 0) {
            console.log("array image", this.base64Array);
            this.fps.numeroDocumento = this.numeroDocumento
            this.fps.idTipoDocumento = this.idTipoDocumento

            this.fps.presentConfirm('Subir adjuntos al servidor.', 'Confirma iniciar el proceso?', 'Cancel', 'OK').then(res => {

                if (res == 'ok') {

                    this.fps.uploadFromWebVersion(this.base64Array).then(msg => {

                        //mensaje desde el servidor
                        alert(msg.meta.message);

                        if (msg.meta.isValid == true) {

                            //envio valido, las quita de localStorage
                            localStorage.setItem('photos', '[]')

                            this.base64Array = [];

                            //Cierro la UI y regreso a la lista de adjuntos                            
                            this.modalCtrl.dismiss({
                                'documento': this.numeroDocumento
                            });

                        } else {

                            //si el envio no fue valido, refresca la lista de imagenes

                            this.base64Array = [];

                            this.fps.getPhotos().forEach(foto => {

                                this.base64Array.unshift({ base64: foto.base64 });

                            });

                            alert();

                        }

                    });

                }

            });

        }
    }

}
