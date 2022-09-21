import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { AppUnitsQueryFilter } from 'src/app/interfaces/app-units-query-filter';
import { UnidadesMedidaService } from '../../services/unidades-medida.service';
import { AppUnitsGetDto } from '../../models/app-units-get-dto';
import { AppProductConversionGetDto } from 'src/app/models/app-product-conversion-get-dto';
import { AppProductConversionFilter } from 'src/app/interfaces/app-product-conversion-filter';
import { AppProductConversionService } from 'src/app/services/app-product-conversion.service';

@Component({
    selector: 'app-buscador-unidades',
    templateUrl: './buscador-unidades.component.html',
    styleUrls: ['./buscador-unidades.component.scss'],
})
export class BuscadorUnidadesComponent implements OnInit {

    private qryFilter = new AppUnitsQueryFilter()
    public listUnidades: AppUnitsGetDto[] = []

    public appProductConversionGetDto:AppProductConversionGetDto[]=[];
    private appProductConversionFilter= new AppProductConversionFilter();

    @Input() producto: number;
    constructor(private modalCtrl: ModalController, private unidadesMedidaService: UnidadesMedidaService,private appProductConversionService:AppProductConversionService) {
    }

    ngOnInit() {


        this.appProductConversionFilter.appProductsId;


        console.log("producto recibido", this.producto)
        this.qryFilter.searchtext = "";
        this.qryFilter.producto=this.producto;
        //Solicito unidades al servicio
         this.unidadesMedidaService.GetAllAppUnits(this.qryFilter).subscribe(res => {
            console.log("resultado de peticion de unidades de medida*******")
            console.log(res)

            this.listUnidades = res.data
        }) 

        this.appProductConversionFilter.appProductsId=this.producto;
        this.appProductConversionFilter.searchText = "";
        this.appProductConversionService.GetAllByAppProduct(this.appProductConversionFilter).subscribe(resConversion => {
            console.log("resultado de peticion de unidades de medida appProductConversionService")
            console.log(resConversion)
            this.appProductConversionGetDto = resConversion.data
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
        this.unidadesMedidaService.GetAllAppUnits(this.qryFilter).subscribe(res => {
            console.log("resultado de peticion de unidades de medida")
            console.log(res)

            this.listUnidades = res.data
        })
    }
     selectUnidadGeneral(item: AppUnitsGetDto) {

        this.modalCtrl.dismiss({
            id: item.id,
            descripcion: item.description1,
            appUnitsGetDto:item
        });

    }
    selectUnidad(item: AppProductConversionGetDto) {

        this.modalCtrl.dismiss({
            id: item.id,
            descripcion: item.appUnitsAlternativaDescription ,
            appProductConversion:item
        });

    }

    closeModal() {
        this.modalCtrl.dismiss()
    }
}
