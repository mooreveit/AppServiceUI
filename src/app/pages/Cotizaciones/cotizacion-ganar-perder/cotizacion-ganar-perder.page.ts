import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CotizacionesListService } from 'src/app/services/cotizaciones/cotizaciones-list.service';
import { AppGeneralQuotesGetDto } from '../../../models/app-general-quotes-get-dto';
import { AppDetailQuotesGetDto } from 'src/app/models/app-detail-quotes-get-dto';
import { ModalController } from '@ionic/angular';

import { CotizacionGanarPerderEditPage } from '../cotizacion-ganar-perder/cotizacion-ganar-perder-edit/cotizacion-ganar-perder-edit.page';
import { GeneralService } from '../../../services/general.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { AppGeneralQuotesQueryFilter } from '../../../interfaces/App-General-Quotes-Query-Filter';
@Component({
    selector: 'app-cotizacion-ganar-perder',
    templateUrl: './cotizacion-ganar-perder.page.html',
    styleUrls: ['./cotizacion-ganar-perder.page.scss'],
})
export class CotizacionGanarPerderPage implements OnInit {

    public cotizacion: AppGeneralQuotesGetDto;
    public appDetailQuotesGetDto: AppDetailQuotesGetDto[] = [];

    usuario: IUsuario;
    appGeneralQuotesQueryFilter: AppGeneralQuotesQueryFilter;
    constructor(private router: Router,
        private CotizacionesService: CotizacionesListService,
        private modalCtrl: ModalController,
        private gs: GeneralService,
    ) { }

    ngOnInit() {

        this.CotizacionesService.cotizacion$.subscribe(resp => {

            this.cotizacion = resp;

            this.appDetailQuotesGetDto = this.cotizacion.appDetailQuotesGetDto.filter(x => x.idEstatus == 2);
            console.log('En el oninit', this.appDetailQuotesGetDto);
        });

    }

    async editItem(item: AppDetailQuotesGetDto) {

        const modal = await this.modalCtrl.create({
            component: CotizacionGanarPerderEditPage,
            componentProps: {
                item: item
            }
        });

        await modal.present();
        const retorno = await modal.onDidDismiss();
        this.goListCotizacion(item);
    }
    goListCotizacion(item) {
        //{ state: { item: this.cotizacion } }
        console.log("valor de cotizacion a retornar desde ganara perder", item);

        this.refreshCotizacion(item.cotizacion);

    }
    refreshCotizacion(cotizacion: string) {




        this.usuario = this.gs.GetUsuario();

        this.appGeneralQuotesQueryFilter = {
            pageSize: 0,
            pageNumber: 1,
            usuarioConectado: this.usuario.user,
            cotizacion: "",
            searchText: cotizacion  //this.searchText
        };
        this.usuario = this.gs.GetUsuario();
        this.CotizacionesService.GetAllGeneralCotizacion(this.appGeneralQuotesQueryFilter)
            .subscribe(listCotizacionesResult => {
                this.CotizacionesService.allCotizaciones$.next(listCotizacionesResult.data);
                this.cotizacion = listCotizacionesResult.data[0];
                this.appDetailQuotesGetDto = this.cotizacion.appDetailQuotesGetDto.filter(x => x.idEstatus == 2);

                if (this.appDetailQuotesGetDto == null || this.appDetailQuotesGetDto.length == 0) {

                    this.router.navigate(['/menu/cotizaciones-list'], {});
                }



            });



    }
}