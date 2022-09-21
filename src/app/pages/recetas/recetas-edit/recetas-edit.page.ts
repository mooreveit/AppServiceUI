import { Component, OnInit } from '@angular/core';
import { AppRecipesGetDto } from '../../../models/app-recipes-get-dto';
import { Router } from '@angular/router';
import { AppProductsGetDto } from '../../../models/app-products-get-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AppVariablesQueryFilter } from '../../../interfaces/app-variables-query-filter';
import { AppVariablesGetDto } from '../../../models/app-variables-get-dto';
import { CalculoVariablesService } from '../../../services/calculo-variables.service';
import { BuscadorVariablesComponent } from '../../../components/buscador-variables/buscador-variables.component';
import { GeneralService } from '../../../services/general.service';
import { BuscadorIngredientesComponent } from '../../../components/buscador-ingredientes/buscador-ingredientes.component';
import { AppRecipesUpdateDto } from '../../../models/app-recipes-update-dto';
import { AppRecipesCreateDto } from 'src/app/models/app-recipes-create-dto';
import { RecipesService } from '../../../services/recipes.service';
import { AppRecipesQueryFilter } from '../../../interfaces/app-recipes-query-filter';

@Component({
  selector: 'app-recetas-edit',
  templateUrl: './recetas-edit.page.html',
  styleUrls: ['./recetas-edit.page.scss'],
})
export class RecetasEditPage implements OnInit {
  itemAppRecipesGetDto: AppRecipesGetDto;
  producto: AppProductsGetDto;
  operacion: boolean;
  form: FormGroup;
  titulo: string;
  flagUpdate: boolean;
  flagInsert: boolean;
  appVariablesQueryFilter: AppVariablesQueryFilter;
  appVariablesGetDto: AppVariablesGetDto[] = [];
  caretPos: number = 0;


  appRecipesQueryFilter: AppRecipesQueryFilter;
  appRecipesUpdateDto: AppRecipesUpdateDto;
  appRecipesCreateDto: AppRecipesCreateDto

  public showLoading: boolean = false;
  amount: number = 0.00;

  precision = 4;

  entry;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private calculoVariablesService: CalculoVariablesService,
    private gs: GeneralService,
    private recipesService: RecipesService,) { }

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



    this.producto = this.router.getCurrentNavigation().extras.state.itemProducto;
    this.operacion = this.router.getCurrentNavigation().extras.state.flag;



    console.log("Producto:", this.producto);

    console.log("Operacion:", this.operacion);


    this.buildForm();
    if (this.operacion) {

      this.titulo = "Editar Receta";
      this.flagUpdate = true;
      this.flagInsert = false;
      this.itemAppRecipesGetDto = this.router.getCurrentNavigation().extras.state.receta;
      
      console.log('this.itemAppRecipesGetDto',this.itemAppRecipesGetDto)

      this.form.get('id').setValue(this.itemAppRecipesGetDto.id);
      this.form.get('appVariableId').setValue(this.itemAppRecipesGetDto.appVariableId);
      this.form.get('code').setValue(this.itemAppRecipesGetDto.code);
      this.form.get('description').setValue(this.itemAppRecipesGetDto.description);
      this.form.get('appIngredientsId').setValue(this.itemAppRecipesGetDto.appIngredientsId);

      if (this.itemAppRecipesGetDto.formula.length < 1) {

        this.form.get('ingredient').setValue(this.itemAppRecipesGetDto.appIngredientsGetDto.description);
      }

      this.form.get('quantity').setValue(this.itemAppRecipesGetDto.quantity);
      this.form.get('totalCost').setValue(this.itemAppRecipesGetDto.totalCost);
      this.form.get('formula').setValue(this.itemAppRecipesGetDto.formula);
      this.form.get('formulaValue').setValue(this.itemAppRecipesGetDto.formulaValue);
      this.form.get('sumValue').setValue(this.itemAppRecipesGetDto.sumValue);
      this.form.get('orderCalculate').setValue(this.itemAppRecipesGetDto.orderCalculate);
      this.form.get('includeInSearch').setValue(this.itemAppRecipesGetDto.includeInSearch);
      this.form.get('secuencia').setValue(this.itemAppRecipesGetDto.secuencia);
      this.form.get('afectaCosto').setValue(this.itemAppRecipesGetDto.afectaCosto);
      this.form.get('truncarEntero').setValue(this.itemAppRecipesGetDto.truncarEntero);
      this.form.get('esVariableDeEntrada').setValue(this.itemAppRecipesGetDto.esVariableDeEntrada);
      this.form.get('descriptionSearch').setValue(this.itemAppRecipesGetDto.descriptionSearch);
      this.form.get('mensajeValidacionFormula').setValue(this.itemAppRecipesGetDto.mensajeValidacionFormula);
      

    } else {

      this.titulo = "Crear Receta";
      this.flagUpdate = false;
      this.flagInsert = true;

    }





  }


  amountChanged(event: number) {
    this.amount = event;
    console.log("Amount:", this.amount);

    let formatedAmount = +this.amount / Math.pow(10, this.precision)
    console.log("formatedAmount****:", formatedAmount);
    this.form.get('totalCost').setValue(formatedAmount);
  }


  insert() {

    this.appRecipesCreateDto = {

      appproductsId: this.producto.id,
      appVariableId: this.form.get('appVariableId').value,
      description: this.form.get('description').value,
      appIngredientsId: this.form.get('appIngredientsId').value,
      quantity: this.form.get('quantity').value,
      totalCost: this.form.get('totalCost').value,
      formula: this.form.get('formula').value,
      sumValue: this.form.get('sumValue').value,
      includeInSearch: this.form.get('includeInSearch').value,
      orderCalculate: this.form.get('orderCalculate').value,
      secuencia: this.form.get('secuencia').value,
      afectaCosto: this.form.get('afectaCosto').value,
      truncarEntero: this.form.get('truncarEntero').value,
      esVariableDeEntrada: this.form.get('esVariableDeEntrada').value,
      descriptionSearch: this.form.get('descriptionSearch').value
    }

     

    console.log("OBJETO A ENVIAR PARA Crear Receta:", this.appRecipesCreateDto);


    this.showLoading= true;
    this.recipesService.Create(this.appRecipesCreateDto).subscribe(result => {

      console.log("el mensaje de la api es:")
      console.log(result.meta.message)

      console.log("el objeto result:")
      console.log(result)

      console.log("el objeto result.data:")
      console.log(result.data)
      this.showLoading= false;
      if (result.meta.isValid === true) {
        this.gs.presentToast(result.meta.message, 'success')

        this.appRecipesQueryFilter = {
          appproductsId: this.producto.id,
          searchText: ""
        }
        //this.recipesService.GetAllRecipesNew(this.appRecipesQueryFilter);



        this.router.navigate(['menu/recetas-list'], {})
      } else {
        this.gs.presentToast(result.meta.message, 'danger')
      }

    });

  }


  Update() {



    this.appRecipesUpdateDto = {
      id: this.form.get('id').value,
      appproductsId: this.producto.id,
      appVariableId: this.form.get('appVariableId').value,
      description: this.form.get('description').value,
      appIngredientsId: this.form.get('appIngredientsId').value,
      quantity: this.form.get('quantity').value,
      totalCost: this.form.get('totalCost').value,
      formula: this.form.get('formula').value,
      sumValue: this.form.get('sumValue').value,
      includeInSearch: this.form.get('includeInSearch').value,
      orderCalculate: this.form.get('orderCalculate').value,
      secuencia: this.form.get('secuencia').value,
      afectaCosto: this.form.get('afectaCosto').value,
      truncarEntero: this.form.get('truncarEntero').value,
      esVariableDeEntrada: this.form.get('esVariableDeEntrada').value,
      descriptionSearch: this.form.get('descriptionSearch').value
    }

    this.showLoading= true;
    console.log("OBJETO A ENVIAR PARA actualizar Receta:", this.appRecipesUpdateDto)
    this.recipesService.Update(this.appRecipesUpdateDto).subscribe(result => {

      console.log("el mensaje de la api es:")
      console.log(result.meta.message)

      console.log("el objeto result:")
      console.log(result)

      console.log("el objeto result.data:")
      console.log(result.data)
      this.showLoading= false;
      if (result.meta.isValid === true) {
        this.gs.presentToast(result.meta.message, 'success')

        this.appRecipesQueryFilter = {
          appproductsId: this.producto.id,
          searchText: ""
        }
        //this.recipesService.GetAllRecipes(this.appRecipesQueryFilter);



        this.router.navigate(['menu/recetas-list'], {})
      } else {
        this.gs.presentToast(result.meta.message, 'danger')
      }

    });



  }

  private buildForm() {

    //todo establecer precios unitarios a 0
    this.form = this.formBuilder.group({
      id: [0, []],
      appVariableId: [0, [Validators.required]],
      code: ['', []],
      description: ['', []],
      appIngredientsId: [0,],
      ingredient: [''],
      quantity: [0, []],
      totalCost: [0, []],
      formula: ['', []],
      formulaValue: ['', []],
      sumValue: [false, [Validators.required]],
      orderCalculate: [0, [Validators.required]],
      includeInSearch: [false, [Validators.required]],
      secuencia: [0, []],
      afectaCosto: [false, [Validators.required]],
      truncarEntero: [false, [Validators.required]],
      esVariableDeEntrada: [false, [Validators.required]],
      descriptionSearch: ['', []],
      mensajeValidacionFormula: ['', []],

    });
  }


  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
      console.log("Posicion del cursor", this.caretPos);



    }

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
  }

  async onBuscarIngrediente() {
    const modal = await this.modalCtrl.create({
      component: BuscadorIngredientesComponent,
      componentProps: {
        userConectado: this.gs.GetUsuario().user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal", data);

    //paso datos seleccionados a la ui
    this.form.get('appIngredientsId').setValue(data.id);

    this.form.get('ingredient').setValue(data.description);
  }

}
