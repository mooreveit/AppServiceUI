import { Component, OnInit } from '@angular/core';
import { CobAdjuntosCobranzaService } from '../../../services/cob-adjuntos-cobranza.service';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdjuntosCobranzaFilter } from '../../../interfaces/adjuntos-cobranza-filter';
import { CobGeneralCobranzaDto } from 'src/app/models/cob-general-cobranza-dto';
import { ModalController, Platform, LoadingController } from '@ionic/angular';

//movil
import { FotosPage } from '../fotos/fotos.page';
import { FotosShowPage } from '../fotos-show/fotos-show.page';

//web
import { FotosWebPage } from '../fotos-web/fotos-web.page';
import { FotosWebShowPage } from '../fotos-web-show/fotos-web-show.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],  
})
export class ListPage implements OnInit {

    filter: AdjuntosCobranzaFilter;
    itemcobGeneralCobranzaDto: CobGeneralCobranzaDto;

    //recibe el numero de doc enviado
    documentoId: any

    adjuntos = []    

    constructor(
                private cobac: CobAdjuntosCobranzaService,
                private activateRoute: ActivatedRoute,
                private router: Router,
                private platform: Platform,
                private modalCtrl: ModalController,
                private lc: LoadingController,
                private gensvc: GeneralService){}

    ngOnInit() {
       
        this.activateRoute.queryParams.subscribe(params => {

            //Lee objeto enviado desde Listado de Cobranzas
            if (this.router.getCurrentNavigation().extras.state) {

                this.itemcobGeneralCobranzaDto = this.router.getCurrentNavigation().extras.state.user;

                this.showHeader();

                console.log("El objeto recibido es:")
                console.log(this.itemcobGeneralCobranzaDto)
                console.log(this.itemcobGeneralCobranzaDto.documento)
                console.log("@@@@@@@")

                //numero de documento
                this.documentoId = this.itemcobGeneralCobranzaDto.documento

                this.refresh();

            }

        });
        
    }

    //Es llamado desde ngOnInit y desde la UI
    refresh() { 
        this.refreshList(this.documentoId); 
    }
    
    refreshList(numDoc: any) { 
        
        this.filter = {
            documento: +numDoc,
            pageSize: 100,
            pageNumber: 1,
        };

        const loading = this.lc.create({
            message: 'Por favor, espere...'
        });

        loading.then(o => {
            o.present();
        });

        this.cobac.GetAdjuntosByDcumento(this.filter).subscribe(response => {

            this.lc.dismiss();
            
            if (!response.meta.isValid) {
                alert(response.meta.message)
            }

            console.log(response)

            this.adjuntos = response.data          

        }), (error => {

            //todo trabajar esta promise
            this.lc.dismiss();
            alert(JSON.stringify(error))
        });
    
    }

    showHeader() { 

    }

    async adjuntosAdd() {

        if (this.documentoId > 0) {
            
            if (this.platform.is('cordova')) {

                //cargar Adjuntos Movil

                const modal = await this.modalCtrl.create({
                    component: FotosPage,
                    componentProps: { numeroDocumento: this.documentoId }
                });

                modal.onDidDismiss().then(data => {
                    
                    //num doc recibido del modal
                    let numDoc = data.data.documento

                    //refresco la lista
                    this.refreshList(numDoc);
                
                });
                
                return await modal.present();

            } else {

                //Cargar Adjuntos Browser

                const modal = await this.modalCtrl.create({
                    component: FotosWebPage,
                    componentProps: { numeroDocumento: this.documentoId }
                });

                modal.onDidDismiss().then(data => {

                    //num doc recibido del modal
                    let numDoc = data.data.documento

                    //refresco la lista
                    this.refreshList(numDoc);

                });

                return await modal.present();

            }


        }
        else {
            alert("Número de documento invalido.")
            return
        }
        
    }

    //regresa al Listado General de Cobranzas
    onGotoGrabacionCobranza() {

        let navigationExtras: NavigationExtras = {
            state: {
                user: this.itemcobGeneralCobranzaDto
            }
        };
        
        this.router.navigate(['menu/grabacion-cobranza-list/' + this.documentoId]);

    }

    //mostrar un adjunto como modal
    async showAdjunto(link: any) { 
        
        const modal = this.modalCtrl.create({
            component: FotosShowPage,
            componentProps: { link: link }
        });

        await modal.then(p => { 
            p.present();
        })

    }

    //View Image Mobile or Browser
    async openPreview(img: any) {

        if (this.platform.is('cordova')) {

            //UI para Cargar Adjuntos desde el Movil

            const modal = await this.modalCtrl.create({
                component: FotosShowPage,
                componentProps: { link: img }
            });

            modal.onDidDismiss().then(data => {

                //num doc recibido del modal
                //let numDoc = data.data.documento

                //refresco la lista
                //this.refreshList(numDoc);

            });

            return await modal.present();

        } else {

            //UI para Cargar Adjuntos desde el Browser

            const modal = await this.modalCtrl.create({
                component: FotosWebShowPage, 
                cssClass: 'fullscreen',
                componentProps: { link: img }
            });

            modal.onDidDismiss().then(data => {

                //num doc recibido del modal
                //let numDoc = data.data.documento

                //refresco la lista
                //this.refreshList(numDoc);

            });

            return await modal.present();

        }
    }
}
