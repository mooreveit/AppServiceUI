import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../../interfaces/iusuario';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { CobGrabacionCobranzaDto } from '../../../models/cob-grabacion-cobranza-dto';
import { CobGeneralCobranzaDto } from '../../../models/cob-general-cobranza-dto';
import { CobPagoRetencionesQueryFilter } from '../../../interfaces/cob-pago-retenciones-query-filter';
import { CobPagosRetencionesService } from '../../../services/cob-pagos-retenciones.service';
import { CobPagoRetencionesDto } from 'src/app/models/cob-pago-retenciones-dto';
import { ModalController } from '@ionic/angular';
import { RetencionesEditPage } from '../retenciones-edit/retenciones-edit.page';

@Component({
  selector: 'app-retenciones-list',
  templateUrl: './retenciones-list.page.html',
  styleUrls: ['./retenciones-list.page.scss'],
})
export class RetencionesListPage implements OnInit {


  parametroId: string;
  idCobranza: number;
  itemcobGrabacionCobranzaDto: CobGrabacionCobranzaDto = new CobGrabacionCobranzaDto();
  cobGeneralCobranzaDto: CobGeneralCobranzaDto;
  cobPagoRetencionesDto: CobPagoRetencionesDto[] = [];

  itemcobPagoRetencionesDto: CobPagoRetencionesDto = new CobPagoRetencionesDto();
  usuario: IUsuario;
  cobPagoRetencionesQueryFilter: CobPagoRetencionesQueryFilter;
  pageSize = 30;
  page = 0;
  constructor(public activateRoute: ActivatedRoute,
    public router: Router,
    public gs: GeneralService,
    public cobPagosRetencionesService: CobPagosRetencionesService,
    public modalCtrl: ModalController) { }

  ngOnInit() {

    this.usuario = this.gs.GetUsuario();
    this.parametroId = 'id';
    this.idCobranza = +this.activateRoute.snapshot.params[this.parametroId];
    this.itemcobGrabacionCobranzaDto = JSON.parse(localStorage.getItem("itemGrabacionCobranza"));
    this.cobGeneralCobranzaDto = JSON.parse(localStorage.getItem("itemGeneralCobranza"));
    console.log("Id Item Recibido", this.idCobranza);
    console.log("itemcobGrabacionCobranzaDto", this.itemcobGrabacionCobranzaDto);
    console.log("cobGeneralCobranzaDto", this.cobGeneralCobranzaDto);
    this.onRefresh();
  }

  async onClickAdd() {
    console.log("Id Item Recibido add++++++", this.idCobranza);
    this.itemcobPagoRetencionesDto.idCobranza = this.idCobranza;
    this.itemcobPagoRetencionesDto.id = 0;

    const modal = await this.modalCtrl.create({
      component: RetencionesEditPage,
      componentProps: {
        itemcobPagoRetencionesDto: this.itemcobPagoRetencionesDto
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    this.onRefresh();
  }

  async onClickDetail(item) {

    this.itemcobPagoRetencionesDto.idCobranza = this.idCobranza;
    this.itemcobPagoRetencionesDto.id = item.id;
    this.itemcobPagoRetencionesDto = item;

    const modal = await this.modalCtrl.create({
      component: RetencionesEditPage,
      componentProps: {
        itemcobPagoRetencionesDto: this.itemcobPagoRetencionesDto
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    this.onRefresh();
  }



  onClickDelete(item: CobPagoRetencionesDto) {

    //El parametro 'item' contiene toda la informacion del item a eliminar,

    //slidingItem.close()



    //confirm
    this.gs.presentConfirm("Eliminar Item", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {




          this.cobPagosRetencionesService.delete(item)
            .subscribe(resp => {


              console.log('Retencion Borrada******', resp);


            });
          this.onRefresh();
        }

      }

    )
  }

  onRefresh() {




    this.cobPagoRetencionesQueryFilter = {

      idCobranza: this.idCobranza,
      pageSize: this.pageSize,
      pageNumber: this.page,
    };

    this.cobPagosRetencionesService.GetAllCobPagosRetenciones(this.cobPagoRetencionesQueryFilter)
      .subscribe(resp => {

        this.cobPagoRetencionesDto = resp.data;
        console.log('Retenciones list ******', this.cobPagoRetencionesDto);


      });
  }

}
