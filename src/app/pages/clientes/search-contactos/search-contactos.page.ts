import { Component, OnInit, Input } from '@angular/core';
import { MtrClienteQueryFilter } from '../../../interfaces/mtr-cliente-query-filter';
import { MtrContactosDto } from '../../../models/mtr-contactos-dto';
import { GeneralService } from '../../../services/general.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { ClienteService } from '../../../services/cliente.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-contactos',
  templateUrl: './search-contactos.page.html',
  styleUrls: ['./search-contactos.page.scss'],
})
export class SearchContactosPage implements OnInit {


  mtrClienteQueryFilter: MtrClienteQueryFilter;
  listMtrContactosDto: MtrContactosDto[] = [];
  codigoSeleccionado = "";
  searchText = "";
  show: boolean;
  usuario: IUsuario;
  @Input() cliente;
  constructor(
    public gs: GeneralService,
    private clienteService: ClienteService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.usuario = this.gs.GetUsuario();
    console.log("Cliente recibido", this.cliente);
    this.refresh();
  }

  refresh() {

    this.mtrClienteQueryFilter = {
      usuario: this.usuario.user,
      PageNumber: 0,
      PageSize: 0,
      codigo: this.cliente,
      searchText: this.searchText,
      rif: ""
    };

    this.clienteService.ListContactosCliente(this.mtrClienteQueryFilter).subscribe(respContacto => {


      this.listMtrContactosDto = respContacto.data;

      console.log("list contactos: ", respContacto);

    },
      error => {

        this.show = false;
        console.log("en el error list contactos: ", error);
      });
  }
  SelectClient(item) {

    this.codigoSeleccionado = item.email;
    let idContacto = item.idContacto;

    this.modalCtrl.dismiss({
      emailSeleccionado: this.codigoSeleccionado,
      idContacto: idContacto,
      nombreContacto: item.nombre
    });
  }

  onChangeSearchCliente(event) {
    console.log(event.target.value);
    this.searchText = event.target.value;
    this.refresh();
  }

  onSalirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  onSalirConArgumentos() {
    this.modalCtrl.dismiss({
      emailSeleccionado: this.codigoSeleccionado,
    });
  }


}
