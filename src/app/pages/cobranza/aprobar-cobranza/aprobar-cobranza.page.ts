import { Component, OnInit } from '@angular/core';
import { GeneralCobranzaQueryFilter } from '../../../interfaces/general-cobranza-query-filter';
import { IUsuario } from '../../../interfaces/iusuario';
import { GeneralService } from '../../../services/general.service';
import { GeneralCobranzaService } from '../../../services/general-cobranza.service';
import { Platform, ActionSheetController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { CobGeneralCobranzaDto } from '../../../models/cob-general-cobranza-dto';
import { CobGrabacionCobranzaDto } from '../../../models/cob-grabacion-cobranza-dto';

@Component({
  selector: 'app-aprobar-cobranza',
  templateUrl: './aprobar-cobranza.page.html',
  styleUrls: ['./aprobar-cobranza.page.scss'],
})
export class AprobarCobranzaPage implements OnInit {

  usuario: IUsuario;
  generalCobranzaQueryFilter: GeneralCobranzaQueryFilter;
  cobGeneralCobranzaDto: CobGeneralCobranzaDto[] = [];
  itemcobGeneralCobranzaDto: CobGeneralCobranzaDto;
  searchText: string;
  pageSize = 100;
  page = 0;
  role: number;
  constructor(private gs: GeneralService,

    private cobranzaService: GeneralCobranzaService,

    private platform: Platform,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public toastController: ToastController,
    public lc: LoadingController,
    private modalCtrl: ModalController) {

    this.usuario = this.gs.GetUsuario();
    this.role = +this.usuario.role;
  }

  async ngOnInit() {
    this.searchText = "";
    await this.refresh();
  }
  onChangeSearchText(event) {
    this.searchText = event.target.value;
    this.cobGeneralCobranzaDto = [];
    this.refresh();
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

    this.generalCobranzaQueryFilter = {
      UsuarioConectado: this.usuario.user,
      IdOficina: "",
      vendedor: "",
      documento: 0,
      PageSize: this.pageSize,
      PageNumber: this.page,
      searchText: this.searchText
    };



    console.log("Query Filter en refresh aprobar cobranza", this.generalCobranzaQueryFilter);

    const loading = this.lc.create({
      message: 'Por favor, espere...'
    });

    loading.then(o => {
      o.present();
    });

    this.cobranzaService.GetGeneralCobranzaPendienteAprobarPago(this.generalCobranzaQueryFilter)
      .subscribe(resp => {

        this.lc.dismiss();


        console.log(resp);
        this.cobGeneralCobranzaDto = resp.data;


      });

  }
  onClickDetail(item) {
    console.log(item);

    this.itemcobGeneralCobranzaDto = item;
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.itemcobGeneralCobranzaDto
      }
    };
    // this.router.navigate(['menu/cobranza-edit'], navigationExtras);

    this.router.navigate(['menu/cobranza-edit/' + this.itemcobGeneralCobranzaDto.documento]);

  }

  onClickDetailAdjunto(item) {

    console.log(item);

    this.itemcobGeneralCobranzaDto = item;

    let navigationExtras: NavigationExtras = {
      state: {
        user: this.itemcobGeneralCobranzaDto
      }
    };

    this.router.navigate(['menu/adjuntos-list'], navigationExtras);

  }


  public async presentActionSheet(item) {
    console.log(item);
    //si es un pago que no contiene impuesto y no se ha enviado a administracion

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
          text: 'Aprobar',
          icon: 'arrow-forward-circle-outline',

          handler: () => {
            this.onClickAprobar(item);
          }
        },

        {
          text: 'Devolver',
          icon: 'arrow-back-circle-outline',

          handler: () => {
            this.onClickDevolver(item);
          }
        },


        {
          text: 'Adjuntos',
          icon: 'cloud-download-outline',
          handler: () => {
            this.onClickDetailAdjunto(item);
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

  onClickAprobar(item: CobGeneralCobranzaDto) {

    console.log("Item Aprobar", item);

    console.log("totalDetalleCobrado", item.totalDetalleCobrado);
    let mensaje = "Confirme para proceder.";
    if (item.totalDetalleCobrado != 0) {

      mensaje = "Esta intentando Aprobar un recibo con diferencia, se generara un anticipo!!  Confirme para proceder...";

    }




    //confirm
    this.gs.presentConfirm("Aprobar?", mensaje, "Cancelar", "Aceptar").then(




      confirma => {

        if (confirma) {


          const loading = this.lc.create({
            message: 'Por favor, espere...'
          });

          loading.then(o => {
            o.present();
          });

          this.cobranzaService.AprobarPagonGeneralCobranzas(item)
            .subscribe(resp => {
              this.lc.dismiss();
              if (!resp.meta.isValid) {
                this.openToast(resp.meta.message, 'danger');
              } else {
                this.openToast(resp.meta.message, 'success');
              }

              console.log('Cobranza Enviada******', resp);

              this.refresh();
            });

        }

      }

    )
  }
  onClickDevolver(item: CobGrabacionCobranzaDto) {



    //confirm
    this.gs.presentConfirm("Devolver?", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {


          const loading = this.lc.create({
            message: 'Por favor, espere...'
          });

          loading.then(o => {
            o.present();
          });

          this.cobranzaService.DevolverPagoGeneralCobranzas(item)
            .subscribe(resp => {
              this.lc.dismiss();
              if (!resp.meta.isValid) {
                this.openToast(resp.meta.message, 'danger');
              } else {
                this.openToast(resp.meta.message, 'success');
              }

              console.log('Cobranza Enviada******', resp);

              this.refresh();
            });

        }

      }

    )
  }
}
