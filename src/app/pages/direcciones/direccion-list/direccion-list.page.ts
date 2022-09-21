import { Component, OnInit, Input } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { ClienteService } from 'src/app/services/cliente.service';
import { GeneralService } from 'src/app/services/general.service';
import { MtrClienteQueryFilter } from '../../../interfaces/mtr-cliente-query-filter'
import { MtrDireccionesDto } from '../../../models/mtr-direcciones-dto';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-direccion-list',
  templateUrl: './direccion-list.page.html',
  styleUrls: ['./direccion-list.page.scss'],
})
export class DireccionListPage implements OnInit {

  mtrDireccionesDto : MtrDireccionesDto[] = [];
  mtrClienteQueryFilter : MtrClienteQueryFilter;
  usuario: IUsuario;
  searchText = "";
  @Input() idCliente;

  constructor(
              private clienteService: ClienteService,
              public gs: GeneralService,
              private modalCtrl: ModalController
              ) { }

  ngOnInit() {

    this.usuario = this.gs.GetUsuario();

    this.mtrClienteQueryFilter = {
      usuario: this.usuario.user,
      PageNumber: 0,
      PageSize: 0,
      codigo: this.idCliente,
      searchText: this.searchText

    };

    this.clienteService.ListDireccionesCliente(this.mtrClienteQueryFilter).subscribe(direccionesResult =>{
       this.mtrDireccionesDto = direccionesResult.data;

       console.log(this.mtrDireccionesDto);
    });
  }

  setIdDireccionEntrega(item){
    this.modalCtrl.dismiss({
     direccionEntregaCliente : item
    });
  }

}
