import { Conversion, ConversionUnidadesMetrosCuadrados } from 'src/app/models/conversion';
import { debounceTime } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppProdutsQueryFilter } from '../../../interfaces/app-produts-query-filter';
import { AppProductsGetDto } from '../../../models/app-products-get-dto';
import { IUsuario } from '../../../interfaces/iusuario';
import { ProductoService } from '../../../services/producto.service';
import { GeneralService } from '../../../services/general.service';
import { ToastController, ActionSheetController, AlertController, ModalController, IonSelect } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MunicipioGetDto } from '../../../models/municipio-get-dto';
import { BuscadorMunicipioComponent } from '../../../components/buscador-municipio/buscador-municipio.component';
import { AppSubcategoryGetDto } from 'src/app/models/app-subcategory-get-dto';
import { AppVariableSearchGroupByVariableGetDto } from 'src/app/models/app-variable-search-group-by-variable-get-dto';
import { AppVariableSearchQueryFilter } from 'src/app/interfaces/app-variable-search-query-filter';
import { AppVariableSearchGetDto } from 'src/app/models/app-variable-search-get-dto';
import { AppProductConversionGetDto } from 'src/app/models/app-product-conversion-get-dto';
import { Observable, Subject } from 'rxjs';
import { ParametrosMaquinas } from 'src/app/models/ParametrosMaquina.dto';
import { ResultConversionUnidadesMetrosCuadrados } from '../../../models/result-conversion-unidades-metros-cuadrados-dto';
import { AppPriceDto } from 'src/app/models/app-price-dto';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  appProdutsQueryFilter: AppProdutsQueryFilter;
  appProductsGetDto: AppProductsGetDto[] = [];
  appProductsGetDtoNew: AppProductsGetDto[] = [];
  itemMunicipioGetDto: MunicipioGetDto;
  appSubcategoryGetDto: AppSubcategoryGetDto[] = [];

  public listaVariablesAgrupado: AppVariableSearchGroupByVariableGetDto[] = []
  public listAppVariableSearchGetDto:AppVariableSearchGetDto[]=[];
  private qryFilter = new AppVariableSearchQueryFilter();
  public listaProductos: AppProductsGetDto[];
  public appProductConversionGetDto:AppProductConversionGetDto;
  public appProduct:AppProductsGetDto;
  usuario: IUsuario;
  tituloVentaEdicion: string;
  public showLoading: boolean = false;
  public _subCategoryid: any;
  form: FormGroup;
  private subjectKeyUp = new Subject<any>();
  private parametrosMaquinas:ParametrosMaquinas= new ParametrosMaquinas();
  public cantidadPorUnidadProduccion:number=0;
  public valorConvertido:number=0;
  public appPriceDto:AppPriceDto[]=[];
  public unitPriceBaseProduction:number;
  public flete:number;
  public precioMasFlete: any;
  public uiUnitPriceConverted:number;
  public mensaje:string;
  public buscandoPrecio:boolean=false;
 
  constructor(private productoService: ProductoService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public generalService: GeneralService,
    public toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,) {
    this.usuario = this.generalService.GetUsuario();
    this.buildForm();
  }

  ngOnInit() {
    
    this.parametrosMaquinas== JSON.parse(localStorage.getItem("parametrosMaquinas"));
    this.subjectKeyUp.pipe((debounceTime(1000))).subscribe((d)=>{
      console.log('recalculando para cantidad :',d);

      this.onRecalcular(d);
  })

    let subcategoryAll= JSON.parse(localStorage.getItem("listSubcategoria"));
    this.appSubcategoryGetDto = subcategoryAll.filter(x=> x.active==true);

    this.productoService.allProducts$.subscribe(allProducts => {
      this.appProductsGetDto = allProducts.data;
      console.log('productos al cargar busqueda', this.appProductsGetDto)

    });

    this.appProdutsQueryFilter = {
      pageSize: 20,
      pageNumber: 1,
      id: 0,
      code: '',
      description1: '',
      description2: '',
      searchText: ''

    }

    this.refresh();

  }

  onChangeSubCategoriaId(event) {

    //Establezco ID de sub-categoria
    this._subCategoryid = event.detail.value;
    this.qryFilter.appSubCategoryId = this._subCategoryid;
    this.listaProductos =[];
    this.appProduct=null;
    this.appPriceDto=[];
    this.unitPriceBaseProduction=0;
    this.flete=0;
    this.precioMasFlete=0;
    this.uiUnitPriceConverted=0;
    this.listAppVariableSearchGetDto=[];
    this.form.get('unidad').setValue('');  
    this.form.get('cantidad').setValue(0);
    this.form.get('cantidadSolicitada').setValue(0);
    this.showLoading=true;
    this.productoService.GetAllAppVariableSearchAgrupado(this.qryFilter).subscribe(res => {
        this.showLoading=false;
        this.listaVariablesAgrupado = res.data
       


    })


  }

  onChangeSearchText(event) {

    this.appProdutsQueryFilter.searchText = event.target.value;
    this.refresh();

  }


  refresh() {
    this.showLoading = true;
    this.appProdutsQueryFilter.subCategoria=2;
    this.productoService.GetAllAppProducts(this.appProdutsQueryFilter);
    this.showLoading = false;
  }

  marcado() {

    return { "background-color": "green", "color": "white", "padding": "10px" }

}

desmarcado(): any {

    return { "background-color": "white", "color": "black", "padding": "10px" }

}
onChangeVariableId(event){
  console.log('Al seleccionar variable',event.detail.value)
  this.listAppVariableSearchGetDto = this.listAppVariableSearchGetDto.filter(item => item.appVariableId !== event.detail.value.appVariableId);

  this.listAppVariableSearchGetDto.push(event.detail.value);

  console.log('Al seleccionar variable this.listAppVariableSearchGetDto: ',this.listAppVariableSearchGetDto)
    
  this.buscar();

}
onSelect(producto: AppProductsGetDto) {
  console.log("Al seleccionar producto", producto);
  this.appProduct=producto;
  this.appProductConversionGetDto=producto.conversiones[0];
  this.form.get('unidad').setValue(this.appProductConversionGetDto.appUnitsAlternativaDescription);
  this.appPriceDto=producto.appPriceDto;
  this.subjectKeyUp.next('cantidadSolicitadaChanged');
  
}
medidaBasicaChanged($event){
  this.subjectKeyUp.next('medidaBasicaChanged');
}
medidaOpuestaChanged($event){
  this.subjectKeyUp.next('medidaOpuestaChanged');
}

buscar(){

  //Hago peticion a la api  para q me entregue la lista de productos resultante 
 //asociados a los criterios indicados
 

 let objeto = {filters: this.listAppVariableSearchGetDto, subcategoryId:this._subCategoryid }
  console.log('Filter a enviar para buscar productos',objeto)
  this.listaProductos =[];
  this.showLoading=true;
 this.productoService.GetAllProductusByCriteria(objeto).subscribe(res => {
     console.log('Result al buscar productos',res)
     this.showLoading=false;
     this.listaProductos = res.data;

 });
}
  async onBuscarMunicipio() {

    const modal = await this.modalCtrl.create({
      component: BuscadorMunicipioComponent,
      componentProps: {
        userConectado: this.usuario.user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal*******", data);
    this.itemMunicipioGetDto = data.itemMunicipio;
    this.form.get('idMunicipio').setValue(data.itemMunicipio.recnum);
    this.form.get('descripcionMunicipio').setValue(data.itemMunicipio.descMunicipio);
    

  }
  save(event) { }
  private buildForm() {

    this.form = this.formBuilder.group({

      idMunicipio: [0, []],
      descripcionMunicipio: ['', []],
      subCategoriaId: ['', []],
      unidad: ['', [Validators.required,Validators.minLength(2)]],
      cantidadSolicitada: [1, Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0.00000000001)]],
      medidaBasica: ['', []],
      medidaOpuesta: ['', []],
      precio:[0, []],
      total:[0, []]
    });
  }

  //------------------------------------
  async onRecalcular(origenLlamada: string) {
        
    this.LimpiarVariables();  
    if(this.appProduct!=null && this.appProductConversionGetDto!=null){
        console.log('tipo de calculo onRecalcular ',this.appProduct.tipoCalculo)
        switch (this.appProduct.tipoCalculo) {
            //RequiereEntradaLargoAncho=1
            case 1:
                if(this.form.get('medidaBasica').value >0 && this.form.get('medidaOpuesta').value >0 && this.form.get('cantidadSolicitada').value >0 ){
                    this.RecalculoRequiereEntradaLargoAncho();
                   
                }
                
                break;
            //PrecioPorProducto  
            
            case 2:
                if(this.form.get('cantidadSolicitada').value >0 ){
                    this.RecalculoPorRango();
                   
                }
                
                break;
            
            //PrecioPorProductoCantidad     
            case 3:
                if(this.form.get('cantidadSolicitada').value >0 ){
                    this.RecalculoPrecioPorProductoCantidad();
                   
                }
                
                break;
        }
    }


}

calculaConversion(cantidadSolicitada:number,medidaBasica:number,medidaOpuesta:number):ResultConversionUnidadesMetrosCuadrados{
  
  if(!this.parametrosMaquinas.medidaBasicaRollo){

      this.parametrosMaquinas =
      {
          adicionalProduccion: 0.635,
          adicionalProduccionOpuesta: 1.27,
          medidaOpuestaRollo: 22.2758,
          medidaBasicaRollo: 448.9176
      }
  }



  if(cantidadSolicitada<=0){
      return null;
  }

  if(cantidadSolicitada<=0){
      return null;
  }
  if(medidaBasica<=0){
      return null;
  }
  if(medidaOpuesta<=0){
      return null;
  }



  let conversion = new ConversionUnidadesMetrosCuadrados(
              this.parametrosMaquinas.adicionalProduccion,
              this.parametrosMaquinas.adicionalProduccionOpuesta,
              this.parametrosMaquinas.medidaBasicaRollo,
              this.parametrosMaquinas.medidaOpuestaRollo)
 
  conversion.cantidadBase=cantidadSolicitada;
  conversion.medidaBasica= medidaBasica 
  conversion.medidaOpuesta=medidaOpuesta
  let result = conversion.getCantidadPorUnidad()
  let area= conversion.area;
  let resultObject:ResultConversionUnidadesMetrosCuadrados = {
    area:area,
    resulCantidad:result 
  }



  return resultObject;
 

}

RecalculoRequiereEntradaLargoAncho(){
  
  if(this.appProduct.tipoCalculo==1){
      let calculoConversion=this.calculaConversion(
          this.form.get('cantidadSolicitada').value,
          this.form.get('medidaBasica').value,
          this.form.get('medidaOpuesta').value)

      let cantidadPorUnidad= calculoConversion.resulCantidad;
      this.cantidadPorUnidadProduccion=calculoConversion.resulCantidad;
      this.valorConvertido=calculoConversion.area;

  }
  let porrcentajeAprovechamiento = 0;
  let cantidadPorUnidad = 0;
  let cantidad = 0;
  porrcentajeAprovechamiento = (this.cantidadPorUnidadProduccion * this.valorConvertido);
  cantidad = (this.form.get('cantidadSolicitada').value / this.cantidadPorUnidadProduccion) / porrcentajeAprovechamiento;
  this.form.get('cantidad').setValue(this.form.get('cantidadSolicitada').value / this.cantidadPorUnidadProduccion);


  if(this.appPriceDto != null && this.appPriceDto.length>0){
      let precio=this.buscarPrecioPorRango(this.appPriceDto, this.form.get('cantidad').value);
      this.unitPriceBaseProduction=precio;
  }

  if (this.itemMunicipioGetDto.porcFlete > 0) {
      this.flete = (this.unitPriceBaseProduction * this.itemMunicipioGetDto.porcFlete) / 100;
  }

  this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
  this.precioMasFlete = this.precioMasFlete.toFixed(2);
  this.uiUnitPriceConverted =  this.precioMasFlete/this.cantidadPorUnidadProduccion;
  this.form.get('precio').setValue(this.precioMasFlete);
  this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);

  
  
}

LimpiarVariables(){
  this.flete=0;
  this.precioMasFlete = 0;
  this.uiUnitPriceConverted = 0;
  this.unitPriceBaseProduction=0;
  this.form.get('precio').setValue(0);
  this.form.get('total').setValue(0);
  this.form.get('cantidad').setValue(0);
  
}


RecalculoPorRango(){
  this.mensaje='Buscando precio........' 
  let cantidad= this.calculoConversionGenerico(this.appProductConversionGetDto,this.form.get('cantidadSolicitada').value);
  console.log("RecalculoPrecioPorProductoCantidad : variable cantidad",cantidad)
  console.log("this.appProductConversionGetDto",this.appProductConversionGetDto)
  
  this.form.get('cantidad').setValue(cantidad);

  this.cantidadPorUnidadProduccion=cantidad;
  this.valorConvertido=this.appProductConversionGetDto.yDenominador;
  let precio=this.buscarPrecioPorRango(this.appPriceDto, this.form.get('cantidad').value);
  this.unitPriceBaseProduction =precio;
  if (this.itemMunicipioGetDto.porcFlete > 0) {
      this.flete = (this.unitPriceBaseProduction * this.itemMunicipioGetDto.porcFlete) / 100;
  }
  this.form.get('precio').setValue(this.precioMasFlete);
  this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
  this.precioMasFlete = this.precioMasFlete.toFixed(2);
  this.uiUnitPriceConverted =  this.precioMasFlete/this.cantidadPorUnidadProduccion;
  this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);
  this.mensaje='' 


}

async  RecalculoPrecioPorProductoCantidad(){

  
  let cantidad= this.calculoConversionGenerico(this.appProductConversionGetDto,this.form.get('cantidadSolicitada').value);
  this.form.get('cantidad').setValue(cantidad);
  this.cantidadPorUnidadProduccion=cantidad;
  this.valorConvertido=this.appProductConversionGetDto.yDenominador;
 

  let filter={
      appProuctId: this.appProduct.id,
      cantidad: this.form.get('cantidadSolicitada').value
  }
  

  this.buscandoPrecio=true;
  this.mensaje='Buscando precio........' 
  await this.productoService.buscaProductoCantidad(filter).subscribe(resp => {
      this.buscandoPrecio=false;
      this.mensaje='' 
      console.log('1.1-buscar producto cantidad',resp)
      let precio= resp.precio
      
      this.unitPriceBaseProduction =precio;
      if (this.itemMunicipioGetDto.porcFlete > 0) {
          this.flete = (this.unitPriceBaseProduction * this.itemMunicipioGetDto.porcFlete) / 100;
      }
      this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
      this.precioMasFlete = this.precioMasFlete.toFixed(2);
      this.form.get('precio').setValue(this.precioMasFlete);
      this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);
      

  })

}

buscarPrecioPorRango(_appPriceDto: AppPriceDto[],cantidad:number):number{
  let result:number;

  let precio = _appPriceDto.filter(x=> cantidad >= x.desde   &&  cantidad <= x.hasta);

  if(precio!=null && precio.length>0) {
      result = precio[0].precio;
  }else{
      result = _appPriceDto[0].precio;
  }

  return result;
}
  calculoConversionGenerico(appProductConversionGetDto:AppProductConversionGetDto,cantidad:number):number{
        
        let conversion = new Conversion(appProductConversionGetDto.xNumerador,appProductConversionGetDto.yDenominador,cantidad);
        let result = conversion.getCantidadAlternativa()
        
        return result;
    }
    cantidadSolicitadaChanged(event: number) {


      this.subjectKeyUp.next('cantidadSolicitadaChanged');
     
  }


}
