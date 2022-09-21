import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { MtrOficinaServiceService } from '../../../services/mtr-oficina-service.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { MtrOficinaQueryFilter } from '../../../interfaces/mtr-oficina-query-filter';
import { MtrOficinaDto, Oficina } from '../../../models/mtr-oficina-dto';
import { GeneralCobranzaService } from '../../../services/general-cobranza.service';
import { GeneralCobranzaQueryFilter } from '../../../interfaces/general-cobranza-query-filter';
import { CobGeneralCobranzaDto } from '../../../models/cob-general-cobranza-dto';

import { IonInfiniteScroll, Platform, ActionSheetController, IonItemSliding, ToastController, LoadingController, ModalController } from '@ionic/angular';

import { MtrVendedorDto } from '../../../models/mtr-vendedor-dto';
import { MtrVendedorService } from '../../../services/mtr-vendedor.service';
import { MtrVendedorQueryFilter } from '../../../interfaces/mtr-vendedor-query-filter';
import { NavigationExtras, Router } from '@angular/router';
import { CobGrabacionCobranzaDto } from '../../../models/cob-grabacion-cobranza-dto';
import { FotosShowPage } from '../../adjuntos/fotos-show/fotos-show.page';
import { AppGeneralQuotesQueryFilter } from '../../../interfaces/App-General-Quotes-Query-Filter';
import { AppGeneralQuotesGetDto } from '../../../models/app-general-quotes-get-dto';
import { CondicionPagoQueryFilter } from '../../../interfaces/condicion-pago-query-filter';

@Component({
  selector: 'app-general-cobranza-list',
  templateUrl: './general-cobranza-list.page.html',
  styleUrls: ['./general-cobranza-list.page.scss'],
})
export class GeneralCobranzaListPage implements OnInit {


  usuario: IUsuario;
  mtrOficinaQueryFilter: MtrOficinaQueryFilter;
  generalCobranzaQueryFilter: GeneralCobranzaQueryFilter;

  documento: number = 0;
  searchText: string = "";

  mtrOficinaDto: MtrOficinaDto[] = [];
  mtrOficinaSelected: string = "";

  pageSize = 5;
  page = 0;

  oficinas: Oficina[] = [{ codigo: '', descripcion: 'Select' }];

  cobranzaList = [{ IdCliente: '', MontoTransaccion: 0 }];

  cobGeneralCobranzaDto: CobGeneralCobranzaDto[] = [];

  mtrVendedoresDto: MtrVendedorDto[] = [];
  mtrVendedoresDtoAll: MtrVendedorDto[] = [];
  mtrVendedorQueryFilter: MtrVendedorQueryFilter;
  mtrVendedorSelected: string = "";

  itemcobGeneralCobranzaDto: CobGeneralCobranzaDto;

  defaultOficina: number = 2;
  compareWith: any;
  role: number;

  show: boolean;
  showLoading: boolean = false;

  appGeneralQuotesQueryFilter: AppGeneralQuotesQueryFilter;
  appGeneralQuotesGetDto: AppGeneralQuotesGetDto[] = [];
  condicionPagoQueryFilter: CondicionPagoQueryFilter;

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  constructor(private gs: GeneralService,
    private mtrOficinaService: MtrOficinaServiceService,
    private cobranzaService: GeneralCobranzaService,
    private mtrVendedorService: MtrVendedorService,
    private platform: Platform,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public toastController: ToastController,
    public lc: LoadingController,
    private modalCtrl: ModalController) {

    const loading = this.lc.create({
      message: 'Por favor, espere...'
    });

    this.usuario = this.gs.GetUsuario();
    this.role = +this.usuario.role;

  }

  async ngOnInit() {
    this.show = false;

    this.mtrOficinaDto = JSON.parse(localStorage.getItem("listOficinas"));
    console.log('Oficinas en el Init ', this.mtrOficinaDto);




    await this.getOficinas();

    await this.getVededores();

    await this.refresh();

  }
  compareWithFn(o1, o2) {
    return o1 === o2;
  };
  async openToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      color

    });
    toast.present();
  }
  async onChangeOfic(event) {
    console.log("oficina Seleccionada", event.target.value);
    this.mtrOficinaSelected = event.target.value;
    console.log("Cargando.....", this.mtrOficinaSelected);
    this.mtrVendedorSelected = "";
    this.cobGeneralCobranzaDto = [];
    await this.getVededores();


  }

  async onChangeVend(event) {
    console.log("Vendedor Seleccionado*******", event.target.value);
    this.mtrVendedorSelected = event.target.value;
    console.log("Cargando.....", this.mtrVendedorSelected);
    this.page = 0;
    this.cobGeneralCobranzaDto = [];
    await this.refresh();
  }

  async getOficinas() {

    if (!this.mtrOficinaDto) {
      this.mtrOficinaQueryFilter = {
        Usuario: this.usuario.user,
        PageSize: 10,
        PageNumber: 1,
      };
      this.show = true;
      const loading = this.lc.create({
        message: 'Por favor, espere...'
      });

      loading.then(o => {
        o.present();
      });
      this.mtrOficinaService.GetAllOficinas(this.mtrOficinaQueryFilter).subscribe(resp => {
        this.mtrOficinaDto = resp.data;
        localStorage.setItem("listOficinas", JSON.stringify(this.mtrOficinaDto));
        console.log(this.mtrOficinaDto);
        for (let clave of this.mtrOficinaDto) {

          let oficina: Oficina = { codigo: clave['codOficina'], descripcion: clave['nomOficina'] };

          this.oficinas.push(oficina);

        }
        this.defaultOficina = 2;
        this.compareWith = this.compareWithFn;
        this.show = false;
        this.lc.dismiss();
      },
        error => {

          if (error == 'Something bad happened; please try again later') {
            this.openToast('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde', 'danger');
          } else {
            this.openToast(error, 'danger');
          }
          console.log("en el error del Cobranza List: ", error);
          this.lc.dismiss();
        });
    } else {
      for (let clave of this.mtrOficinaDto) {

        let oficina: Oficina = { codigo: clave['codOficina'], descripcion: clave['nomOficina'] };

        this.oficinas.push(oficina);

      }
      this.defaultOficina = 2;
      this.compareWith = this.compareWithFn;
    }



  }

  async getVededores() {
    this.mtrVendedoresDtoAll = JSON.parse(localStorage.getItem("listVendedores"));
    console.log("mtrVendedoresDtoAll", this.mtrVendedoresDtoAll);
    if (this.mtrVendedoresDtoAll) {

      this.mtrVendedoresDto = this.mtrVendedoresDtoAll.filter(x => x.oficina == +this.mtrOficinaSelected)
      console.log("Desde local", this.mtrVendedoresDto);
    } else {
      this.show = true;
      this.mtrVendedorQueryFilter = {
        usuario: this.usuario.user,
        oficina: +this.mtrOficinaSelected
      };
      const loading = this.lc.create({
        message: 'Por favor, espere...'
      });

      loading.then(o => {
        o.present();
      });

      this.mtrVendedorService.ListVendedoresPorUsuario(this.mtrVendedorQueryFilter).subscribe(resp => {
        this.mtrVendedoresDto = resp.data;
        console.log("Desde Server", this.mtrVendedoresDto);
        this.show = false;
        this.lc.dismiss();
      },
        error => {

          if (error == 'Something bad happened; please try again later') {
            this.openToast('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde', 'danger');
          } else {
            this.openToast(error, 'danger');
          }
          console.log("en el error del Cobranza List: ", error);
          this.lc.dismiss();
        });
    }

  }


  onChangeSearchText(event) {
    this.searchText = event.target.value;
    this.cobGeneralCobranzaDto = [];
    this.page = 0;
    this.refresh();
  }

  onChangeRC(event) {
    this.documento = +event.target.value;
    this.cobGeneralCobranzaDto = [];
    this.refresh();
  }

  onClickAdd() {
    this.router.navigate(['menu/cobranza-edit/' + 1]);
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

  onClickEnviar(item: CobGrabacionCobranzaDto) {



    //confirm
    this.gs.presentConfirm("Enviar Admon.", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {


          const loading = this.lc.create({
            message: 'Por favor, espere...'
          });

          loading.then(o => {
            o.present();
          });

          this.cobranzaService.EnviarAdmonGeneralCobranzas(item)
            .subscribe(resp => {
              this.lc.dismiss();
              if (!resp.meta.isValid) {
                this.openToast(resp.meta.message, 'danger');
              } else {
                this.openToast(resp.meta.message, 'success');
              }

              console.log('Cobranza Enviada******', resp);

              this.refresh();
            },
              error => {

                if (error == 'Something bad happened; please try again later') {
                  this.openToast('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde', 'danger');
                } else {
                  this.openToast(error, 'danger');
                }
                console.log("en el error del Cobranza List enviar: ", error);
                this.lc.dismiss();
              });

        }

      }

    )
  }

  onClickAnular(item: CobGrabacionCobranzaDto) {



    //confirm
    this.gs.presentConfirm("Anular Recibo.", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {


          const loading = this.lc.create({
            message: 'Por favor, espere...'
          });

          loading.then(o => {
            o.present();
          });

          this.cobranzaService.AnularCobranza(item)
            .subscribe(resp => {
              this.lc.dismiss();
              if (!resp.meta.isValid) {
                this.openToast(resp.meta.message, 'danger');
              } else {
                this.openToast(resp.meta.message, 'success');
              }

              console.log('Cobranza Anulada******', resp);

              this.refresh();
            },
              error => {

                if (error == 'Something bad happened; please try again later') {
                  this.openToast('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde', 'danger');
                } else {
                  this.openToast(error, 'danger');
                }
                console.log("en el error del Cobranza List enviar: ", error);
                this.lc.dismiss();
              });

        }

      }

    )
  }


  VerRc(item) {
    console.log("Ver RC", item)
  }

  onClickDetailRetenciones(item) {
    console.log("Grabar Retenciones", item)
  }

  onClickDelete(item: CobGeneralCobranzaDto) {

    //El parametro 'item' contiene toda la informacion del item a eliminar,

    //slidingItem.close()

    if (item.status != "GRABACION") {

      this.openToast("Para Elimibar un Recibo debe estar en GRABACION", 'danger');
      return;

    }


    //confirm
    this.gs.presentConfirm("Eliminar Item", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {




          this.cobranzaService.DeleteGeneralCobranzas(item)
            .subscribe(resp => {

              if (resp.meta.isValid) {
                this.openToast(resp.meta.message, 'success');

              } else {

                this.openToast(resp.meta.message, 'danger');


              }



            });
          this.refresh();
        }

      }

    )
  }

  async refresh(event?) {
    this.show = true;


    this.generalCobranzaQueryFilter = {
      UsuarioConectado: this.usuario.user,
      IdOficina: this.mtrOficinaSelected,
      vendedor: this.mtrVendedorSelected,
      documento: this.documento,
      PageSize: this.pageSize,
      PageNumber: this.page,
      searchText: this.searchText
    };

    if (this.documento > 0) {
      this.page = 0;
      this.generalCobranzaQueryFilter.PageNumber = 0;
    }

    console.log("Query Filter", this.generalCobranzaQueryFilter);


    this.showLoading = true;
    this.cobranzaService.GetAllGeneralCobranzas(this.generalCobranzaQueryFilter)
      .subscribe(resp => {

        //this.lc.dismiss();

        if (resp.data.counts <= 0) {
          //event.target.complete();
          this.infiniteScroll.disabled = true;
          event.target.complete();
          return;
        }
        console.log(resp);

        if (this.page > 1) {

          this.cobGeneralCobranzaDto = this.cobGeneralCobranzaDto.concat(resp['data']);

          /*for (let clave of this.cobGeneralCobranzaDto){
         
            let  cobro =  {IdCliente: clave['IdCliente'], MontoTransaccion: clave['MontoTransaccion']};
          
            this.cobranzaList.push(cobro);
    
          }*/


        } else {
          this.cobGeneralCobranzaDto = resp.data;
          /*for (let clave of this.cobGeneralCobranzaDto){
         
            let  cobro =  {IdCliente: clave['IdCliente'], MontoTransaccion: clave['MontoTransaccion']};
          
            this.cobranzaList.push(cobro);
    
          }*/
        }
        if (event) {
          event.target.complete();
        }

        console.log("Cobranza", this.cobGeneralCobranzaDto);
        this.show = false;
        this.showLoading = false;

      }
        ,
        error => {
          this.showLoading = false;
          if (error == 'Something bad happened; please try again later') {
            this.openToast('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde', 'danger');
          } else {
            this.openToast(error, 'danger');
          }
          console.log("en el error del Cobranza List: ", error);
          //this.lc.dismiss();
        });

  }

  loadMore(event) {
    this.page++;
    console.log('Cargando datos...', this.page)

    this.refresh(event);
  }

  public async presentActionSheet(item) {
    console.log(item);




    if (this.role == 355) {
      //si es un pago que no contiene impuesto y no se ha enviado a administracion
      if (item.flagEnviado == false && item.flagImpuesto == false) {
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
              text: 'Enviar Admon.',
              icon: 'send-outline',
              handler: () => {
                this.onClickEnviar(item);
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
      //si es un pago que contiene impuesto y no se ha enviado a administracion
      if (item.flagEnviado == false && item.flagImpuesto == true) {
        let actionSheet = this.actionSheetCtrl.create({
          header: 'Acciones...',
          buttons: [

            {
              text: 'Editar Retenciones',
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
              text: 'Enviar Admon.',
              icon: 'send-outline',
              handler: () => {
                this.onClickEnviar(item);
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

      //Si ya fue enviado a administracion
      if (item.flagEnviado == true) {
        let actionSheet = this.actionSheetCtrl.create({
          header: 'Acciones...',
          buttons: [


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
    } else {
      //si es un pago que no contiene impuesto y no se ha enviado a administracion
      if (item.flagEnviado == false && item.flagImpuesto == false) {
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
              text: 'Enviar Admon.',
              icon: 'send-outline',
              handler: () => {
                this.onClickEnviar(item);
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
              text: 'Anular',
              icon: 'close-outline',
              handler: () => {
                this.onClickAnular(item);
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
      //si es un pago que contiene impuesto y no se ha enviado a administracion
      if (item.flagEnviado == false && item.flagImpuesto == true) {
        let actionSheet = this.actionSheetCtrl.create({
          header: 'Acciones...',
          buttons: [

            {
              text: 'Editar Retenciones',
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
              text: 'Enviar Admon.',
              icon: 'send-outline',
              handler: () => {
                this.onClickEnviar(item);
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
              text: 'Anular',
              icon: 'close-outline',
              handler: () => {
                this.onClickAnular(item);
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

      //Si ya fue enviado a administracion
      if (item.flagEnviado == true) {
        let actionSheet = this.actionSheetCtrl.create({
          header: 'Acciones...',
          buttons: [


            {
              text: 'Adjuntos',
              icon: 'cloud-download-outline',
              handler: () => {
                this.onClickDetailAdjunto(item);
              }
            },

            {
              text: 'Anular',
              icon: 'close-outline',
              handler: () => {
                this.onClickAnular(item);
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






  }

  //mostrar un adjunto como modal
  async showAdjunto(link: any) {

    const modal = this.modalCtrl.create({
      component: FotosShowPage,
      componentProps: { link: link }
    });

    await modal.then(p => {
      p.present();
    })

  }


}
