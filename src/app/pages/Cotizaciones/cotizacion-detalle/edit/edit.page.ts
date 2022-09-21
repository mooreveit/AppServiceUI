import { AppConfigAppQueryFilter } from './../../../../interfaces/appConfigAppQueryFilter';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IUsuario } from 'src/app/interfaces/iusuario';

import { CotizacionesListService } from '../../../../services/cotizaciones/cotizaciones-list.service';
import { ConfiguracionService } from '../../../../services/configuracion.service';
import { AppGeneralQuotesGetDto } from '../../../../models/app-general-quotes-get-dto';

import { AppDetailQuotesGetDto } from 'src/app/models/app-detail-quotes-get-dto';
import { AppDetailQuotesCreateDto } from '../../../../models/app-detail-quotes-create-dto';
import { AppDetailQuotesUpdateDto } from '../../../../models/app-detail-quotes-update-dto';

import { BuscadorUnidadesPage } from '../buscador-unidades/buscador-unidades.page';
import { BuscadorProductosPage } from '../buscador-productos/buscador-productos.page';

import { Observable, Subject } from 'rxjs';
import { TasaPreferencialService } from '../../../../services/tasa-preferencial.service';

import { SharedModule } from '../../../../shared/shared.module';

import { CalculadoraPage } from '../../../Cotizaciones/cotizacion-detalle/calculadora/calculadora.page';
import { AppConversionUnitGenericCreateDto } from '../../../../models/app-conversion-unit-generic-create-dto';

import { gte } from '../validator/detail-validator';
import { AppSubcategoryGetDto } from '../../../../models/app-subcategory-get-dto';
import { ProductoService } from '../../../../services/producto.service';
import { BuscadorProductosComponent } from '../../../../components/buscador-productos/buscador-productos.component';
import { BuscadorUnidadesComponent } from '../../../../components/buscador-unidades/buscador-unidades.component';
import { ParametrosMaquinas } from '../../../../models/ParametrosMaquina.dto';
import { Conversion, ConversionUnidadesMetrosCuadrados } from 'src/app/models/conversion';
import { AppPriceDto } from 'src/app/models/app-price-dto';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppRecipesByAppDetailQuotesQueryFilter } from 'src/app/interfaces/precio-producto-cantidad-filter';
import { AppProductsGetDto } from 'src/app/models/app-products-get-dto';
import { ResultConversionUnidadesMetrosCuadrados } from 'src/app/models/result-conversion-unidades-metros-cuadrados-dto';
import { AppProductConversionGetDto } from 'src/app/models/app-product-conversion-get-dto';
import { AppProductConversionFilter } from 'src/app/interfaces/app-product-conversion-filter';




@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],

})
export class EditPage implements OnInit {

    //observable
    cotizacion$: Observable<any>;
    tasa$: Observable<any>;

    @Input('cotizacion') cotizacion: AppGeneralQuotesGetDto
    public item: AppDetailQuotesGetDto
    operacion: number

    public editable: boolean = true;

    usuario: IUsuario;
    form: FormGroup;

    tituloUi: any;

    public isBs: boolean = false;
    public isDolar: boolean = false;


    colorToolbar = 'primary';

    requiereAprobacionPrecio: boolean;

    solicitarPrecio: boolean;
    currency: number;


    ultimoPrecioUsd: number;

    //

    public _cantidad: any = "0"
    public tasa: number = 0
    public flagMascara: boolean = false
    public calculadoraEnabled: boolean = false


    public _btnUmDisabled: boolean = true;
    public _btnCalculadoraDisabled: boolean = true;

    _precio: any = "0"
    _precioUsd: any = "0"

    _total: any = "0"
    _totalUsd: any = "0"

    datoHijo: any = "No iniciado"

    private parametrosMaquinas:ParametrosMaquinas= new ParametrosMaquinas();

    private appGeneralQuotesGetDto: AppGeneralQuotesGetDto = new AppGeneralQuotesGetDto();

    private detailCreateDto: AppDetailQuotesCreateDto = new AppDetailQuotesCreateDto();
    private detailUpdateDto: AppDetailQuotesUpdateDto = new AppDetailQuotesUpdateDto();
    private dtoCalculadora: AppConversionUnitGenericCreateDto = new AppConversionUnitGenericCreateDto();
 
    private appProductConversionGetDto:AppProductConversionGetDto;

    appSubcategoryGetDto: AppSubcategoryGetDto[] = [];
    private appConfigAppQueryFilter:AppConfigAppQueryFilter;

    appPriceDto:AppPriceDto[]=[];
    appProduct:AppProductsGetDto;
    public optionsMask:any;
    public mensaje:string='Guardando Cotizacion.........';

    public uiId: any;
    public uiIdProducto: any;
    public uiIdUnidad: any;
    public uiUsuarioConectado: any;
    public uiUnitPriceConverted: any;
    public unitPriceBaseProduction: any;
    public flete: any;
    public precioMasFlete: any;
    public uiTasa: any;
    public uiImageLink: any = "";
    public uiNombreProductoInCard: any = "";

    public decripcionProductionUnit: string = "";
    public descripcionSalesUnit: string = "";
    public cantidadPorUnidadProduccion: number = 0;
    public showLoading: boolean = false;
    public _subCategoryid: any;
    public _requiereDatosEntrada: boolean;
    public buscandoPrecio: boolean = false;
    public longituDecimal: string;
    public mostrarEnDesarrollo: boolean = true;
    public mensajeBotonSolicitarPrecio:string="";
    //Variabales de calculo y presentacion
    public variables = {
        monedaBs: "Bs",
        monedaUsd: "US$",

        cantidad: 0,
        precisionCantidad: 0,

        precioUsd: 0,
        precisionPrecioUsd: 4,

        precio: 0,
        precisionPrecio: 2,

        total: 0,
        totalUsd: 0,

        cantidadStr: "0",
        precioStr: "0",
        precioUsdStr: "0",
        totalStr: "0",
        totalUsdStr: "0",

        permitirLectura: false
    }

    //---
    private subjectKeyUp = new Subject<any>();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public generalService: GeneralService,
        public cotizacionesListService: CotizacionesListService,
        private modalCtrl: ModalController,
        private alertController: AlertController,
        private tasaPreferencialService: TasaPreferencialService,
        private CotizacionesService: CotizacionesListService,
        private productoService: ProductoService,
        private configuracionService:ConfiguracionService) {
        this.parametrosMaquinas== JSON.parse(localStorage.getItem("parametrosMaquinas"));
        this.buildForm()

    }

    async ngOnInit() {

        this.subjectKeyUp.pipe((debounceTime(1000))).subscribe((d)=>{
            console.log('recalculando para cantidad :',d);

            this.onRecalcular(d);
        })

        //datos recibidos        
        this.operacion = this.router.getCurrentNavigation().extras.state.operacion;

        this.uiId = 0;
        this.uiIdProducto = 0;
        this.uiIdUnidad = 0;
        this.uiUsuarioConectado = "";
        this.uiUnitPriceConverted = 0;
        this.uiTasa = 0;
        this.unitPriceBaseProduction = 0;
        this.flete = 0;
        this.precioMasFlete = 0

        this.variables.permitirLectura = false
        this._btnCalculadoraDisabled = true

        let subcategoryAll= JSON.parse(localStorage.getItem("listSubcategoria"));
        this.appSubcategoryGetDto = subcategoryAll.filter(x=> x.active==true);

         console.log('subcategoria',this.appSubcategoryGetDto);
        
   
 
        //suscribe al observable cotizacion$
        this.cotizacionesListService.cotizacion$.subscribe(cot => {
            this.cotizacion = cot
            
        })

        if (this.cotizacion) {
            this.editable = this.cotizacion.appStatusQuoteGetDto.editable
            
        } else {
            this.editable = true;
        }



        if (this.operacion == 0) {

            //Modo Crear           
            this.item = new AppDetailQuotesGetDto()
            this.item.statusAprobacionDto={
                flagAprobado: true,
                flagCerrado: false,
                valorVentaAprobar: 0,
                valorVentaAprobarUsd:0,
                aprobado: true,
                color: "prymary",
                statusString:"APROBADO"
            }

        }

        //boton calculadora
        if (this.operacion == 1) {

            //Modo Editar
            this.item = this.router.getCurrentNavigation().extras.state.item;
            this.appProduct=this.item.appProductsGetDto;
            console.log('Producto',this.appProduct)
            this.setColorToolbar();

        }
        //suscribe al observable tasa$
        this.tasaPreferencialService.tasa$.subscribe(_tasa => {
            this.tasa = _tasa
        })

        await this.tasaPreferencialService.GetTasa().subscribe(resp => {

            this.tasaPreferencialService.tasa$.next(resp.data.tasa)

            this.tasa = resp.data.tasa

            this.uiTasa = this.tasa
        })

      

        this.configuraCreateOrEdit()
       
    }

    onChangeSubCategoriaId(event) {

        //Establezco ID de sub-categoria
        this._subCategoryid = event.detail.value;
        this.form.get('subCategoriaId').setValue(this._subCategoryid);

        this.form.get('producto').setValue('');
        this.form.get('descripcionProducto').setValue('');
        this.form.get('nombreComercialProducto').setValue('');
        
        this.appProduct=null;
        this.item.appProductsGetDto=null;
        this.uiIdProducto =0;

        this.form.get('unidad').setValue('');
        this.appProductConversionGetDto=null;
        this.descripcionSalesUnit = '';
        this.uiIdUnidad = 0;


    }

    configuraCreateOrEdit() {

        //datos recibidos
        //this.operacion = this.router.getCurrentNavigation().extras.state.operacion;

        this.uiId = 0;
        this.uiIdProducto = 0;
        this.uiIdUnidad = 0;
        this.uiUsuarioConectado = "";
        this.uiUnitPriceConverted = 0;
        this.unitPriceBaseProduction = 0;
        this.uiTasa = 0;
        this.flete = 0;
        this.precioMasFlete = 0;


        if (this.cotizacion.idMtrTipoMoneda == 1)
            this.isBs = true

        if (this.cotizacion.idMtrTipoMoneda == 2)
            this.isDolar = true

        if (this.operacion == 0) {

            //Modo Crear, se habilita al graba           

            this.item.cantidad = 0
            this.item.diasEntrega = 0
            this.item.precio = 0
            this.item.precioUsd = 0
            this.item.total = 0
            this.item.totalUsd = 0
            this.item.statusAprobacionDto={
                flagAprobado: true,
                flagCerrado: false,
                valorVentaAprobar: 0,
                valorVentaAprobarUsd:0,
                aprobado: true,
                color: "prymary",
                statusString:"APROBADO"
            }

            this.calculadoraEnabled = false

            this._btnCalculadoraDisabled = true;

            this._btnUmDisabled = true;

            this.uiImageLink = this.generalService.noImageUrl();

            //nombre producto in card
            this.uiNombreProductoInCard = "?"

            this.cotizacionesListService.precioLista = 0
            this.cotizacionesListService.precioListaProduccion = 0
        }

        //boton calculadora
        if (this.operacion == 1) {

            //Modo Editar

            //this.item = this.router.getCurrentNavigation().extras.state.item;
            console.log("Item a modificar", this.item);
            this.cotizacionesListService.precioLista = this.item.unitPriceConverted
            this.cotizacionesListService.precioListaProduccion = this.item.unitPriceBaseProduction

            //this.cantidadPorUnidadProduccion = Math.trunc(1 / this.item.valorConvertido);
            this.cantidadPorUnidadProduccion = this.item.cantidadPorUnidadProduccion;
            this.calculadoraEnabled = true

            this._btnCalculadoraDisabled = false;

            this._btnUmDisabled = false;

            this.uiImageLink = this.item.appProductsGetDto.link

            this.appPriceDto= this.item.appProductsGetDto.appPriceDto;
         

            //nombre producto in card
            this.uiNombreProductoInCard = this.item.appProductsGetDto.description1;

            //console.log("*****ITEM EN MODO EDIT*****", this.item)

           
            this.uiId = this.item.id;
            this.uiIdProducto = this.item.idProducto;
            this.uiIdUnidad = this.item.idUnidad;
            this.uiUsuarioConectado = this.generalService.GetUsuario().user
            this.uiUnitPriceConverted = this.item.unitPriceConverted;
            this.unitPriceBaseProduction = this.item.unitPriceBaseProduction;
            this.appProductConversionGetDto=this.item.appProductConversionGetDto;

            if (this.cotizacion.porcFlete > 0) {
                this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
            }
            this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
            this.precioMasFlete = this.precioMasFlete.toFixed(2);
            this.decripcionProductionUnit = this.item.appProductsGetDto.productionUnitGetDto.description1
            this.descripcionSalesUnit = this.item.appUnitsGetDto.description1;
            this._subCategoryid == this.item.appProductsGetDto.appSubCategoryId;

            console.log("*****ITEM EN MODO EDIT*****", this.item)
        }



        //Para presentacion inicial UI (se formatea al presentar en showdata)        

        //------------------------------------

        this.variables.cantidad = this.item.cantidad

        this.variables.precioUsd = this.item.precioUsd

        this.variables.precio = this.item.precio

        this.variables.total = this.item.total

        this.variables.totalUsd = this.item.totalUsd


        if (this.operacion == 0) {

            //create

            this.tituloUi = "Añadir Detalle a Cotización"

            this.variables.cantidadStr = "0"

            this.variables.precioStr = "0"

            this.variables.precioUsdStr = "0"

            this.variables.totalStr = "0"

            this.variables.totalUsdStr = "0"

            //id producto
            this.dtoCalculadora.appProductId = 0;

            //id de la um seleccionada
            this.dtoCalculadora.appUnitIdSince = 0;

            //es el id um del producto
            this.dtoCalculadora.appUnitIdUntil = 0;

            //arreglo de variables
            this.dtoCalculadora.appTemplateConversionGenericUnitGetDto = [];

        }

        if (this.operacion == 1) {

            //edit

            this.tituloUi = "Editar Detalle de Cotización"

            this.variables.cantidadStr = this.item.cantidad.toString()

            this.variables.precioStr = this.item.precio.toString()

            this.variables.precioUsdStr = this.item.precioUsd.toString()
            console.log("Precio USD>>>>>>>", this.item.precioUsd);
            console.log(this.variables.precioUsdStr);
            console.log("convertido a string", this.item.precioUsd.toString());
            this.variables.totalStr = this.item.total.toLocaleString()

            this.variables.totalUsdStr = this.item.totalUsd.toLocaleString()

            //this.form.get('nombreProductoInCard').setValue("");


            //---
            //id producto
            this.dtoCalculadora.appProductId = this.item.idProducto;

            //id de la um seleccionada
            this.dtoCalculadora.appUnitIdSince = this.item.idUnidad;

            //es el id um del producto
            this.dtoCalculadora.appUnitIdUntil = this.item.appProductsGetDto.productionUnitId

            //arreglo de variables
            this.dtoCalculadora.appTemplateConversionGenericUnitGetDto = this.item.appTemplateConversionUnitGetDto;

            console.log("EL OBJETO PARA editar en la LA CALCULADORA ES: ", this.dtoCalculadora)

        }

        //------------------------------------



        this.showData()

    }

    buildForm() {

        this.form = this.formBuilder.group({
            producto: ['', [Validators.required]],
            nombreComercialProducto: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(200)]],
            unidad: ['', [Validators.required,Validators.minLength(2)]],
            cantidad: [0, [Validators.required, Validators.min(0.00000000001)]],
            precio: [0, [Validators.required, Validators.min(0.00000000001)]],
            total: ['', [Validators.required]],
            precioUsd: [0, [Validators.required, Validators.min(0.00000000001)]],
            totalUsd: ['', [Validators.required]],
            diasEntrega: [1, [Validators.required, Validators.min(1)]],
            observaciones: ['', [Validators.maxLength(200)]],
            obsSolicitud: ['', []],
            cantidadSolicitada: [1, Validators.required],
            subCategoriaId: ['', []],
            descripcionProducto: ['', []],
            medidaBasica: ['', []],
            medidaOpuesta: ['', []],
            ordenAnterior: ['', []],


        })

    }

    showData() {

      
        if (this.operacion == 1) {
            //editar
            this.uiImageLink = this.item.appProductsGetDto.link;
            this.form.get('unidad').setValue(this.item.appUnitsGetDto.description1)  //this.item.AppUnitsGetDto.code);
            console.log('appProductsGetDto',this.item.appProductsGetDto)
            this.uiIdUnidad = this.item.idUnidad;



            this.appProduct=this.item.appProductsGetDto;
            this.form.get('producto').setValue(this.item.appProductsGetDto.code);
            this.form.get('descripcionProducto').setValue(this.item.appProductsGetDto.description1);
            this.form.get('subCategoriaId').setValue(this.item.appProductsGetDto.appSubCategoryId);
            this._requiereDatosEntrada = this.item.appProductsGetDto.requiereDatosEntrada
            this.form.get('nombreComercialProducto').setValue(this.item.nombreComercialProducto);
            this.cotizacionesListService.precioLista = this.item.unitPriceConverted

            this.form.get('cantidad').setValue(this.item.cantidad);
            this.form.get('cantidadSolicitada').setValue(this.item.cantidadSolicitada);
            this.form.get('precio').setValue(this.item.precio);
            this.form.get('precioUsd').setValue(this.item.precioUsd);
            this.ultimoPrecioUsd = this.item.precioUsd;
    
            this.form.get('medidaBasica').setValue(this.item.medidaBasica);
            this.form.get('medidaOpuesta').setValue(this.item.medidaOpuesta);
            this.form.get('total').setValue(this.item.cantidad * this.item.precio);
            this.form.get('totalUsd').setValue(this.item.cantidad * this.item.precioUsd);
    
            this.form.get('diasEntrega').setValue(this.item.diasEntrega);
            this.form.get('observaciones').setValue(this.item.observaciones);
            this.form.get('obsSolicitud').setValue(this.item.obsSolicitud);
            this.variables.permitirLectura = true
            this.unitPriceBaseProduction = this.item.unitPriceBaseProduction;
        }
        else {
            //nuevo
            this.uiImageLink = "";
            this.form.get('unidad').setValue("");
        }

        //actualizo el servicio con el precio lista del item recibido
  
        

     
        if (this.cotizacion.porcFlete > 0) {
            this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
        }
        this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
        this.precioMasFlete = this.precioMasFlete.toFixed(2);
        this.onRecalcular('showData');
    }


    //Insert - ok
    onInsert() {

        this.detailCreateDto.appGeneralQuotesId = this.cotizacion.id
        this.detailCreateDto.cotizacion = this.cotizacion.cotizacion
        this.detailCreateDto.idProducto = this.uiIdProducto
        this.detailCreateDto.idUnidad = this.uiIdUnidad
        this.detailCreateDto.idEstatus = 1
        this.detailCreateDto.producto = this.form.get('producto').value
        this.detailCreateDto.nombreComercialProducto = this.form.get('nombreComercialProducto').value
        this.detailCreateDto.diasEntrega = this.form.get('diasEntrega').value
        this.detailCreateDto.observaciones = this.form.get('observaciones').value
        //      
        this.detailCreateDto.cantidad = this.form.get('cantidad').value
        this.detailCreateDto.cantidadSolicitada = this.form.get('cantidadSolicitada').value
        this.detailCreateDto.precio = this.form.get('precio').value
        this.detailCreateDto.total = this.form.get('total').value
        this.detailCreateDto.precioUsd = this.form.get('precioUsd').value
        this.detailCreateDto.totalUsd = this.form.get('totalUsd').value


        this.detailCreateDto.precioLista = this.unitPriceBaseProduction;
        this.detailCreateDto.solicitarPrecio = this.solicitarPrecio
        this.detailCreateDto.obsSolicitud = this.form.get('obsSolicitud').value

        if(this.appProduct != null  && this.appProduct.tipoCalculo!=1){
            this.form.get('medidaBasica').setValue(0);
            this.form.get('medidaOpuesta').setValue(0);
        }

        this.detailCreateDto.medidaBasica = this.form.get('medidaBasica').value
        this.detailCreateDto.medidaOpuesta = this.form.get('medidaOpuesta').value

        this.detailCreateDto.valorConvertido=this.item.valorConvertido;
        this.detailCreateDto.cantidadPorUnidadProduccion=this.cantidadPorUnidadProduccion;
        console.log("detailCreateDto", this.detailCreateDto)
        this.showLoading = true;
        this.mensaje='Guardando Cotizacion';
        this.cotizacionesListService.InsertDetalleCotizacion(this.detailCreateDto).subscribe(result => {

            if (result.meta.isValid) {

                this.appGeneralQuotesGetDto = result.data[0];
                this.cotizacion = result.data[0];

                //capturo el registro insertado y lo asigno a 'item' (requerido en la calculadora)                    
                this.item = this.appGeneralQuotesGetDto.appDetailQuotesGetDto[0];

                //console.log("UPDATE SUCCESSFULL, observable updated!")
                this.cotizacionesListService.cotizacion$.next(this.cotizacion);

            }

            if (result.meta.isValid === true) {
                this.showLoading = false;
                this.generalService.presentToast(result.meta.message, 'success')
                this.goListDetalleCotizacion();
            } else {
                this.showLoading = false;
                this.generalService.presentToast(result.meta.message, 'danger')
            }
            this.mensaje='';
        });

    }

    //ok!
    onUpdate() {

        //let objetoDetailForUpdate: AppDetailQuotesUpdateDto = new AppDetailQuotesUpdateDto()

        //establece cantidad, precio y total con datos de la UI
        this.detailUpdateDto.cantidad = this.form.get('cantidad').value
        this.detailUpdateDto.cantidadSolicitada = this.form.get('cantidadSolicitada').value
        this.detailUpdateDto.precio = this.form.get('precio').value
        this.detailUpdateDto.total = this.form.get('total').value
        this.detailUpdateDto.precioUsd = this.form.get('precioUsd').value
        this.detailUpdateDto.totalUsd = this.form.get('totalUsd').value
        this.detailUpdateDto.precioLista = this.unitPriceBaseProduction;
        
        this.detailUpdateDto.solicitarPrecio = this.solicitarPrecio
        this.detailUpdateDto.obsSolicitud = this.form.get('obsSolicitud').value
        //complementos del DTO
        this.detailUpdateDto.appGeneralQuotesId = this.cotizacion.id
        this.detailUpdateDto.cotizacion = this.cotizacion.cotizacion
        this.detailUpdateDto.id = this.item.id
        this.detailUpdateDto.idEstatus = this.cotizacion.idEstatus

        this.detailUpdateDto.producto = this.item.producto
        this.detailUpdateDto.idProducto = this.uiIdProducto
        this.detailUpdateDto.nombreComercialProducto = this.form.get('nombreComercialProducto').value

        this.detailUpdateDto.idUnidad = this.uiIdUnidad

        this.detailUpdateDto.observaciones = this.form.get('observaciones').value
        this.detailUpdateDto.diasEntrega = this.form.get('diasEntrega').value

        this.detailUpdateDto.usuarioConectado = this.generalService.GetUsuario().user

        if(this.appProduct != null  && this.appProduct.tipoCalculo!=1){
            this.form.get('medidaBasica').setValue(0);
            this.form.get('medidaOpuesta').setValue(0);
        }

        this.detailUpdateDto.medidaBasica = this.form.get('medidaBasica').value
        this.detailUpdateDto.medidaOpuesta = this.form.get('medidaOpuesta').value

        this.detailUpdateDto.valorConvertido=this.item.valorConvertido;
        this.detailUpdateDto.cantidadPorUnidadProduccion=this.cantidadPorUnidadProduccion;

        //esta propiedad se actualiza al retorno de la calculadora (dismiss)
        //ya trae actualizadas las propiedades requeridas
        //...this.detailUpdateDto.appConversionUnitGenericCreateDto

        console.log("El objeto preparado y enviado para UPDATE es>>>>>>>>:")
        console.log(this.detailUpdateDto)
        this.showLoading = true;
        this.mensaje='Guardando Cotizacion';
        this.cotizacionesListService.UpdateDetalleCotizacion(this.detailUpdateDto).subscribe(result => {

            //console.log("el objeto result devuelto de la api al actualizar es:")
            //console.log(result)

            if (result.meta.isValid) {

                //recibo cotizacion actualizada desde la api
                this.appGeneralQuotesGetDto = result.data[0];

                //console.log("el objeto cotizacion actualizado es:")
                //console.log(this.appGeneralQuotesGetDto);

                //console.log("actualizo el observable...")
                this.cotizacionesListService.cotizacion$.next(this.appGeneralQuotesGetDto);
                this.showLoading = false;
                this.mensaje='';
                //mensaje operacin exitosa
                this.generalService.presentToast(result.meta.message, 'success')
                this.goListDetalleCotizacion();


            }
            else {
                //mensaje operacion fallida
                this.showLoading = false;
                this.generalService.presentToast(result.meta.message, 'danger')
            }

        })

    }

    onSave(): void {

        if (this.appProduct.tipoCalculo==1 && (this.form.get('medidaBasica').value <=0 || this.form.get('medidaOpuesta').value <=0)){
            this.generalService.presentToast("Indique Medida Basica y Medida Opuesta", 'danger');
            return;
        }

        if (this.requiereAprobacionPrecio == true && this.form.get('obsSolicitud').value == "") {

            this.generalService.presentToast("Indique observacion de Solictud de precios y presione enviar solicitud", 'danger');
            return;
        }
        //habilita boton calculadora
        this.calculadoraEnabled = true

        //INSERT 
        if (this.operacion == 0) {

            this.onInsert()

        }

        //UPDATE
        if (this.operacion == 1) {

            this.onUpdate()

        }

    }
    EnviarAprobacion() {


        if (this.requiereAprobacionPrecio == true && this.form.get('obsSolicitud').value == "") {

            this.generalService.presentToast("Indique observacion de Solictud de precios y presione enviar solicitud", 'danger');
            return;
        } else {
            this.solicitarPrecio = true;
            this.onSave();
        }

        console.log("Salva y envia aprobacion")
    }

    goListDetalleCotizacion() {
        //{ state: { item: this.cotizacion } }
        this.router.navigate(['/menu/list-detalle-cotizacion'], {})
    }


    setColorToolbar() {

      

        this.variables.precioUsd = this.form.get('precioUsd').value;
   
        if (this.operacion == 1) {
            //editar

            if (this.item.statusAprobacionDto.aprobado && this.item.statusAprobacionDto.flagCerrado) {
                this.requiereAprobacionPrecio = false;
                this.colorToolbar = "success";
                this.solicitarPrecio = false;
                this.mensajeBotonSolicitarPrecio="";
            } else {
                if (this.precioMasFlete > this.variables.precioUsd || this.form.get('cantidad').value < this.appProduct.cantidadMinima) {
                    this.requiereAprobacionPrecio = true;
                    this.colorToolbar = "danger";
                    this.solicitarPrecio = true;

                    this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Precio y Salvar";
                    if( this.form.get('cantidad').value < this.appProduct.cantidadMinima){
                        this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Cantidad Mínima(" +this.appProduct.cantidadMinima + ")" + "  y Salvar";
                    }

                } else {
                    this.requiereAprobacionPrecio = false;
                    this.colorToolbar = "primary";
                    this.solicitarPrecio = false;
                    this.mensajeBotonSolicitarPrecio="";
                }
            }
            if (this.isBs == true && !this.item.statusAprobacionDto.aprobado) {
                this.requiereAprobacionPrecio = true;
                this.colorToolbar = "danger";
                this.solicitarPrecio = true;
                this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Precio y Salvar";
                if( this.form.get('cantidad').value < this.appProduct.cantidadMinima){
                    this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Cantidad Mínima(" +this.appProduct.cantidadMinima + ")" + "  y Salvar";
                }
            }

        } else {
            //nuevo
            if(this.appProduct){
                if (this.precioMasFlete > this.variables.precioUsd || this.form.get('cantidad').value < this.appProduct.cantidadMinima) {
                    this.requiereAprobacionPrecio = true;
                    this.colorToolbar = "danger";
                    this.solicitarPrecio = true;
                    this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Precio y Salvar";
                    if( this.form.get('cantidad').value < this.appProduct.cantidadMinima){
                        this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Cantidad Mínima(" +this.appProduct.cantidadMinima + ")" + "  y Salvar";
                    }
                } else {
                    this.requiereAprobacionPrecio = false;
                    this.colorToolbar = "primary";
                    this.solicitarPrecio = false;
                    this.mensajeBotonSolicitarPrecio="";
                }
                if (this.isBs == true) {
                    this.requiereAprobacionPrecio = true;
                    this.colorToolbar = "danger";
                    this.solicitarPrecio = true;
                    this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Precio y Salvar";
                    if( this.form.get('cantidad').value < this.appProduct.cantidadMinima){
                        this.mensajeBotonSolicitarPrecio=" Enviar Aprobación Por Cantidad Mínima(" +this.appProduct.cantidadMinima + ")" + "  y Salvar";
                    }
                }
            }
           
        }


    }

    //Buscador de productos OK
    async onBuscarProductoGeneral() {

        const modal = await this.modalCtrl.create({
            component: BuscadorProductosComponent,
            componentProps: {
                userConectado: this.generalService.GetUsuario().user,
                subCategoria: this._subCategoryid,
            }
        });

        await modal.present();

        //---

        const { data } = await modal.onDidDismiss();


        if (data) {

            //UI

            console.log('Data retornada en buscar general producto',data)
            this.form.get('producto').setValue(data.code);
            this.form.get('descripcionProducto').setValue(data.description);
            if(this.form.get('nombreComercialProducto').value == ''  || this.form.get('producto').value != data.code){
                this.form.get('nombreComercialProducto').setValue(data.description);
            }

            this.appProduct=data.appProduct;
            this.item.appProductsGetDto= this.appProduct;
            this.uiIdProducto = data.id;
            this.uiImageLink = data.link;
            this.uiNombreProductoInCard = data.description
            this._btnUmDisabled = false
            this.decripcionProductionUnit = data.decripcionProductionUnit
            //para la calculadora
            this.dtoCalculadora.appProductId = data.id
            this.dtoCalculadora.appUnitIdUntil = data.idUnidadMedida
            
            this.appPriceDto=data.appPriceDto;
            this._requiereDatosEntrada = data.requiereDatosEntrada

            if(this.appProduct != null  && this.appProduct.tipoCalculo!=1){
                this.form.get('medidaBasica').setValue(0);
                this.form.get('medidaOpuesta').setValue(0);
            }
 
            this.appProductConversionGetDto=this.appProduct.conversiones[0];
            this.form.get('unidad').setValue(this.appProductConversionGetDto.appUnitsAlternativaDescription);
            this.uiIdUnidad = this.appProductConversionGetDto.appUnitsIdAlternativa;
            //this.descripcionSalesUnit =this.appProductConversionGetDto.appUnitsAlternativaDescription;

            //this.form.get('unidad').setValue('');
            //this.appProductConversionGetDto=null;
            //this.descripcionSalesUnit = '';
            //this.uiIdUnidad = 0;
            let cantidadBuscarPrecio = 0;
            if(this.form.get('cantidad').value>0){
                cantidadBuscarPrecio=this.form.get('cantidad').value
            }else{
                cantidadBuscarPrecio=1;
            }

            let precio=this.buscarPrecioPorRango(this.appPriceDto, cantidadBuscarPrecio);
            console.log('precio retornado',precio);
            this.item.unitPriceBaseProduction =precio
            this.unitPriceBaseProduction =precio;
            
            if (this.cotizacion.porcFlete > 0) {
                this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
            }

            this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
            this.precioMasFlete = this.precioMasFlete.toFixed(2);
          
            console.log('Precio Lista', this.unitPriceBaseProduction);
            console.log('Flete', this.flete);
            console.log('Precio mas Flete', this.precioMasFlete);
            this.onRecalcular('onBuscarProducto');

        }





    }


    //Buscador de productos OK
    async onBuscarProducto() {

        const modal = await this.modalCtrl.create({
            component: BuscadorProductosPage,
            componentProps: {
                userConectado: this.generalService.GetUsuario().user,
                subcategoryId: this._subCategoryid

            }
        });

        await modal.present();

        //---

        const { data } = await modal.onDidDismiss();

        if (data.isValid) {

            console.log('DAta en buscar producto', data)
            console.log('Producto',this.form.get('producto').value )
            //UI

            this.form.get('producto').setValue(data.code);
            this.form.get('descripcionProducto').setValue(data.descripcion);
            if(this.form.get('nombreComercialProducto').value == '' || this.form.get('producto').value != data.code){
                this.form.get('nombreComercialProducto').setValue(data.descripcion);
            }
          

            //Propiedades
            this.appProduct=data.appProduct;
            this.item.appProductsGetDto= this.appProduct;
            this.uiIdProducto = data.id;
            this.uiImageLink = data.link;
            this.uiNombreProductoInCard = data.descripcion
            this._btnUmDisabled = false
            this.decripcionProductionUnit = data.decripcionProductionUnit
            //para la calculadora
            this.dtoCalculadora.appProductId = data.id
            this.dtoCalculadora.appUnitIdUntil = data.idUnidadMedida
            
            this.appPriceDto=data.appPriceDto;
            this._requiereDatosEntrada = data.requiereDatosEntrada

            if(this.appProduct != null  && this.appProduct.tipoCalculo!=1){
                this.form.get('medidaBasica').setValue(0);
                this.form.get('medidaOpuesta').setValue(0);
            }
            
            this.appProductConversionGetDto=this.appProduct.conversiones[0];
            this.form.get('unidad').setValue(this.appProductConversionGetDto.appUnitsAlternativaDescription);
            this.uiIdUnidad = this.appProductConversionGetDto.appUnitsIdAlternativa;
            this.descripcionSalesUnit =this.appProductConversionGetDto.appUnitsAlternativaDescription;
            
            //this.form.get('unidad').setValue('');
            //this.appProductConversionGetDto=null;
            //this.descripcionSalesUnit = '';
            //this.uiIdUnidad = 0;


            //Verifico si el id de producto seleccionado ya existe en el array de detalle cotizaciones
            //caso +, asigno dicho elemento a this.item y es todo
            if(this._requiereDatosEntrada && this.appPriceDto != null && this.appPriceDto.length>0){
                let precio=this.buscarPrecioPorRango(this.appPriceDto, this.form.get('cantidad').value);
                console.log('precio retornado',precio);
                this.item.unitPriceBaseProduction =precio
                this.unitPriceBaseProduction =precio;
            }else{
                this.item.unitPriceBaseProduction = +data.precioLista
                this.unitPriceBaseProduction = +data.precioLista;
            }

           
            
            if (this.cotizacion.porcFlete > 0) {
                this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
            }

            this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
            this.precioMasFlete = this.precioMasFlete.toFixed(2);
          
            console.log('Precio Lista', this.unitPriceBaseProduction);
            console.log('Flete', this.flete);
            console.log('Precio mas Flete', this.precioMasFlete);
            this.onRecalcular('onBuscarProducto');


     
        }
    }

    //Buscar unidad de medida OK
    async onBuscarUnidadConEntradas() {

        const modal = await this.modalCtrl.create({
            component: BuscadorUnidadesPage,
            componentProps: {
                userConectado: this.generalService.GetUsuario().user
            }
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();

        if (data.isValid) {

            this._btnCalculadoraDisabled = false;

            //paso datos seleccionados a la ui            
            this.form.get('unidad').setValue(data.descripcion);
            this.descripcionSalesUnit = data.descripcion;
            //propiedades
            this.uiIdUnidad = data.id;

            //para la calculadora
            this.dtoCalculadora.appUnitIdSince = data.id;

            //Llama a la calculadora
            this.calculadoraModal();
        }
    }
    async onBuscarUnidad() {

        const modal = await this.modalCtrl.create({
            component: BuscadorUnidadesComponent,
            componentProps: {
                userConectado: this.generalService.GetUsuario().user,
                producto: this.uiIdProducto,
            }
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();
       
        if (data) {

            console.log("data recibida al buscar unidad", data)

            this._btnCalculadoraDisabled = false;

            //paso datos seleccionados a la ui            
            this.form.get('unidad').setValue(data.descripcion);
            this.appProductConversionGetDto=data.appProductConversion;
            this.descripcionSalesUnit = data.descripcion;
            //propiedades
            this.uiIdUnidad = data.appProductConversion.appUnitsIdAlternativa;
            console.log("data recibida al buscar unidad", this.uiIdUnidad )
            //para la calculadora
            this.dtoCalculadora.appUnitIdSince = data.appProductConversion.appUnitsIdAlternativa;
            this.onRecalcular('onBuscarUnidad');
            //Llama a la calculadora
            //this.calculadoraModal();
        }
    }
    async calculadoraModal() {

        //navego hacia la calculadora y le paso el item seleccionado

        //this.cotizacion.appDetailQuotesGetDto = this.item

        this.cotizacionesListService.cotizacion$.next(this.cotizacion)

        const modal = await this.modalCtrl.create({
            component: CalculadoraPage,
            componentProps: {
                dto: this.dtoCalculadora,
                precioLista: this.cotizacionesListService.precioLista,
                precioListaProduccion: this.cotizacionesListService.precioListaProduccion,
                itemId: this.item.id,
                productId: this.uiIdProducto,
                generalQuoteId: this.cotizacion.id,
            },
            backdropDismiss: false
        });

        //presenta el modal ...
        await modal.present();

        //al retorno del modal ...
        const { data } = await modal.onDidDismiss();

        //en data viene:
        // data.unitPriceConverted,
        // data.dto


        //this.cotizacionesListService.precioLista = +data.precioLista
        this.uiUnitPriceConverted = +data.precioLista
        this.unitPriceBaseProduction = +data.precioListaProduccion

        this.cantidadPorUnidadProduccion = +data.cantidadPorUnidadProduccion;
        this.item.valorConvertido = +data.valorConvertido;
        //this.form.get('unitPriceConverted').setValue(this.generalService.maskFloat(this.cotizacionesListService.precioLista, 4));

        //precio lista calculado
        this.item.unitPriceConverted = +data.precioLista
        this.item.unitPriceBaseProduction = +data.precioListaProduccion
        //lista de variables
        this.item.appTemplateConversionUnitGetDto = data.dto.appTemplateConversionGenericUnitGetDto

        if (this.cotizacion.porcFlete > 0) {
            this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
        }
        this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
        this.precioMasFlete = this.precioMasFlete.toFixed(2);
        //create
        if (this.operacion == 0) {
            //create

            //refresca dto a ser usado caso de actualizar 
            this.detailCreateDto.appConversionUnitGenericCreateDto = data.dto

        }

        //edit
        if (this.operacion == 1) {
            //update

            //refresca dto a ser usado caso de actualizar 
            this.detailUpdateDto.appConversionUnitGenericCreateDto = data.dto
        }
        this.onRecalcular('calculadoraModal');

    }

    decimalCount = num => {
        // Convert to String
        const numStr = String(num);
        // String Contains Decimal
        if (numStr.includes('.')) {
            let longitud = numStr.split('.')[1].length;
            if(longitud>3) longitud=3;
            if(longitud<=2) longitud=2;
           return longitud;
        };
        // String Does Not Contain Decimal
        return 0;
     }

    RecalculoRequiereEntradaLargoAncho(){
        this.mensaje='Buscando precio........' 
        if(this.appProduct.tipoCalculo==1){
            let calculoConversion=this.calculaConversion(
                this.form.get('cantidadSolicitada').value,
                this.form.get('medidaBasica').value,
                this.form.get('medidaOpuesta').value)

            let cantidadPorUnidad= calculoConversion.resulCantidad;
            this.cantidadPorUnidadProduccion=calculoConversion.resulCantidad;
            this.item.valorConvertido=calculoConversion.area;

        }
        let porrcentajeAprovechamiento = 0;
        let cantidadPorUnidad = 0;
        let cantidad = 0;
        porrcentajeAprovechamiento = (this.cantidadPorUnidadProduccion * this.item.valorConvertido);
        cantidad = (this.form.get('cantidadSolicitada').value / this.cantidadPorUnidadProduccion) / porrcentajeAprovechamiento;
        this.form.get('cantidad').setValue(this.form.get('cantidadSolicitada').value / this.cantidadPorUnidadProduccion);
        if (this.dtoCalculadora.appUnitIdUntil == this.dtoCalculadora.appUnitIdSince) {
            this.form.get('cantidad').setValue(this.form.get('cantidadSolicitada').value);
        }
        this.item.cantidad=this.form.get('cantidad').value

        console.log('cantidad de decimales en  RecalculoRequiereEntradaLargoAncho',this.decimalCount(this.form.get('cantidad').value))
        let _align='left'
        this.optionsMask  ={ prefix: '', thousands: '.', decimal: ',', align: _align ,precision: this.decimalCount(this.form.get('cantidad').value)}
        let longitud=this.decimalCount(this.form.get('cantidad').value);
        this.longituDecimal=longitud.toString();

        if(this._requiereDatosEntrada && this.appPriceDto != null && this.appPriceDto.length>0){
            let precio=this.buscarPrecioPorRango(this.appPriceDto, this.form.get('cantidad').value);
            this.item.unitPriceBaseProduction =precio
            this.unitPriceBaseProduction =precio;
        }
        if (this.cotizacion.porcFlete > 0) {
            this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
        }

        this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
        this.precioMasFlete = this.precioMasFlete.toFixed(2);
        this.uiUnitPriceConverted =  this.precioMasFlete/this.cantidadPorUnidadProduccion;
        
        if (this.isBs == true) {

            //COTIZACION EN BS
            if (this.tasa > 0) {
                this.form.get('precioUsd').setValue(this.form.get('precio').value / this.tasa);
            }
            this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);
            this.form.get('totalUsd').setValue(this.form.get('precioUsd').value * this.form.get('cantidad').value);

        }

        if (this.isDolar) {

            //COTIZACION EN DOLARES

            this.form.get('totalUsd').setValue(this.form.get('precioUsd').value * this.form.get('cantidad').value);
            if (this.tasa > 0) {
                if (this.ultimoPrecioUsd != this.form.get('precioUsd').value) {
                    this.ultimoPrecioUsd = this.form.get('precioUsd').value;
                    this.form.get('precio').setValue(this.form.get('precioUsd').value * this.tasa);
                }

            }

            this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);

        }
        this.mensaje='' 
        this.setColorToolbar();
    }
    RecalculoPorRango(){
        this.mensaje='Buscando precio........' 
        let cantidad= this.calculoConversionGenerico(this.appProductConversionGetDto,this.form.get('cantidadSolicitada').value);
        console.log("RecalculoPrecioPorProductoCantidad : variable cantidad",cantidad)
        console.log("this.appProductConversionGetDto",this.appProductConversionGetDto)
        
        this.form.get('cantidad').setValue(cantidad);
        this.cantidadPorUnidadProduccion=cantidad;
        this.item.valorConvertido=this.appProductConversionGetDto.yDenominador;
        console.log("RecalculoPrecioPorProductoCantidad : this.form.get('cantidad').value",this.form.get('cantidad').value)
        console.log('RecalculoPrecioPorProductoCantidad : this.cantidadPorUnidadProduccion', this.cantidadPorUnidadProduccion)
      
        console.log('cantidad de decimales',this.decimalCount(this.cantidadPorUnidadProduccion))
        let _align='left'
        this.optionsMask  ={ prefix: '', thousands: '.', decimal: ',', align: _align ,precision: this.decimalCount(this.cantidadPorUnidadProduccion)}
        let longitud=this.decimalCount(this.form.get('cantidad').value);
        this.longituDecimal=longitud.toString();
        let precio=this.buscarPrecioPorRango(this.appPriceDto, this.form.get('cantidad').value);
        this.item.unitPriceBaseProduction =precio
        this.unitPriceBaseProduction =precio;

        if (this.cotizacion.porcFlete > 0) {
            this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
        }

        this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
        this.precioMasFlete = this.precioMasFlete.toFixed(2);
        this.uiUnitPriceConverted =  this.precioMasFlete/this.cantidadPorUnidadProduccion;
        
        if (this.isBs == true) {

            //COTIZACION EN BS
            if (this.tasa > 0) {
                this.form.get('precioUsd').setValue(this.form.get('precio').value / this.tasa);
            }
            this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);
            this.form.get('totalUsd').setValue(this.form.get('precioUsd').value * this.form.get('cantidad').value);

        }

        if (this.isDolar) {

            //COTIZACION EN DOLARES

            this.form.get('totalUsd').setValue(this.form.get('precioUsd').value * this.form.get('cantidad').value);
            if (this.tasa > 0) {
                if (this.ultimoPrecioUsd != this.form.get('precioUsd').value) {
                    this.ultimoPrecioUsd = this.form.get('precioUsd').value;
                    this.form.get('precio').setValue(this.form.get('precioUsd').value * this.tasa);
                }

            }

            this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);

        }
        this.mensaje='' 
        this.setColorToolbar();
    }
    
   async  RecalculoPrecioPorProductoCantidad(){

        
        let cantidad= this.calculoConversionGenerico(this.appProductConversionGetDto,this.form.get('cantidadSolicitada').value);
        console.log("RecalculoPrecioPorProductoCantidad : variable cantidad",cantidad)
        console.log("this.appProductConversionGetDto",this.appProductConversionGetDto)
        
        this.form.get('cantidad').setValue(cantidad);
        this.cantidadPorUnidadProduccion=cantidad;
        this.item.valorConvertido=this.appProductConversionGetDto.yDenominador;
        console.log("RecalculoPrecioPorProductoCantidad : this.form.get('cantidad').value",this.form.get('cantidad').value)
        console.log('RecalculoPrecioPorProductoCantidad : this.cantidadPorUnidadProduccion', this.cantidadPorUnidadProduccion)
      
        console.log('cantidad de decimales',this.decimalCount(this.cantidadPorUnidadProduccion))
        let _align='left'
        this.optionsMask  ={ prefix: '', thousands: '.', decimal: ',', align: _align ,precision: this.decimalCount(this.cantidadPorUnidadProduccion)}
        let longitud=this.decimalCount(this.form.get('cantidad').value);
        this.longituDecimal=longitud.toString();

        let filter={
            appProuctId: this.uiIdProducto,
            cantidad: this.form.get('cantidadSolicitada').value
        }
        console.log('1-filter en buscar precio producto cantidad',filter)

        this.buscandoPrecio=true;
        this.mensaje='Buscando precio........' 
        await this.productoService.buscaProductoCantidad(filter).subscribe(resp => {
            this.buscandoPrecio=false;
            this.mensaje='' 
            console.log('1.1-buscar producto cantidad',resp)
            let precio= resp.precio
            this.item.unitPriceBaseProduction =precio
            this.unitPriceBaseProduction =precio;
            if (this.cotizacion.porcFlete > 0) {
                this.flete = (this.unitPriceBaseProduction * this.cotizacion.porcFlete) / 100;
            }
            this.precioMasFlete = this.unitPriceBaseProduction + this.flete;
            this.precioMasFlete = this.precioMasFlete.toFixed(2);

            if (this.isBs == true) {

                //COTIZACION EN BS
                if (this.tasa > 0) {
                    this.form.get('precioUsd').setValue(this.form.get('precio').value / this.tasa);
                }
                this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);
                this.form.get('totalUsd').setValue(this.form.get('precioUsd').value * this.form.get('cantidad').value);

            }
    
            if (this.isDolar) {
    
                //COTIZACION EN DOLARES
    
                this.form.get('totalUsd').setValue(this.form.get('precioUsd').value * this.form.get('cantidad').value);
                if (this.tasa > 0) {
                    if (this.ultimoPrecioUsd != this.form.get('precioUsd').value) {
                        this.ultimoPrecioUsd = this.form.get('precioUsd').value;
                        this.form.get('precio').setValue(this.form.get('precioUsd').value * this.tasa);
                    }
    
                }
    
                this.form.get('total').setValue(this.form.get('precio').value * this.form.get('cantidad').value);
    
            }
    
            this.setColorToolbar();

        })

    }


    //------------------------------------
    async onRecalcular(origenLlamada: string) {
        
       
        if(this.appProduct!=null && this.appProductConversionGetDto!=null){
            console.log('tipo de calculo onRecalcular ',this.appProduct.tipoCalculo)
            switch (this.appProduct.tipoCalculo) {
                //RequiereEntradaLargoAncho=1
                case 1:
                    if(this.form.get('medidaBasica').value >0 && this.form.get('medidaOpuesta').value >0 && this.form.get('cantidadSolicitada').value >0 ){
                        this.RecalculoRequiereEntradaLargoAncho();
                        this.setColorToolbar();
                    }
                    
                    break;
                //PrecioPorProducto  
                
                case 2:
                    if(this.form.get('cantidadSolicitada').value >0 ){
                        this.RecalculoPorRango();
                        this.setColorToolbar();
                    }
                    
                    break;
                
                //PrecioPorProductoCantidad     
                case 3:
                    if(this.form.get('cantidadSolicitada').value >0 ){
                        this.RecalculoPrecioPorProductoCantidad();
                        this.setColorToolbar();
                    }
                    
                    break;
            }
        }


    }

    buscarPrecioPorRango(_appPriceDto: AppPriceDto[],cantidad:number):number{
        let result:number;
        console.log('Lista de precio recibida',_appPriceDto)
        console.log('CAntidad Recibida',cantidad)

        let precio = _appPriceDto.filter(x=> cantidad >= x.desde   &&  cantidad <= x.hasta);
        console.log('Precio por rango buscado',precio)
        if(precio!=null && precio.length>0) {
            result = precio[0].precio;
        }else{
            result = _appPriceDto[0].precio;
        }

        return result;
    }
    async buscaPrecioProductoCantidad(appProductId:number,cantidad:number){
        let result:number    

        //let filter:AppRecipesByAppDetailQuotesQueryFilter;
        let filter={
            appProuctId: appProductId,
            cantidad:cantidad
        }
        
        console.log('filter en buscar precio producto cantidad',filter)

        await this.productoService.buscaProductoCantidad(filter).subscribe(resp => {
            console.log('buscar producto cantidad',resp)
            result=1;
            return result;
        })

    }
    //Evento llamado desde Componente
    cantidadChanged(event: number) {

        this.form.get('total').setValue(this.form.get('precio').value * +event);

        this.form.get('totalUsd').setValue(this.form.get('precioUsd').value * +event);




    }
    cantidadSolicitadaChanged(event: number) {


        this.subjectKeyUp.next('cantidadSolicitadaChanged');
       
    }

    calculoConversionGenerico(appProductConversionGetDto:AppProductConversionGetDto,cantidad:number):number{
        console.log('appProductConversionGetDto>>>>>',appProductConversionGetDto)    
        let conversion = new Conversion(appProductConversionGetDto.xNumerador,appProductConversionGetDto.yDenominador,cantidad);
        let result = conversion.getCantidadAlternativa()
        console.log('calculoConversionGenerico',result)
        return result;
    }


    calculaConversion(cantidadSolicitada:number,medidaBasica:number,medidaOpuesta:number):ResultConversionUnidadesMetrosCuadrados{
        console.log('this.parametrosMaquinas.medidaBasicaRollo en calculaConversion',this.parametrosMaquinas.medidaBasicaRollo) 
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

    medidaBasicaChanged($event){
        this.subjectKeyUp.next('medidaBasicaChanged');
    }
    medidaOpuestaChanged($event){
        this.subjectKeyUp.next('medidaOpuestaChanged');
    }
    //Evento llamado desde Componente
    precioUsdChanged(event: number) {

        this.subjectKeyUp.next('precioUsdChanged');
        //this.onRecalcular('precioUsdChanged')

    }

    imprimirCotiza(cotizacion) {
        this.CotizacionesService.cotizacion$.next(cotizacion);
        this.router.navigate(['/menu/imprimir-cotizacion'], { state: {} })
        //this.router.navigate(['/cotizacion-postergar'], { state: { cotizacion } })
    }
    //Evento llamado desde Componente
    precioChanged(event: number) {

        this.subjectKeyUp.next('precioChanged');

        //this.onRecalcular('precioChanged')

    }

    redondear(number: number, precision: number) {

        let result = 0

        //if (+precision > 0)

        result = (+number / Math.pow(10, +precision))

        //else

        //    result = +number

        return result

    }

    onBuscarCaracteristicas(){}
  
    onBuscarordenAnterior() {
             //voy al formulario de edicion
         console.log('Ir a repeticiones',this.cotizacion)
        this.router.navigate(['/menu/repeticiones'], { state: { cotizacion: this.cotizacion} })   //1 edit
    }

}