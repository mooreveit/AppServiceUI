import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MtrTipoMonedaDto } from 'src/app/models/mtr-tipo-moneda-dto';
import { AppSubcategoryGetDto } from 'src/app/models/app-subcategory-get-dto'
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppProductosCreateDto } from 'src/app/models/app-products-create-dto';
import { ModalController, ToastController } from '@ionic/angular';
import { BuscadorUnidadesPage } from '../../Cotizaciones/cotizacion-detalle/buscador-unidades/buscador-unidades.page';
import { GeneralService } from 'src/app/services/general.service';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { ProductoService } from 'src/app/services/producto.service';
import { AppProductsGetDto } from 'src/app/models/app-products-get-dto';
import { AppProductsUpdateDto } from 'src/app/models/app-products-update-dto';
import { AppProdutsQueryFilter } from 'src/app/interfaces/app-produts-query-filter';
import { AppProductImageDto } from '../../../models/app-product-image-dto';
import { BuscadorUnidadesComponent } from '../../../components/buscador-unidades/buscador-unidades.component';
@Component({
    selector: 'app-productos-edit',
    templateUrl: './productos-edit.page.html',
    styleUrls: ['./productos-edit.page.scss'],
})
export class ProductosEditPage implements OnInit {

    form: FormGroup;
    Operacion: number;
    usuario: IUsuario;
    titiloSuperiorComponente: string;
    listMtrTipoMonedasDto: MtrTipoMonedaDto[] = [];
    appSubcategoryGetDto: AppSubcategoryGetDto[] = [];
    appProductosCreateDto: AppProductosCreateDto = new AppProductosCreateDto();
    appProductsUpdateDto: AppProductsUpdateDto = new AppProductsUpdateDto();
    appProductsGetDto: AppProductsGetDto = new AppProductsGetDto();
    appProdutsQueryFilter: AppProdutsQueryFilter;
    flagInsert = false;
    flagUpdate = false;
    public tipoCalculos:any = [
        {id:1,descripcion:"Requiere Entrada Largo,Ancho"},
        {id:2,descripcion:"Precio Por Producto"},
        {id:3,descripcion:"Precio Por Producto Cantidad" }
    ];

    //Para el manejo de image
    public imagePath: any;
    public base64: any;
    public subirImagen: boolean = false;
    public appProductImageDto: AppProductImageDto = new AppProductImageDto()
    public _guardando:boolean=false;
    public _subCategoryid: any;

    constructor(
        private productoService: ProductoService,
        private router: Router,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private gs: GeneralService,
        public toastController: ToastController,
    ) {
        this.buildForm()
    }

    ngOnInit() {

      
       
        

        this.appProdutsQueryFilter = {
            pageSize: 0,
            pageNumber: 1,
            id: 0,
            code: '',
            description1: '',
            description2: '',
            searchText: '',
            subCategoria: 0
        }

        this.Operacion = this.router.getCurrentNavigation().extras.state.flag;

        this.usuario = this.gs.GetUsuario();

        this.cargarComboMonedas();

        //this.buildForm();

        //this.cargarSelectSubCategoria();

        let data =
        {
            Id: 0,
            Description: ""
        }


        //Busco subcategorias 

        this.productoService.SubCategoryGetAll(data).subscribe(result => {

            this.appSubcategoryGetDto = result.data

            /* Se usa para hacer una llamada al servicio de producto actualizar la lista luego de completar una tarea de insert o update */

            /* variable Operacion === 0, para añadir nuevo producto.*/

            if (this.Operacion === 0) {
                this.flagInsert = true;
                this.titiloSuperiorComponente = 'Añadir nuevo producto';
            }

            /* variable Operacion === 1, para Actualizar un nuevo existente.*/
            if (this.Operacion === 1) {

                this.flagUpdate = true;
                this.titiloSuperiorComponente = 'Edición de Producto';

                this.productoService.product$.subscribe(product => {

                    this.appProductsGetDto = product;

                    console.log("ok")
                    console.log("this.appProductsGetDto=")
                    console.log(this.appProductsGetDto)

                    console.log("this.appProductsGetDto.appSubCategoryGetDto=")
                    console.log(this.appProductsGetDto.appSubCategoryGetDto)

                    console.log("this.appProductsGetDto.appSubCategoryGetDto.id=")
                    console.log(this.appProductsGetDto.appSubCategoryGetDto.id)

                    console.log("product=")
                    console.log(product)

                    console.log("product.appSubCategoryId=")
                    console.log(product.appSubCategoryId)

                    this.appProductsUpdateDto.AppUnitsId = this.appProductsGetDto.appUnitsId;
                    this.appProductsUpdateDto.ProductionUnitId = this.appProductsGetDto.productionUnitGetDto.id

                    this.form.get('code').setValue(product.code);
                    this.form.get('externalCode').setValue(product.externalCode);
                    this.form.get('description1').setValue(product.description1);
                    this.form.get('description2').setValue(product.description2);
                    this.form.get('precioproducto').setValue(product.unitPrice);
                    this.form.get('unidadventa').setValue(product.appUnitsGetDto.description4);
                    this.form.get('unidadproduccion').setValue(product.productionUnitGetDto.description4);
                    this.form.get('idMonedaPrimaria').setValue(product.prymaryMtrMonedaId);
                    this.form.get('idMonedaSecundaria').setValue(product.secundaryMtrMonedaId);

                    this._subCategoryid = product.appSubCategoryId
                    this.form.get('validadCantidadFija').setValue(product.validadCantidadFija);
                    this.form.get('cantidadFija').setValue(product.cantidadFija);
                    this.form.get('cantidadMinima').setValue(product.cantidadMinima);
                    this.form.get('tipoCalculo').setValue(product.tipoCalculo);

                    //this.form.get('subCategoriaId').setValue(this.x)                                         
                });
            }
        });
    }


    buildForm() {

        this.form = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            externalCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            description1: ['', [Validators.required]],
            description2: ['', [Validators.required]],
            precioproducto: ['', [Validators.required]],
            unidadventa: ['', [Validators.required]],
            unidadproduccion: ['', [Validators.required]],
            idMonedaPrimaria: [0, [Validators.required]],
            idMonedaSecundaria: [0, [Validators.required]],
            subCategoriaId: [0, [Validators.required]],
            validadCantidadFija:[false, [Validators.required]],
            cantidadFija:[0, [Validators.required]],
            cantidadMinima: [0, [Validators.required]],
            tipoCalculo:[0, [Validators.required]]
        });
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

    private cargarComboMonedas() {

        this.listMtrTipoMonedasDto = JSON.parse(localStorage.getItem("listMoneda"));

    }

    //NO SE USA, ESTA EN NGONINIT
    /*
    private cargarSelectSubCategoria(){
   
        let data =
        {
            Id:0,
            Description:""
        }

        this.productoService.SubCategoryGetAll(data).subscribe(result =>{
            this.appSubcategoryGetDto = result.data 
        });
    
    }
    */

    onChangeMonedaPrimaria(event) {

        if (this.Operacion === 0) {
            this.appProductosCreateDto.PrymaryMtrMonedaId = event.detail.value;
        } else {
            this.appProductsUpdateDto.PrymaryMtrMonedaId = event.detail.value;
        }

    }

    onChangeMonedaSecundaria(event) {
        if (this.Operacion === 0) {
            this.appProductosCreateDto.SecundaryMtrMonedaId = event.detail.value;
        }
        else {
            this.appProductsUpdateDto.SecundaryMtrMonedaId = event.detail.value;
        }
    }

    onChangeSubCategoriaId(event) {

        //Establezco ID de sub-categoria
        this._subCategoryid = event.detail.value;

        if (this.Operacion === 0) {
            //create
            this.appProductosCreateDto.AppSubCategoryId = event.detail.value;
        }
        else {
            //edit
            this.appProductsUpdateDto.AppSubCategoryId = event.detail.value;
        }

        this.appProductosCreateDto.AppSubCategoryId = event.detail.value;

        console.log("for update ", this.appProductsUpdateDto)
    }

    async onBuscarUnidadVenta() {

        const modal = await this.modalCtrl.create({
            component: BuscadorUnidadesComponent,
            componentProps: {
                userConectado: this.gs.GetUsuario().user
            }
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();

        if (this.Operacion === 0) {
            this.appProductosCreateDto.AppUnitsId = data.id;
        } else {
            this.appProductsUpdateDto.AppUnitsId = data.id;
        }

        this.form.get('unidadventa').setValue(data.descripcion);
    }


    async onBuscarUnidadProduccion() {

        const modal = await this.modalCtrl.create({
            component: BuscadorUnidadesComponent,
            componentProps: {
                userConectado: this.gs.GetUsuario().user
            }
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();

        if (this.Operacion === 0) {
            this.appProductosCreateDto.ProductionUnitId = data.id;
        } else {
            this.appProductsUpdateDto.ProductionUnitId = data.id;
        }

        this.form.get('unidadproduccion').setValue(data.descripcion);
    }


    // Operaciones CRUD sobre productos


    insertProducto() {

        this.appProductosCreateDto.Code = this.form.controls['code'].value;
        this.appProductosCreateDto.externalCode = this.form.controls['externalCode'].value;
        this.appProductosCreateDto.Description1 = this.form.controls['description1'].value;
        this.appProductosCreateDto.Description2 = this.form.controls['description2'].value;
        this.appProductosCreateDto.UnitPrice = this.form.controls['precioproducto'].value;
        this.appProductosCreateDto.UsuarioConectado = this.usuario.user
        this.appProductosCreateDto.validadCantidadFija=this.form.controls['validadCantidadFija'].value;
        this.appProductosCreateDto.cantidadFija=this.form.controls['cantidadFija'].value;
        this.appProductosCreateDto.cantidadMinima=this.form.controls['cantidadMinima'].value;
        this.appProductosCreateDto.tipoCalculo=this.form.controls['tipoCalculo'].value;
      
      



        /* Codigo harcodeado solo para probar el insert*/
        this.appProductosCreateDto.UrlImage = '';


        console.log(this.appProductosCreateDto);
        this._guardando=true;
        this.productoService.InsertProduct(this.appProductosCreateDto).subscribe(result => {
            this._guardando=false;
            if (result.meta.isValid === true) {

                this.openToast(result.meta.message, 'success');

                setTimeout(() => {
                    this.productoService.GetAllAppProducts(this.appProdutsQueryFilter)
                }, 500);

            } else {
                this.openToast(result.meta.message, 'danger');
            }

        })

    }

    updateProducto() {

        this.appProductsUpdateDto.id = this.appProductsGetDto.id;
        this.appProductsUpdateDto.Code = this.form.controls['code'].value;
        this.appProductsUpdateDto.externalCode = this.form.controls['externalCode'].value;
        this.appProductsUpdateDto.Description1 = this.form.controls['description1'].value;
        this.appProductsUpdateDto.Description2 = this.form.controls['description2'].value;
        this.appProductsUpdateDto.UnitPrice = this.form.controls['precioproducto'].value;
        this.appProductsUpdateDto.PrymaryMtrMonedaId = this.form.controls['idMonedaPrimaria'].value;
        this.appProductsUpdateDto.SecundaryMtrMonedaId = this.form.controls['idMonedaSecundaria'].value;
        this.appProductsUpdateDto.validadCantidadFija=this.form.controls['validadCantidadFija'].value;
        this.appProductsUpdateDto.cantidadFija=this.form.controls['cantidadFija'].value;
        this.appProductsUpdateDto.cantidadMinima=this.form.controls['cantidadMinima'].value;
        this.appProductsUpdateDto.tipoCalculo=this.form.controls['tipoCalculo'].value;
      


        //this.appProductsUpdateDto.AppSubCategoryId = +this.form.controls['subCategoriaId'].value;    
        this.appProductsUpdateDto.AppSubCategoryId = this._subCategoryid;

        this.appProductsUpdateDto.UsuarioConectado = this.usuario.user;

        /* codigo hardcode para prueba...esto debe ser solventado*/
        //this.appProductsUpdateDto.AppSubCategoryId = 1
        //this.appProductsUpdateDto.UrlImage = ''

        console.log("objeto para actualizacion: appProductsUpdateDto", this.appProductsUpdateDto)
        console.log(this.appProductsUpdateDto);
        this._guardando=true;
        this.productoService.UpdateProduct(this.appProductsUpdateDto).subscribe(result => {
            this._guardando=false;
            if (result.meta.isValid === true) {
                this.openToast(result.meta.message, 'success');

                setTimeout(() => {
                    this.productoService.GetAllAppProducts(this.appProdutsQueryFilter)
                }, 500);

            } else {
                this.openToast(result.meta.message, 'danger');
            }

        });

    }


    //permite seleccionar imagen
    selectProductImage(event) {

        console.log(event.target.value);

        //archivo seleccionado         
        var file: any = event.target.files[0];

        var nameSelectedFile: string = event.target.value.toLowerCase()

        if (nameSelectedFile.includes(".png")) {

            //objeto lector del archivo
            var reader = new FileReader();

            //despues de leer el archivo....
            reader.onloadend = () => {

                this.base64 = reader.result;

                let imageString = this.base64.toString()

                let offsetInicioData: number = imageString.indexOf(",") + 1

                let data: string = imageString.substring(offsetInicioData)

                //configuro DTO                
                this.appProductImageDto.id = this.appProductsGetDto.id
                this.appProductImageDto.data = data

            }

            //leo el archivo
            reader.readAsDataURL(file);

            //habilita subir imagenes
            this.subirImagen = true
        }
        else {

            this.appProductImageDto.id = 0
            this.appProductImageDto.data = ""

            //deshabilita subir imagenes
            this.subirImagen = false

            alert("Solo formato PNG.")
        }


    }

    //muestra base64 de la imagen
    uploadProductImage() {

        //llamo al servicio de
        this.productoService.UpdateProductImage(this.appProductImageDto).subscribe(resp => {

            //deshabilita subir imagen, debe seleccionar de nuevo
            this.subirImagen = false;

            if (resp.meta.isValid) {
                this.openToast(resp.meta.message, "success")
            }
            else {
                this.openToast(resp.meta.message, "danger")
            }
        })

    }

}
