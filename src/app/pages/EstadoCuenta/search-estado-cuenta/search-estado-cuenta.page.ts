import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CobEstadoCuentaDto } from '../../../models/cob-estado-cuenta-dto';
import { CobEstadoCuentaQueryFilter } from '../../../interfaces/cob-estado-cuenta-query-filter';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { CobEstadoCuentaService } from '../../../services/cob-estado-cuenta.service';

@Component({
  selector: 'app-search-estado-cuenta',
  templateUrl: './search-estado-cuenta.page.html',
  styleUrls: ['./search-estado-cuenta.page.scss'],
})
export class SearchEstadoCuentaPage implements OnInit {

  @Input() cliente;

  estadoCuentaDto: CobEstadoCuentaDto[] = [];
  estadoCuentaQueryFilter: CobEstadoCuentaQueryFilter;
  pageSize = 30;
  page = 0;
  codigoSeleccionado = 0;
  showLoading: boolean = false;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  constructor(private cobEstadoCuentaService: CobEstadoCuentaService,
    private modalCtrl: ModalController,
    public toastController: ToastController) { }


  async ngOnInit() {
    console.log("Cliente recibido search estado cuenta:::::::", this.cliente);
    await this.refresh();

  }
  onChangeSearchDocumento(event) {
    console.log(event.target.value);
    this.codigoSeleccionado = event.target.value;
    console.log(this.codigoSeleccionado);
    this.estadoCuentaDto = [];
    this.refresh(event);
  }

  SelectDocumento(item) {


    this.modalCtrl.dismiss({
      documentoSeleccionado: item.id,
      documentoSeleccionadoObj: item
    });
  }
  Salir(event) {
    this.modalCtrl.dismiss();
  }
  async openToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      color

    });
    toast.present();
  }
  async refresh(event?) {
    this.estadoCuentaQueryFilter = {
      idCliente: this.cliente,
      pageNumber: this.page,
      pageSize: this.pageSize,
      documento: this.codigoSeleccionado

    };
    this.showLoading = true;
    await this.cobEstadoCuentaService.getEstadoCuenta(this.estadoCuentaQueryFilter).subscribe(resp => {
      this.showLoading = false;
      console.log("Estado de cuenta **********Resp:", resp);
      if (!resp.meta.isValid) {
        this.openToast(resp.meta.message, 'danger');
      }

      localStorage.setItem("estadoCuenta", JSON.stringify(resp.data));

      if (resp.data.counts <= 0) {
        this.infiniteScroll.disabled = true;
        event.target.complete();
        return;
      }


      if (this.page > 1) {

        this.estadoCuentaDto = this.estadoCuentaDto.concat(resp['data']);


      } else {

        this.estadoCuentaDto = resp.data;
      }

      if (event) {
        event.target.complete();
      }


      console.log(this.estadoCuentaDto);

    });

  }
  loadMore(event) {
    this.page++;
    console.log('Cargando datos...', this.page)

    this.refresh(event);
  }
}
