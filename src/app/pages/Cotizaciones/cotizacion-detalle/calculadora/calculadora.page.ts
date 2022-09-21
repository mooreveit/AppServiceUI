import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

import { CotizacionesListService } from '../../../../services/cotizaciones/cotizaciones-list.service';
import { ProductoService } from '../../../../services/producto.service';

import { AppGeneralQuotesQueryFilter } from 'src/app/interfaces/App-General-Quotes-Query-Filter';

import { AppGeneralQuotesGetDto } from '../../../../models/app-general-quotes-get-dto';
import { AppDetailQuotesGetDto } from '../../../../models/app-detail-quotes-get-dto';
import { AppDetailQuotesConversionUnitCreateDto } from '../../../../models/app-detail-quotes-conversion-unit-create-dto';

import { AppTemplateConversionUnitQueryFilter } from 'src/app/interfaces/app-template-conversion-unit-query-filter';

import { CalculadoraEditorPage } from '../calculadora-editor/calculadora-editor.page';
import { isNumber } from 'util';

import { AppConversionUnitGenericCreateDto } from '../../../../models/app-conversion-unit-generic-create-dto';
import { UnitConvertedGetDto } from '../../../../models/unit-converted-get-dto';
@Component({
    selector: 'app-calculadora',
    templateUrl: './calculadora.page.html',
    styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {

    qryFilter = new AppTemplateConversionUnitQueryFilter();
    cotizacion = new AppGeneralQuotesGetDto();

    public item: AppDetailQuotesGetDto = new AppDetailQuotesGetDto()
    public updatedItem: AppDetailQuotesGetDto = new AppDetailQuotesGetDto()

    listaVariables: any = []
    itemId: number = 0
    productId: number = 0
    generalQuoteId: number = 0

    editable: boolean = true;

    //_idProducto: any;
    //_idUnidadMedida: any;
    _updateDto: AppConversionUnitGenericCreateDto = new AppConversionUnitGenericCreateDto();
    _precioLista: number = 0
    _updateResponse: UnitConvertedGetDto = new UnitConvertedGetDto();
    public _guardando: boolean = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private generalService: GeneralService,
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private productoService: ProductoService,
        public cotizacionesService: CotizacionesListService,
        private actionSheetCtrl: ActionSheetController,
        private alertController: AlertController,
        private toastController: ToastController,
        private navParams: NavParams
    ) { }

    ngOnInit() {

        //recibe desde el editor el dto para crear / update.
        this._updateDto = this.navParams.get('dto');
        this._precioLista = this.navParams.get('precioLista');
        this.itemId = this.navParams.get('itemId');
        this.productId = this.navParams.get('productId');
        this.generalQuoteId = this.navParams.get('generalQuoteId');
        //suscripcion al observable cotizacion
        this.cotizacionesService.cotizacion$.subscribe(_cotizacionFull => {

            //aqui tengo acceso a la cotizacion completa
            this.cotizacion = _cotizacionFull

        });

        if (this.cotizacion) {
            this.editable = this.cotizacion.appStatusQuoteGetDto.editable
        } else {
            this.editable = true;
        }

        if (this._updateDto.appTemplateConversionGenericUnitGetDto.length == 0) {

            //Solicito variables de calculo a la API para
            let since = this._updateDto.appUnitIdSince
            let until = this._updateDto.appUnitIdUntil

            this.qryFilter.appDetailQuotesId = 0
            this.qryFilter.appUnitIdSince = since
            this.qryFilter.appUnitIdUntil = until

            //Obtengo un arreglo con las variables de calculo
            this.productoService.GetTemplateConversionUnit(this.qryFilter).subscribe(resp => {
                //Obtengo respuesta de la API
                console.log('lista de variables', resp.data);
                this.listaVariables = resp.data
            })
        }
        else {
            //Recibo del editor la lista de variables con datos cargados previamente (ARREGLO)
            //No hace ninguna solicitud a la API
            this.listaVariables = this._updateDto.appTemplateConversionGenericUnitGetDto

            //Solicito variables de calculo a la API para
            let since = this._updateDto.appUnitIdSince
            let until = this._updateDto.appUnitIdUntil

            this.qryFilter.appDetailQuotesId = this.itemId
            this.qryFilter.appUnitIdSince = since
            this.qryFilter.appUnitIdUntil = until

            //Obtengo un arreglo con las variables de calculo
            //this.productoService.GetTemplateConversionUnit(this.qryFilter).subscribe(resp => {
            //    //Obtengo respuesta de la API
            //    this.listaVariables = resp.data
            //})

            //07012020
            this.item.id = this.itemId;

            let dtoAppDetailQuotesConversionUnitCreateDto: AppDetailQuotesConversionUnitCreateDto = new AppDetailQuotesConversionUnitCreateDto()

            dtoAppDetailQuotesConversionUnitCreateDto.appDetailQuotesId = this.itemId
            dtoAppDetailQuotesConversionUnitCreateDto.appUnitIdSince = this.qryFilter.appUnitIdSince
            dtoAppDetailQuotesConversionUnitCreateDto.appUnitIdUntil = this.qryFilter.appUnitIdUntil
            dtoAppDetailQuotesConversionUnitCreateDto.appTemplateConversionUnitGetDto = this.listaVariables



            //envio el objeto a la api
            this.productoService.CreateAppDetailQuotesConversionUnit(dtoAppDetailQuotesConversionUnitCreateDto).subscribe(resp => {

                console.log("VARIABLES - grabo variables y pido cotizacion actualizada")
                console.log("Datos recibidos de la api")
                console.log(resp)

                if (resp.meta.isValid) {

                    console.log("LISTA DE VARIABLES RECIBIDA", resp.data)
                    this.listaVariables = resp.data;

                    //pido la cotizacion ya actualizada y cierro el modal - fin de la tarea.
                    let appGeneralQuotesQueryFilter: AppGeneralQuotesQueryFilter;

                    appGeneralQuotesQueryFilter = {
                        pageSize: 0,
                        pageNumber: 0,
                        usuarioConectado: this.generalService.GetUsuario().user,
                        cotizacion: this.cotizacion.cotizacion,
                        searchText: ""
                    };

                    //busco cotizacion actualizada
                    this.cotizacionesService.GetAllGeneralCotizacion(appGeneralQuotesQueryFilter)
                        .subscribe(resp => {



                            //recibe la cotizacion
                            this.cotizacion = resp.data[0]

                            //obtengo el item recalculado
                            let _updatedItem = this.cotizacion.appDetailQuotesGetDto.filter(item => item.id === this.item.id);

                            console.log("not updated item")
                            console.log(this.item)

                            console.log("updated item")
                            console.log(_updatedItem)
                            this.updatedItem = _updatedItem[0]

                            //actualiza el observable
                            this.cotizacionesService.cotizacion$.next(this.cotizacion)

                            //esto es una prueba
                            this.cotizacionesService.precioLista = this.updatedItem.unitPriceConverted
                            this.cotizacionesService.precioListaProduccion = this.updatedItem.unitPriceBaseProduction

                            console.log("la cotizacion actualizada es:")
                            console.log(this.cotizacion);

                            //cierra el modal
                            //this.cerrar()
                        })
                }
                else {
                    this.openToast(resp.meta.message, "danger")
                }

            })



        }

    }

    async editar0(descripcion: string, valor: number, indice: number) {

        const modal = await this.modalCtrl.create({
            component: CalculadoraEditorPage,
            componentProps: {
                descripcion: descripcion,
                valor: valor,
                indice: indice
            }
        });
        await modal.present();

        const { data } = await modal.onDidDismiss();
        console.log("datos retornados por el modal", data);

        //refresco el arreglo que alimenta la lista
        this.listaVariables[data.indice].value = data.valor

    }

    onSaveVariables() {

        this._guardando = true;
        console.log("en onSaveVariables()...")
        //configuro dto para persistir datos cargados y actualizar la cotizacion
        let dtoAppDetailQuotesConversionUnitCreateDto: AppDetailQuotesConversionUnitCreateDto = new AppDetailQuotesConversionUnitCreateDto()


        dtoAppDetailQuotesConversionUnitCreateDto.appGeneralQuotesId = this.generalQuoteId;
        dtoAppDetailQuotesConversionUnitCreateDto.appProductId = this.productId;
        dtoAppDetailQuotesConversionUnitCreateDto.appDetailQuotesId = this.item.id
        dtoAppDetailQuotesConversionUnitCreateDto.appUnitIdSince = this.qryFilter.appUnitIdSince
        dtoAppDetailQuotesConversionUnitCreateDto.appUnitIdUntil = this.qryFilter.appUnitIdUntil
        dtoAppDetailQuotesConversionUnitCreateDto.appTemplateConversionUnitGetDto = this.listaVariables

        this._updateDto.appTemplateConversionGenericUnitGetDto = this.listaVariables;

        console.log("el objeto AppDetailQuotesConversionUnitCreateDto a enviar es: ")
        console.log(dtoAppDetailQuotesConversionUnitCreateDto)

        //envio el objeto a la api
        this.productoService.CreateAppDetailQuotesConversionUnit(dtoAppDetailQuotesConversionUnitCreateDto).subscribe(resp => {

            console.log("VARIABLES - grabo variables y pido cotizacion actualizada")
            console.log("Datos recibidos de la api")
            console.log(resp)

            if (resp.meta.isValid) {

                //pido la cotizacion ya actualizada y cierro el modal - fin de la tarea.
                let appGeneralQuotesQueryFilter: AppGeneralQuotesQueryFilter;

                appGeneralQuotesQueryFilter = {
                    pageSize: 0,
                    pageNumber: 0,
                    usuarioConectado: this.generalService.GetUsuario().user,
                    cotizacion: this.cotizacion.cotizacion,
                    searchText: ""
                };



                //busco cotizacion actualizada
                this.cotizacionesService.GetAllGeneralCotizacion(appGeneralQuotesQueryFilter)
                    .subscribe(resp => {
                        this.openToast("Datos Grabados Correctamente.", "success")
                        console.log("Solicito cotizacion actualizada a la api")
                        console.log("Datos recibidos de la api")
                        console.log(resp)

                        //recibe la cotizacion
                        this.cotizacion = resp.data[0]

                        //obtengo el item recalculado
                        //let _updatedItem = this.cotizacion.appDetailQuotesGetDto.filter(item => item.id === this.item.id);
                        let _updatedItem = this.cotizacion.appDetailQuotesGetDto.filter(item => item.idProducto === this.productId);

                        console.log("not updated item")
                        console.log(this.item)

                        console.log("updated item")
                        console.log(_updatedItem)
                        this.updatedItem = _updatedItem[0]

                        //actualiza el observable
                        this.cotizacionesService.cotizacion$.next(this.cotizacion)

                        //esto es una prueba
                        this.cotizacionesService.precioLista = this.updatedItem.unitPriceConverted
                        this.cotizacionesService.precioListaProduccion = this.updatedItem.unitPriceBaseProduction


                        console.log("la cotizacion actualizada es:")
                        console.log(this.cotizacion);

                        //cierra el modal

                        this.closeModal();
                        this._guardando = false;
                    })
            }
            else {
                this._guardando = false;
                this.openToast(resp.meta.message, "danger")
            }

        })

    }

    //goBack() { 
    //    this._updateDto.appTemplateConversionGenericUnitGetDto = this.listaVariables        
    //}

    _onSaveVariables_NoGrabaLoRequerido() {

        //actualizo dto de update con la lista de variables y sus respectivos valores
        this._updateDto.appTemplateConversionGenericUnitGetDto = this.listaVariables

        //envio el objeto al servicio de productos
        this.productoService.ConversionUnitGeneric(this._updateDto).subscribe(resp => {

            //console.log("LA RESPUESTA OBTENIDA DEL SERVICIO PRODUCTO ES:",resp)

            if (resp.meta.isValid) {

                this._updateResponse = resp.data

                this.cotizacionesService.precioLista = this._updateResponse.unitPriceConverted

                this.modalCtrl.dismiss({
                    precioLista: this._updateResponse.unitPriceConverted,
                    dto: this._updateDto,
                    isValid: true
                })
            }
            else {
                this.openToast(resp.meta.message, "danger")
            }

        })

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


    cerrar(n = 3000) {

        //setTimeout(() => {
        //    this.router.navigate(['edit-detalle-cotizacion'], { state: { item: this.updatedItem, operacion: 1 } })   //1 edit
        //}, n);

    }


    isNumber(value: string | number): boolean {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }

    async editar(descripcion: string, valor: number, indice: number, min: number, max: number) {


        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: descripcion,
            subHeader: 'Ingrese su valor y confirme',
            message: '',
            inputs: [
                {
                    name: 'userVal',
                    type: 'number',
                    placeholder: 'Ingrese valor de la variable',
                    value: valor
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Cancel: OK Cancel...');
                    }
                }, {
                    text: 'Confirmar',
                    handler: (data) => {
                        let numerico = this.isNumber(data.userVal)
                        //if (numerico && Number(data.userVal) > 0.000001) {
                        console.log('Minimo', min)
                        console.log('Maximo', max)
                        if (numerico && this.valorValido(Number(data.userVal), min, max)) {
                            this.listaVariables[indice].value = Number(data.userVal)
                            //console.log("data vale:")
                            //console.log(data)
                        }
                        else {
                            this.openToast("Valor de medida minimo es de: " + min.toString() + " Cm y maximo de: " + max.toString(), "danger")
                            //this.listaVariables[indice].value = 3
                            return false;
                        }
                    }
                }
            ]
        });
        if (indice >= 0 && indice <= 1) { await alert.present(); }

    }

    valorValido(valor: number, min: number, max: number) {
        if (valor >= min && valor <= max) {
            return true;
        } else {
            return false
        }
    }

    closeModal() {


        this.modalCtrl.dismiss({
            isValid: false,
            precioLista: this.cotizacionesService.precioLista,
            precioListaProduccion: this.cotizacionesService.precioListaProduccion,
            dto: this._updateDto,
            valorConvertido: this.updatedItem.valorConvertido,
            cantidadPorUnidadProduccion: this.updatedItem.cantidadPorUnidadProduccion,
        })




        /* setTimeout(() => {
            this.modalCtrl.dismiss({
                isValid: false,
                precioLista: this.cotizacionesService.precioLista,
                precioListaProduccion: this.cotizacionesService.precioListaProduccion,
                dto: this._updateDto,
                valorConvertido: this.updatedItem.valorConvertido,
                cantidadPorUnidadProduccion: this.updatedItem.cantidadPorUnidadProduccion,
            })
        }, 3000); */

    }

}
