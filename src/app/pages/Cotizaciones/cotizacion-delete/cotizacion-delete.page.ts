import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AppGeneralQuotesDeleteDto } from 'src/app/models/app-general-quotes-delete-dto';
import { CotizacionesListService } from 'src/app/services/cotizaciones/cotizaciones-list.service';
import { AppGeneralQuotesGetDto } from '../../../models/app-general-quotes-get-dto';
import { AppGeneralQuotesQueryFilter } from '../../../interfaces/App-General-Quotes-Query-Filter';
import { IUsuario } from '../../../interfaces/iusuario';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-cotizacion-delete',
  templateUrl: './cotizacion-delete.page.html',
  styleUrls: ['./cotizacion-delete.page.scss'],
})
export class CotizacionDeletePage implements OnInit {

  public cotizacion: AppGeneralQuotesGetDto
  appGeneralQuotesQueryFilter: AppGeneralQuotesQueryFilter;
  appGeneralQuotesDeleteDto: AppGeneralQuotesDeleteDto = new AppGeneralQuotesDeleteDto()
  public _eliminando: boolean = false;
  usuario: IUsuario;
  constructor(
    private router: Router,
    public alertController: AlertController,
    private CotizacionesService: CotizacionesListService,
    public toastController: ToastController,
    private gs: GeneralService,
  ) { }

  ngOnInit() {

    this.CotizacionesService.cotizacion$.subscribe(dat => {
      this.cotizacion = dat;
      this.appGeneralQuotesDeleteDto.cotizacion = this.cotizacion.cotizacion;
      this.appGeneralQuotesDeleteDto.id = this.cotizacion.id;
    });
    this.usuario = this.gs.GetUsuario();

  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: 'Esta usted seguro de eliminar esta Cotizacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          role: 'Confirmar',
          cssClass: 'secondary',
          handler: (blah) => {
            this.eliminarCotizacion()
          }
        },
      ]
    });

    await alert.present();
  }

  async openToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'top',
      color

    });
    toast.present();
  }

  eliminarCotizacion() {
    this._eliminando = true;
    this.CotizacionesService.DeleteGeneralCotizacion(this.appGeneralQuotesDeleteDto).subscribe(result => {
      this.CotizacionesService.cotizacion$.next(null);
      if (result.meta.isValid === true) {
        this.appGeneralQuotesQueryFilter = {
          pageSize: 100,
          pageNumber: 1,
          usuarioConectado: this.usuario.user,
          cotizacion: "",
          searchText: ""  //this.searchText
        };

        this.CotizacionesService.GetAllGeneralCotizacion(this.appGeneralQuotesQueryFilter)
          .subscribe(listCotizacionesResult => {
            this.CotizacionesService.allCotizaciones$.next(listCotizacionesResult.data);

            //event.target.complete();
          });
        this.openToast(result.meta.message, 'success');
        this._eliminando = false;
        setTimeout(() => {
          this.router.navigate(['menu/cotizaciones-list']);
        }, 3000);

      } else {
        this.openToast(result.meta.message, 'danger');
        this._eliminando = false;
      }
    });

  }


}
