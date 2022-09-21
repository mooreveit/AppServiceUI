import { Component, OnInit } from '@angular/core';
import { AppTemplateConversionUnitQueryFilter } from '../../../interfaces/app-template-conversion-unit-query-filter';
import { TempateConversionUnitService } from '../../../services/tempate-conversion-unit.service';
import { AppTemplateConversionUnitGetDto } from '../../../models/app-template-conversion-unit-get-dto';
import { AppTemplateConversionUnitGenericGetDto } from '../../../models/app-template-conversion-unit-generic-get-dto';
import { ActionSheetController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BuscadorUnidadesComponent } from '../../../components/buscador-unidades/buscador-unidades.component';
import { GeneralService } from '../../../services/general.service';
import { BuscadorUnidadesPage } from '../../Cotizaciones/cotizacion-detalle/buscador-unidades/buscador-unidades.page';
import { AppTemplateConversionUnitDeleteDto } from '../../../models/app-template-conversion-unit-delete-dto';

@Component({
  selector: 'app-template-conversion-unit-list',
  templateUrl: './template-conversion-unit-list.page.html',
  styleUrls: ['./template-conversion-unit-list.page.scss'],
})
export class TemplateConversionUnitListPage implements OnInit {

  qryFilter = new AppTemplateConversionUnitQueryFilter();
  appTemplateConversionUnitGetDto: AppTemplateConversionUnitGenericGetDto[] = [];;
  appTemplateConversionUnitDeleteDto: AppTemplateConversionUnitDeleteDto;


  form: FormGroup;
  constructor(private tempateConversionUnitService: TempateConversionUnitService,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private gs: GeneralService) { }

  ngOnInit() {

    this.buildForm();
    console.log("Init de Template unidades");



  }

  private buildForm() {

    //todo establecer precios unitarios a 0
    this.form = this.formBuilder.group({

      appUnitDesdeId: [0, [Validators.required]],
      unidadDesde: ['', [Validators.required]],
      appUnitHastaId: [0, [Validators.required]],
      unidadHasta: ['', [Validators.required]],


    });
  }


  //Buscar unidad de medida Desde
  async onBuscarUnidadDesde() {

    const modal = await this.modalCtrl.create({
      component: BuscadorUnidadesComponent,
      componentProps: {
        userConectado: this.gs.GetUsuario().user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal", data);

    //paso datos seleccionados a la ui
    this.form.get('appUnitDesdeId').setValue(data.id);
    this.form.get('unidadDesde').setValue(data.descripcion);

  }

  //Buscar unidad de medida Desde
  async onBuscarUnidadHasta() {

    const modal = await this.modalCtrl.create({
      component: BuscadorUnidadesComponent,
      componentProps: {
        userConectado: this.gs.GetUsuario().user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal", data);

    //paso datos seleccionados a la ui
    this.form.get('appUnitHastaId').setValue(data.id);
    this.form.get('unidadHasta').setValue(data.descripcion);
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

  refresh() {

    if (this.form.get('appUnitDesdeId').value <= 0) {

      this.openToast("Indique Unidad desde", 'danger');
      return;
    }

    if (this.form.get('appUnitHastaId').value <= 0) {

      this.openToast("Indique Unidad hasta", 'danger');
      return;
    }

    this.qryFilter = {
      appDetailQuotesId: 0,
      appUnitIdSince: this.form.get('appUnitDesdeId').value,
      appUnitIdUntil: this.form.get('appUnitHastaId').value,
    }
    this.tempateConversionUnitService.allTemplateConversionUnit$.subscribe(resp => {
      this.appTemplateConversionUnitGetDto = resp.data;
      console.log('*****Al refrescar conversion uit', resp.data);
      console.log(this.appTemplateConversionUnitGetDto);

    });


    this.tempateConversionUnitService.GetAllAppTemplateConversionUnit(this.qryFilter);
  }

  // Añadir o Agregar Conversion
  onClickAdd() {
    if (this.form.get('appUnitDesdeId').value <= 0) {

      this.openToast("Indique Unidad desde", 'danger');
      return;
    }

    if (this.form.get('appUnitHastaId').value <= 0) {

      this.openToast("Indique Unidad hasta", 'danger');
      return;
    }
    let appUnitIdSince = this.form.get('appUnitDesdeId').value;
    let appUnitIdUntil = this.form.get('appUnitHastaId').value;
    this.router.navigate(['/menu/template-conversion-unit-edit'], { state: { flag: false, appUnitIdSince, appUnitIdUntil } });
  }

  // Metodo para actualizar un producto

  UpdateTemplate(itemTemplate: AppTemplateConversionUnitGenericGetDto) {

    //this.tempateConversionUnitService.templateConversionUnit$.next(item)

    this.router.navigate(['/menu/template-conversion-unit-edit'], { state: { flag: true, itemTemplate } })

  }




  Delete(item) {

    //El parametro 'item' contiene toda la informacion del item a eliminar,



    //confirm
    this.gs.presentConfirm("Eliminar Item", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {

          this.appTemplateConversionUnitDeleteDto = {
            id: item.id
          }
          this.tempateConversionUnitService.Delete(this.appTemplateConversionUnitDeleteDto)
            .subscribe(resp => {

              if (resp.meta.isValid) {
                this.refresh();
                this.openToast(resp.meta.message, 'success');

              } else {

                this.openToast(resp.meta.message, 'danger');


              }



            });

        }

      }

    )
  }

  async presentActionSheet(item) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Acción',
      cssClass: 'my-custom-class',

      buttons: [{
        text: 'Actualizar',
        role: 'destructive',
        icon: 'pencil-outline',
        handler: () => {
          this.UpdateTemplate(item);
        }
      },
      {
        text: 'Eliminar',
        icon: 'trash',
        handler: () => {
          this.Delete(item);
        }
      },



      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
