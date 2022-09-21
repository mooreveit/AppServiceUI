import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppCompetidorGetDto } from 'src/app/models/app-competidor-get-dto';
import { CotizacionesListService } from 'src/app/services/cotizaciones/cotizaciones-list.service';

@Component({
  selector: 'app-buscador-competidor',
  templateUrl: './buscador-competidor.page.html',
  styleUrls: ['./buscador-competidor.page.scss'],
})
export class BuscadorCompetidorPage implements OnInit {

  appCompetidorGetDto : AppCompetidorGetDto[] = [];
  filter : any;

  constructor(
    private CotizacionesService: CotizacionesListService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.CotizacionesService.allCompetidores$.subscribe(result =>{
      this.appCompetidorGetDto = result.data;
    });

    this.filter = {
        "CodCompetidor":0,
        "SearchText":""
   }

    this.CotizacionesService.GetAllCompetidorGanarPerder(this.filter)
  }

  onChangeSearchText(event) {
    this.filter.searchText = event.target.value; 
    this.CotizacionesService.GetAllCompetidorGanarPerder(this.filter)
  }

  SelectCompetidor(data){
    console.log(data);

    this.modalCtrl.dismiss({
      competidor : data
    });

  }

}
