import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { AppUnitsQueryFilter } from 'src/app/interfaces/app-units-query-filter';
import { UnidadesMedidaService } from '../../../../services/unidades-medida.service';
import { AppUnitsGetDto } from '../../../../models/app-units-get-dto';

@Component({
    selector: 'app-buscador-unidades',
    templateUrl: './buscador-unidades.page.html',
    styleUrls: ['./buscador-unidades.page.scss'],
})
export class BuscadorUnidadesPage implements OnInit {

    private qryFilter = new AppUnitsQueryFilter()
    public listUnidades: AppUnitsGetDto[] = []

    constructor(private modalCtrl: ModalController, private unidadesMedidaService: UnidadesMedidaService) {
    }

    ngOnInit() {
        this.qryFilter.searchtext = "";

        //Solicito unidades al servicio
        this.unidadesMedidaService.GetAppUnitsWithConversion(this.qryFilter).subscribe(res => {
            console.log("resultado de peticion de unidades de medida")
            console.log(res)

            this.listUnidades = res.data
        })

        /*
        setTimeout(() => {
            this.searchText.setFocus();
        }, 150);
        */
    }

    onSearchUnidad(criterio: any) {
        this.qryFilter.searchtext = criterio;

        //Solicito unidades al servicio
        this.unidadesMedidaService.GetAppUnitsWithConversion(this.qryFilter).subscribe(res => {
            console.log("resultado de peticion de unidades de medida")
            console.log(res)

            this.listUnidades = res.data
        })
    }

    selectUnidad(item: AppUnitsGetDto) {

        this.modalCtrl.dismiss({
            id: item.id,
            descripcion: "(" + item.code + ") " + item.description4,
            isValid: true
        });

    }

    closeModal() {
        this.modalCtrl.dismiss({
            isValid: false
        })
    }
}
