import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppIngredientsGetDto } from '../../../models/app-ingredients-get-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MtrTipoMonedaDto } from '../../../models/mtr-tipo-moneda-dto';
import { BuscadorUnidadesPage } from '../../Cotizaciones/cotizacion-detalle/buscador-unidades/buscador-unidades.page';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { AppIngredientsCreateDto } from 'src/app/models/app-ingredients-create-dto';
import { IUsuario } from '../../../interfaces/iusuario';
import { IngredientesService } from '../../../services/ingredientes.service';
import { AppIngredientsUpdateDto } from '../../../models/app-ingredients-update-dto';
import { AppIngredientsQueryFilter } from '../../../interfaces/app-ingredients-query-filter';

@Component({
  selector: 'app-ingredientes-edit',
  templateUrl: './ingredientes-edit.page.html',
  styleUrls: ['./ingredientes-edit.page.scss'],
})
export class IngredientesEditPage implements OnInit {


  titulo: String;

  flagInsert: boolean;
  flagUpdate: boolean;
  mensaje: string;
  ingrediente: AppIngredientsGetDto
  form: FormGroup;
  usuario: IUsuario;

  listMtrTipoMonedasDto: MtrTipoMonedaDto[] = [];
  appIngredientsCreateDto: AppIngredientsCreateDto;
  appIngredientsUpdateDto: AppIngredientsUpdateDto;


  appIngredientsQueryFilter: AppIngredientsQueryFilter;
  appIngredientsGetDto: AppIngredientsGetDto[] = [];


  amount: number = 0.00;
  amountString: string = "";
  precision = 4;

  entry;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private gs: GeneralService,
    private ingredientesService: IngredientesService
  ) { }

  ngOnInit() {


    this.ingredientesService.allIngredients$.subscribe(resp => {
      this.appIngredientsGetDto = resp.data;
      console.log(resp.data);
    });

    this.appIngredientsQueryFilter = {
      id: 0,
      pageSize: 100,
      pageNumber: 1,
      code: '',
      description: '',
      searchText: ''
    }


    this.usuario = this.gs.GetUsuario();
    this.buildForm();
    this.cargarComboMonedas();
    if (this.router.getCurrentNavigation().extras.state.flag === true) {
      this.titulo = "Editar Ingrediente";
      this.flagUpdate = true;
      this.flagInsert = false;
      this.ingrediente = this.router.getCurrentNavigation().extras.state.ingrediente;
      console.log("ingrediente:", this.ingrediente);
      this.form.get('id').setValue(this.ingrediente.id);
      this.form.get('code').setValue(this.ingrediente.code);
      this.form.get('description').setValue(this.ingrediente.description);
      this.form.get('cost').setValue(this.ingrediente.cost);


      this.amountString = this.ingrediente.cost.toString();

      this.form.get('appUnitId').setValue(this.ingrediente.appUnitId);

      this.form.get('prymaryMtrMonedaId').setValue(this.ingrediente.prymaryMtrMonedaId);
      this.form.get('secundaryMtrMonedaId').setValue(this.ingrediente.secundaryMtrMonedaId);
      this.form.get('unidad').setValue(this.ingrediente.appUnitsGetDto.code)  //this.item.AppUnitsGetDto.code);

    } else {

      this.titulo = "Añadir Ingrediente"
      this.flagInsert = true;
      this.flagUpdate = false;
    }


  }


  private buildForm() {

    //todo establecer precios unitarios a 0
    this.form = this.formBuilder.group({
      id: [0, [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      appUnitId: [0, [Validators.required]],
      unidad: ['', [Validators.required]],
      cost: [0, [Validators.required]],
      prymaryMtrMonedaId: [0, [Validators.required]],
      secundaryMtrMonedaId: [0, [Validators.required]],

    });
  }

  private cargarComboMonedas() {
    this.listMtrTipoMonedasDto = JSON.parse(localStorage.getItem("listMoneda"));
  }

  //ir a listado general de cotizaciones
  goListDetalleCotizacion() {


    this.router.navigate(['/menu/ingredientes-list']).then(() => { });

    //  this.router.navigate(['/menu/cotizaciones-list']).then(() => {});
  }

  //Buscar unidad de medida
  async onBuscarUnidad() {

    const modal = await this.modalCtrl.create({
      component: BuscadorUnidadesPage,
      componentProps: {
        userConectado: this.gs.GetUsuario().user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal", data);

    //paso datos seleccionados a la ui
    this.form.get('appUnitId').setValue(data.id);
    this.form.get('unidad').setValue(data.descripcion);

  }
  onChangeMoneda(event) {
    console.log("En onChangeMoneda, event.detail.value tiene el valor:")
    console.log(typeof event.detail.value);
    this.form.get('prymaryMtrMonedaId').setValue(event.detail.value);

  }
  onChangeMonedaSecundary(event) {
    console.log("En onChangeMoneda, event.detail.value tiene el valor:")
    console.log(typeof event.detail.value);
    this.form.get('secundaryMtrMonedaId').setValue(event.detail.value);

  }

  insertCotizacion() {

    this.appIngredientsCreateDto = {

      code: this.form.get('code').value,
      description: this.form.get('description').value,
      appUnitId: this.form.get('appUnitId').value,
      cost: this.form.get('cost').value,
      prymaryMtrMonedaId: this.form.get('prymaryMtrMonedaId').value,
      secundaryMtrMonedaId: this.form.get('secundaryMtrMonedaId').value,
      UsuarioConectado: this.usuario.user
    }



    console.log("OBJETO A EBVIAR PARA CREAR INGREDIENTE:", this.appIngredientsCreateDto)
    this.ingredientesService.Create(this.appIngredientsCreateDto).subscribe(result => {

      console.log("el mensaje de la api es:")
      console.log(result.meta.message)

      console.log("el objeto result:")
      console.log(result)

      console.log("el objeto result.data:")
      console.log(result.data)

      if (result.meta.isValid === true) {
        //this.gs.presentToast(result.meta.message, 'success')
        this.ingredientesService.GetAllAppIngredients(this.appIngredientsQueryFilter);

        this.router.navigate(['/menu/ingredientes-list'], {})
      } else {
        this.gs.presentToast(result.meta.message, 'danger')
      }

    });

  }

  UpdateCotizacion() {
    this.appIngredientsUpdateDto = {
      id: this.form.get('id').value,
      code: this.form.get('code').value,
      description: this.form.get('description').value,
      appUnitId: this.form.get('appUnitId').value,
      cost: this.form.get('cost').value,
      prymaryMtrMonedaId: this.form.get('prymaryMtrMonedaId').value,
      secundaryMtrMonedaId: this.form.get('secundaryMtrMonedaId').value,
      UsuarioConectado: this.usuario.user
    }



    console.log("OBJETO A EBVIAR PARA actualizar INGREDIENTE:", this.appIngredientsUpdateDto)
    this.ingredientesService.Update(this.appIngredientsUpdateDto).subscribe(result => {

      console.log("el mensaje de la api es:")
      console.log(result.meta.message)

      console.log("el objeto result:")
      console.log(result)

      console.log("el objeto result.data:")
      console.log(result.data)

      if (result.meta.isValid === true) {
        //this.gs.presentToast(result.meta.message, 'success')
        this.ingredientesService.GetAllAppIngredients(this.appIngredientsQueryFilter);

        this.router.navigate(['/menu/ingredientes-list'], {})
      } else {
        this.gs.presentToast(result.meta.message, 'danger')
      }

    });
  }


  amountChanged(event: number) {
    this.amount = event;

    console.log("Amount:", this.amount);

    let formatedAmount = +this.amount / Math.pow(10, this.precision)

    console.log("formatedAmount****:", formatedAmount);

    this.form.get('cost').setValue(formatedAmount);


  }


}
