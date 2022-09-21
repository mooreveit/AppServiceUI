import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { CobGrabacionCobranzasQueryFilter } from '../../../interfaces/cob-grabacion-cobranzas-query-filter';
import { CobGrabacionCobranzaDto } from '../../../models/cob-grabacion-cobranza-dto';
import { CobGrabacionCobranzasService } from '../../../services/cob-grabacion-cobranzas.service';
import { ToastController, ModalController, AlertController, IonItemSliding, ActionSheetController } from '@ionic/angular';
import { GrabacionCobranzaEditPage } from '../grabacion-cobranza-edit/grabacion-cobranza-edit.page';
import { CobEstadoCuentaQueryFilter } from '../../../interfaces/cob-estado-cuenta-query-filter';
import { CobEstadoCuentaService } from '../../../services/cob-estado-cuenta.service';
import { CobEstadoCuentaDto } from '../../../models/cob-estado-cuenta-dto';
import { GeneralCobranzaQueryFilter } from '../../../interfaces/general-cobranza-query-filter';
import { GeneralCobranzaService } from '../../../services/general-cobranza.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { CobGeneralCobranzaDto } from '../../../models/cob-general-cobranza-dto';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-grabacion-cobranza-list',
  templateUrl: './grabacion-cobranza-list.page.html',
  styleUrls: ['./grabacion-cobranza-list.page.scss'],
})
export class GrabacionCobranzaListPage implements OnInit {

  documento: number;
  idCliente: string;
  montoTransaccion: string;
  parametroId: string;
  pageSize = 30;
  page = 0;

  cobGrabacionCobranzasQueryFilter: CobGrabacionCobranzasQueryFilter;
  cobGrabacionCobranzaDto: CobGrabacionCobranzaDto[] = [];
  itemcobGrabacionCobranzaDto: CobGrabacionCobranzaDto = new CobGrabacionCobranzaDto();
  cobEstadoCuentaQueryFilter: CobEstadoCuentaQueryFilter;
  cobEstadoCuentaDto: CobEstadoCuentaDto[] = [];
  generalCobranzaQueryFilter: GeneralCobranzaQueryFilter;
  cobGeneralCobranzaDto: CobGeneralCobranzaDto;
  usuario: IUsuario;
  showLoading: boolean = false;


  constructor(public activateRoute: ActivatedRoute,
    public router: Router,
    public gs: GeneralService,
    public cobGrabacionCobranzasService: CobGrabacionCobranzasService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public cobEstadoCuentaService: CobEstadoCuentaService,
    public generalCobranzaService: GeneralCobranzaService,
    public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.usuario = this.gs.GetUsuario();
    this.parametroId = 'id';
    this.documento = +this.activateRoute.snapshot.params[this.parametroId];
    console.log("Id Item Recibido", this.documento);
    this.cobGeneralCobranzaDto = JSON.parse(localStorage.getItem("itemGeneralCobranza"));
    this.idCliente = this.cobGeneralCobranzaDto.idCliente;
    this.onRefresh();
  }

  async onClickDetail(item) {

    const modal = await this.modalCtrl.create({
      component: GrabacionCobranzaEditPage,
      componentProps: {
        detalleGrabacionCobranza: item
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    this.onRefresh();
  }

  onClickDelete(item: CobGrabacionCobranzaDto) {

    //El parametro 'item' contiene toda la informacion del item a eliminar,

    //slidingItem.close()



    //confirm
    this.gs.presentConfirm("Eliminar Item", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {




          this.cobGrabacionCobranzasService.delete(item)
            .subscribe(resp => {


              console.log('Cobranza Borrada******', resp);


            });
          this.onRefresh();
        }

      }

    )
  }


  async onClickAdd() {

    this.itemcobGrabacionCobranzaDto.documento = this.documento;
    this.itemcobGrabacionCobranzaDto.id = 0;
    const modal = await this.modalCtrl.create({
      component: GrabacionCobranzaEditPage,
      componentProps: {
        detalleGrabacionCobranza: this.itemcobGrabacionCobranzaDto
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    this.onRefresh();
  }

  onGotoRetencionesList(item) {


    localStorage.setItem("itemGrabacionCobranza", JSON.stringify(item));
    let navigationExtras: NavigationExtras = {
      state: {
        user: item
      }
    };

    this.router.navigate(['menu/retenciones-list/' + item.id]);

  }

  public async presentActionSheet(item) {
    console.log("cobGeneralCobranzaDto desde Present Action Sheet:***", this.cobGeneralCobranzaDto)
    console.log(item);
    if (this.cobGeneralCobranzaDto.idMtrTipoMoneda >= 1) {

      let actionSheet = this.actionSheetCtrl.create({
        header: 'Acciones...',
        buttons: [

          {
            text: 'Editar',
            icon: 'create-outline',
            handler: () => {
              this.onClickDetail(item);
            }
          },
          {
            text: 'Eliminar',
            icon: 'trash',
            handler: () => {
              this.onClickDelete(item);
            }
          },
          {
            text: 'Retenciones',
            icon: 'send-outline',
            handler: () => {
              this.onGotoRetencionesList(item);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });

      (await actionSheet).present()
    } else {

      let actionSheet = this.actionSheetCtrl.create({
        header: 'Acciones...',
        buttons: [

          {
            text: 'Editar',
            icon: 'create-outline',
            handler: () => {
              this.onClickDetail(item);
            }
          },
          {
            text: 'Eliminar',
            icon: 'trash',
            handler: () => {
              this.onClickDelete(item);
            }
          },

          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });

      (await actionSheet).present()

    }




  }

  onRefresh() {


    this.showLoading = true;
    this.generalCobranzaQueryFilter = {
      UsuarioConectado: this.usuario.user,
      IdOficina: "",
      vendedor: "",
      documento: this.documento,
      PageSize: 0,
      PageNumber: 0,
    };

    this.generalCobranzaService.GetAllGeneralCobranzasByDocumento(this.generalCobranzaQueryFilter).subscribe(respGen => {
      console.log('General Cobranza en list de Grabacion:', respGen.data);
      localStorage.setItem("itemGeneralCobranza", JSON.stringify(respGen.data));
      this.cobGeneralCobranzaDto = JSON.parse(localStorage.getItem("itemGeneralCobranza"));
      this.idCliente = this.cobGeneralCobranzaDto.idCliente
      localStorage.setItem("idCliente", this.idCliente);
      this.montoTransaccion = this.cobGeneralCobranzaDto.montoTransaccionString;


      this.cobGrabacionCobranzasQueryFilter = {

        documento: this.documento,
        pageSize: this.pageSize,
        pageNumber: this.page,
      };



      this.cobGrabacionCobranzasService.GetAllGrabacionCobranzas(this.cobGrabacionCobranzasQueryFilter)
        .subscribe(resp => {
          this.showLoading = false;
          this.cobGrabacionCobranzaDto = resp.data;
          console.log('Grabacion list refresh ******', this.cobGrabacionCobranzaDto);


        });




    });


  }

}


