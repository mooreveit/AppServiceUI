import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MtrClienteDto } from '../../../models/mtr-cliente-dto';
import { MtrClienteQueryFilter } from '../../../interfaces/mtr-cliente-query-filter';
import { ClienteService } from '../../../services/cliente.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-cliente',
  templateUrl: './search-cliente.page.html',
  styleUrls: ['./search-cliente.page.scss'],
})
export class SearchClientePage implements OnInit {
  @Input() userConectado;

  mtrClienteDto: MtrClienteDto[] = [];
  mtrClienteQueryFilter: MtrClienteQueryFilter;
  pageSize = 30;
  page = 0;
  codigoSeleccionado = "";
  show: boolean;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  constructor(private clienteService: ClienteService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.show = false;
    await this.refresh();

  }

  async refresh(event?) {

    this.show = true;
    this.mtrClienteQueryFilter = {
      usuario: this.userConectado,
      PageNumber: this.page,
      PageSize: this.pageSize,
      codigo: this.codigoSeleccionado,
      searchText: ""

    };

    await this.clienteService.ListClientesPorUsuario(this.mtrClienteQueryFilter).subscribe(resp => {
      this.show = false;
      if (resp.data.counts <= 0) {
        this.infiniteScroll.disabled = true;
        event.target.complete();
        return;
      }


      if (this.page > 1) {

        this.mtrClienteDto = this.mtrClienteDto.concat(resp['data']);


      } else {

        this.mtrClienteDto = resp.data;
      }

      /*if(event){
          event.target.complete();
      }*/


      console.log(this.mtrClienteDto);

    });

  }
  loadMore(event) {
    this.page++;
    console.log('Cargando datos...', this.page)

    this.refresh(event);
  }

  SelectClient(item) {
    console.log(item);
    this.codigoSeleccionado = item.codigo
    /*this.mtrClienteQueryFilter = {
      usuario: this.userConectado,
      PageNumber: this.page,
      PageSize: this.pageSize,
      codigo: this.codigoSeleccionado,
      searchText: ""

    };
    this.clienteService.ListDireccionesCliente(this.mtrClienteQueryFilter).subscribe(resp => {



      console.log(resp);

    });*/

    this.modalCtrl.dismiss({
      clienteSeleccionado: this.codigoSeleccionado,
      nombreCliente: item.nombre,
      idDireccion: item.idDireccion,
      mtrDireccionesDto: item.mtrDireccionesDto,
      rif: item.no_Reg_Tribut,

    });
  }

  onChangeSearchCliente(event) {
    console.log(event.target.value);
    this.codigoSeleccionado = event.target.value;
    console.log(this.codigoSeleccionado);
    this.mtrClienteDto = [];
    this.refresh(event);
  }

  onSalirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  onSalirConArgumentos() {
    this.modalCtrl.dismiss({
      clienteSeleccionado: this.codigoSeleccionado
    });
  }

}
