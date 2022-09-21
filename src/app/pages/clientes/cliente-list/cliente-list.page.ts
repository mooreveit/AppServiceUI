import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { MtrClienteDto } from '../../../models/mtr-cliente-dto';
import { MtrClienteQueryFilter } from '../../../interfaces/mtr-cliente-query-filter';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
})
export class ClienteListPage implements OnInit {

  @Input() userConectado;
  mtrClienteDto: MtrClienteDto[] = [];
  mtrClienteQueryFilter: MtrClienteQueryFilter;
  pageSize = 30;
  page = 0;
  codigoSeleccionado: string = "";

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  clienteList = [{ codigo: '', nombre: "" }];

  constructor(private modalCtrl: ModalController,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {

    this.refresh()

  }

  refresh(event?) {
    this.mtrClienteQueryFilter = {
      usuario: this.userConectado,
      PageNumber: this.page,
      PageSize: this.pageSize,
      searchText: ""

    };

    this.clienteService.ListClientesPorUsuario(this.mtrClienteQueryFilter).subscribe(resp => {

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

      if (event) {
        event.target.complete();
      }

      /*for (let clave of this.mtrClienteDto){
         
        let  cli =  {codigo: clave['codigo'], nombre: clave['nombre']};
      
        this.clienteList.push(cli);
  
      }*/
      console.log(this.mtrClienteDto);

    });

  }

  onChangeRC(event) {
    this.codigoSeleccionado = event.target.value;
    console.log(this.codigoSeleccionado);
  }
  loadMore(event) {
    this.page++;
    console.log('Cargando datos...', this.page)

    this.refresh(event);
  }
  onClickDetail(item) {
    this.modalCtrl.dismiss({
      clienteSeleccionado: item.codigo
    });
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
