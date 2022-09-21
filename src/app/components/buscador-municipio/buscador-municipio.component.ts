import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { MunicipioGetDto } from '../../models/municipio-get-dto';
import { MunicipioQueryFilter } from '../../interfaces/municipio-query-filter';

@Component({
  selector: 'app-buscador-municipio',
  templateUrl: './buscador-municipio.component.html',
  styleUrls: ['./buscador-municipio.component.scss'],
})
export class BuscadorMunicipioComponent implements OnInit {


  itemMunicipioGetDto: MunicipioGetDto;
  listMunicipioGetDto: MunicipioGetDto[] = [];

  municipioQueryFilter: MunicipioQueryFilter;

  constructor(private modalCtrl: ModalController, private router: Router,
    private clienteService: ClienteService,) { }

  ngOnInit() {


    this.municipioQueryFilter = {
      searchText: "",

    };

    this.clienteService.ListMunicipios(this.municipioQueryFilter).subscribe(resp => {
      this.listMunicipioGetDto = resp.data;
      console.log('Lista de municipios', this.listMunicipioGetDto)

    });


  }



  refresh() {


    this.clienteService.ListMunicipios(this.municipioQueryFilter).subscribe(resp => {
      this.listMunicipioGetDto = resp.data;

    });

  }

  onChangeSearchText(event) {
    console.log("Busqueda de municipio", event.target.value);
    this.municipioQueryFilter.searchText = event.target.value;
    this.refresh();
  }

  selectMunicipio(item: MunicipioGetDto) {

    this.modalCtrl.dismiss({
      itemMunicipio: item,

    });

  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

}
