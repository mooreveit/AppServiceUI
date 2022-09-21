import { Component, OnInit } from '@angular/core';
import { AppTemplateConversionUnitGenericGetDto } from '../../../models/app-template-conversion-unit-generic-get-dto';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AppVariablesQueryFilter } from '../../../interfaces/app-variables-query-filter';
import { AppVariablesGetDto } from '../../../models/app-variables-get-dto';
import { CalculoVariablesService } from '../../../services/calculo-variables.service';
import { GeneralService } from '../../../services/general.service';
import { BuscadorVariablesComponent } from '../../../components/buscador-variables/buscador-variables.component';
import { AppTemplateConversionUnitUpdateDto } from '../../../models/app-template-conversion-unit-update-dto';
import { TempateConversionUnitService } from '../../../services/tempate-conversion-unit.service';
import { AppTemplateConversionUnitQueryFilter } from '../../../interfaces/app-template-conversion-unit-query-filter';
import { AppTemplateConversionUnitCreateDto } from '../../../models/app-template-conversion-unit-create-dto';

@Component({
  selector: 'app-template-conversion-unit-edit',
  templateUrl: './template-conversion-unit-edit.page.html',
  styleUrls: ['./template-conversion-unit-edit.page.scss'],
})
export class TemplateConversionUnitEditPage implements OnInit {


  itemTemplate: AppTemplateConversionUnitGenericGetDto;
  operacion: boolean;
  form: FormGroup;
  titulo: string;
  flagUpdate: boolean;
  flagInsert: boolean;
  caretPos: number = 0;
  qryFilter = new AppTemplateConversionUnitQueryFilter();
  appVariablesQueryFilter: AppVariablesQueryFilter;
  appVariablesGetDto: AppVariablesGetDto[] = [];

  appUnitIdSince: number;
  appUnitIdUntil: number;

  appTemplateConversionUnitUpdateDto: AppTemplateConversionUnitUpdateDto;

  appTemplateConversionUnitCreateDto: AppTemplateConversionUnitCreateDto;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private calculoVariablesService: CalculoVariablesService,
    private templateConversionUnitService: TempateConversionUnitService,
    private gs: GeneralService,
    public toastController: ToastController) { }

  ngOnInit() {

    this.calculoVariablesService.allVariables$.subscribe(allVariables => {
      this.appVariablesGetDto = allVariables.data;
      console.log(allVariables.data);
    });

    this.appVariablesQueryFilter = {
      pageSize: 10,
      pageNumber: 1,
      code: '',
      description: '',
      searchText: ''
    }

    this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter);



    this.operacion = this.router.getCurrentNavigation().extras.state.flag;

    this.buildForm();



    console.log("Operacion:", this.operacion);

    if (this.operacion) {

      this.titulo = "Editar Template Unidad";
      this.flagUpdate = true;
      this.flagInsert = false;
      this.itemTemplate = this.router.getCurrentNavigation().extras.state.itemTemplate;
      console.log("ItemTemplate recibido:", this.itemTemplate);

      this.form.get('id').setValue(this.itemTemplate.id);
      this.form.get('appUnitDesdeId').setValue(this.itemTemplate.appUnitIdSince);
      this.form.get('appUnitHastaId').setValue(this.itemTemplate.appUnitIdUntil);
      this.form.get('unidadHasta').setValue(this.itemTemplate.appUnitIdUntilGetDto.code);
      this.form.get('unidadDesde').setValue(this.itemTemplate.appUnitIdSinceGetDto.code);

      this.form.get('appVariableId').setValue(this.itemTemplate.appVariableId);
      this.form.get('code').setValue(this.itemTemplate.code);
      this.form.get('description').setValue(this.itemTemplate.description);

      this.form.get('value').setValue(this.itemTemplate.value);
      this.form.get('formula').setValue(this.itemTemplate.formula);
      this.form.get('sumValue').setValue(this.itemTemplate.sumValue);
      this.form.get('orderCalculate').setValue(this.itemTemplate.orderCalculate);
      this.form.get('min').setValue(this.itemTemplate.min);
      this.form.get('max').setValue(this.itemTemplate.max);

    } else {

      this.titulo = "Crear Crear Template Unidad";
      this.flagUpdate = false;
      this.flagInsert = true;


      this.appUnitIdSince = this.router.getCurrentNavigation().extras.state.appUnitIdSince;
      this.appUnitIdUntil = this.router.getCurrentNavigation().extras.state.appUnitIdUntil;
      this.form.get('appUnitDesdeId').setValue(this.appUnitIdSince);
      this.form.get('appUnitHastaId').setValue(this.appUnitIdUntil);
    }


  }
  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
      console.log("Posicion del cursor", this.caretPos);



    }

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

  private buildForm() {

    //todo establecer precios unitarios a 0
    this.form = this.formBuilder.group({
      id: [0, []],
      appUnitDesdeId: [0, [Validators.required]],
      unidadDesde: ['', []],
      appUnitHastaId: [0, [Validators.required]],
      unidadHasta: ['', []],
      appVariableId: [0, [Validators.required]],
      code: ['', []],
      description: ['', []],
      formula: ['', []],
      formulaValue: ['', []],
      value: [0, []],
      sumValue: [false, [Validators.required]],
      orderCalculate: [0, [Validators.required]],
      min: [0, [Validators.required]],
      max: [0, [Validators.required]],

    });
  }
  Update() {


    if (this.form.get('appUnitDesdeId').value <= 0) {

      this.openToast("Indique Unidad desde", 'danger');
      return;
    }

    if (this.form.get('appUnitHastaId').value <= 0) {

      this.openToast("Indique Unidad hasta", 'danger');
      return;
    }
    if (this.form.get('appVariableId').value <= 0) {

      this.openToast("Indique Variable", 'danger');
      return;
    }

    this.appTemplateConversionUnitUpdateDto = {
      id: this.form.get('id').value,
      appUnitIdSince: this.form.get('appUnitDesdeId').value,
      appUnitIdUntil: this.form.get('appUnitHastaId').value,
      appVariableId: this.form.get('appVariableId').value,
      description: this.form.get('description').value,
      code: this.form.get('code').value,
      formula: this.form.get('formula').value,
      formulaValue: this.form.get('formulaValue').value,
      sumValue: this.form.get('sumValue').value,
      value: this.form.get('value').value,
      orderCalculate: this.form.get('orderCalculate').value,
      min: this.form.get('min').value,
      max: this.form.get('max').value,
    }

    console.log("OBJETO A ENVIAR PARA actualizar Template:", this.appTemplateConversionUnitUpdateDto)

    this.templateConversionUnitService.Update(this.appTemplateConversionUnitUpdateDto).subscribe(result => {

      console.log("el mensaje de la api es:")
      console.log(result.meta.message)

      console.log("el objeto result:")
      console.log(result)

      console.log("el objeto result.data:")
      console.log(result.data)

      if (result.meta.isValid === true) {
        //this.gs.presentToast(result.meta.message, 'success')


        this.qryFilter = {
          appDetailQuotesId: 0,
          appUnitIdSince: this.form.get('appUnitDesdeId').value,
          appUnitIdUntil: this.form.get('appUnitHastaId').value,
        }
        this.templateConversionUnitService.allTemplateConversionUnit$.subscribe(resp => {


        });


        this.templateConversionUnitService.GetAllAppTemplateConversionUnit(this.qryFilter);

        this.router.navigate(['/menu/template-conversion-unit-list'], {})
      } else {
        this.gs.presentToast(result.meta.message, 'danger')
      }

    });



  }

  insert() {


    if (this.form.get('appUnitDesdeId').value <= 0) {

      this.openToast("Indique Unidad desde", 'danger');
      return;
    }

    if (this.form.get('appUnitHastaId').value <= 0) {

      this.openToast("Indique Unidad hasta", 'danger');
      return;
    }
    if (this.form.get('appVariableId').value <= 0) {

      this.openToast("Indique Variable", 'danger');
      return;
    }

    this.appTemplateConversionUnitCreateDto = {

      appUnitIdSince: this.form.get('appUnitDesdeId').value,
      appUnitIdUntil: this.form.get('appUnitHastaId').value,
      appVariableId: this.form.get('appVariableId').value,
      description: this.form.get('description').value,
      code: this.form.get('code').value,
      formula: this.form.get('formula').value,
      formulaValue: this.form.get('formulaValue').value,
      sumValue: this.form.get('sumValue').value,
      value: this.form.get('value').value,
      orderCalculate: this.form.get('orderCalculate').value,
      min: this.form.get('min').value,
      max: this.form.get('max').value,
    }

    console.log("OBJETO A ENVIAR PARA Crear Template:", this.appTemplateConversionUnitCreateDto)

    this.templateConversionUnitService.Create(this.appTemplateConversionUnitCreateDto).subscribe(result => {

      console.log("el mensaje de la api es:")
      console.log(result.meta.message)

      console.log("el objeto result:")
      console.log(result)

      console.log("el objeto result.data:")
      console.log(result.data)

      if (result.meta.isValid === true) {
        //this.gs.presentToast(result.meta.message, 'success')


        this.qryFilter = {
          appDetailQuotesId: 0,
          appUnitIdSince: this.form.get('appUnitDesdeId').value,
          appUnitIdUntil: this.form.get('appUnitHastaId').value,
        }
        this.templateConversionUnitService.allTemplateConversionUnit$.subscribe(resp => {


        });


        this.templateConversionUnitService.GetAllAppTemplateConversionUnit(this.qryFilter);

        this.router.navigate(['/menu/template-conversion-unit-list'], {})
      } else {
        this.gs.presentToast(result.meta.message, 'danger')
      }

    });


  }
  selectVariable(variable) {
    console.log("VariableSeleccionada", variable);

    let formulaActual = this.form.get('formula').value;

    let inicial = formulaActual.substr(0, this.caretPos);
    let final = formulaActual.substr(this.caretPos, formulaActual.lenght);
    console.log("Inicial", inicial);
    console.log("Final", final);
    formulaActual = inicial + "[" + variable.code + "]" + final;
    this.form.get('formula').setValue(formulaActual);

  }
  refreshVariables() {
    this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter);
  }

  onChangeSearchTextVariables(event) {

    this.appVariablesQueryFilter.searchText = event.target.value;
    this.refreshVariables();
  }

  async onBuscarVariable() {
    const modal = await this.modalCtrl.create({
      component: BuscadorVariablesComponent,
      componentProps: {
        userConectado: this.gs.GetUsuario().user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal", data);

    //paso datos seleccionados a la ui
    this.form.get('appVariableId').setValue(data.id);
    this.form.get('code').setValue(data.code);
    this.form.get('description').setValue(data.code);
  }


}
