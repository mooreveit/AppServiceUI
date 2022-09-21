import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { SearchClientePage } from '../../clientes/search-cliente/search-cliente.page';
import { CotizacionesListService } from '../../../services/cotizaciones/cotizaciones-list.service';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { GeneralService } from 'src/app/services/general.service';
import { AppGeneralQuotesCreateDto } from '../../../models/app-general-quotes-create-dto';
import { CondicionPagoQueryFilter } from 'src/app/interfaces/condicion-pago-query-filter';
import { CondicionesPagoService } from '../../../services/condiciones-pago.service';
import { CondicionPagoDto } from '../../../models/CondicionPagoDto';
import { SearchContactosPage } from '../../clientes/search-contactos/search-contactos.page'
import { DireccionListPage } from '../../direcciones/direccion-list/direccion-list.page'
import { MtrDireccionesDto } from 'src/app/models/mtr-direcciones-dto';
import { AppGeneralQuotesGetDto } from '../../../models/app-general-quotes-get-dto';
import { AppGeneralQuotesUpdateDto } from '../../../models/app-general-quotes-update-dto';
import { MtrTipoMonedaDto } from 'src/app/models/mtr-tipo-moneda-dto';
import { AppGeneralQuotesQueryFilter } from 'src/app/interfaces/App-General-Quotes-Query-Filter';
import { ContactosListPage } from '../../contactos/contactos-list/contactos-list.page';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteRif } from '../../../models/cliente-rif';
import { BuscadorMunicipioComponent } from '../../../components/buscador-municipio/buscador-municipio.component';
import { MunicipioGetDto } from '../../../models/municipio-get-dto';
import { AppProductConversionGetDto } from 'src/app/models/app-product-conversion-get-dto';
import { AppProductConversionFilter } from 'src/app/interfaces/app-product-conversion-filter';

@Component({
  selector: 'app-cotizacion-edit',
  templateUrl: './cotizacion-edit.page.html',
  styleUrls: ['./cotizacion-edit.page.scss'],
})
export class CotizacionEditPage implements OnInit {

  rifPattern: string;
  titulo: String;
  habilitarDetallePLus = false;
  flagInsert: boolean;
  flagUpdate: boolean;
  nombreContacto: String;
  flagDirEntrega: boolean = false

  usuario: IUsuario;
  form: FormGroup;
  nombreCliente: string = "";
  condicionPagoQueryFilter: CondicionPagoQueryFilter;
  clienteRif: ClienteRif = new ClienteRif();
  condicionPagoDto: CondicionPagoDto;
  mensaje: string;
  generalCotizacion: AppGeneralQuotesCreateDto = new AppGeneralQuotesCreateDto();
  direccionFacturar: MtrDireccionesDto;
  direccionEntrega: MtrDireccionesDto;
  itemMunicipioGetDto: MunicipioGetDto;
  public appGeneralQuotesGetDto: AppGeneralQuotesGetDto = new AppGeneralQuotesGetDto();
  private appGeneralQuotesUpdateDto: AppGeneralQuotesUpdateDto = new AppGeneralQuotesUpdateDto();
  listMtrTipoMonedasDto: MtrTipoMonedaDto[] = [];

  appGeneralQuotesQueryFilter: AppGeneralQuotesQueryFilter;





  pageSize = 20;
  page = 0;

  public editable: boolean = true;

  //new
  public _condicionPagoCodigo: number = 0;
  public _editar: boolean = false
  public _guardando: boolean = false;
  public _cotizacionTitulo = "";

  constructor(
    private formBuilder: FormBuilder,
    private cotizaService: CotizacionesListService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private gs: GeneralService,
    private condicionesPago: CondicionesPagoService,
    private CotizacionesService: CotizacionesListService,
    public toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.buildForm();
  }

  ngOnInit() {

    this._editar = this.router.getCurrentNavigation().extras.state.flag

    if (this._editar === undefined) { this._editar = false }
    this.CotizacionesService.cotizacion$.subscribe(dat => {
      this.appGeneralQuotesGetDto = dat
    });

    console.log("ngOnInit() cotizacion es:")
    //console.log(this.appGeneralQuotesGetDto)
    console.log(this._editar)
    if (this._editar && this.appGeneralQuotesGetDto.appStatusQuoteGetDto.editable) {
      this.editable = this.appGeneralQuotesGetDto.appStatusQuoteGetDto.editable
    } else {
      this.editable = true;
    }


    this.usuario = this.gs.GetUsuario();
    this.cargarComboMonedas();
    this.generalCotizacion.usuarioActualiza = this.usuario.user;

    this.cotizaService.direccionFacturarCliente$.next('');
    this.cotizaService.direccionEntregaCliente$.next('');

    this.condicionPagoQueryFilter = {
      codigo: 0
    };

    this.condicionesPago.GetAllCondicionPago(this.condicionPagoQueryFilter).subscribe(resp => {

      this.condicionPagoDto = resp.data;

      // LLamada desde list-cotizacion para editar una cotizacion

      if (this._editar) {

        this.titulo = "Editar Cotización";
        this.flagUpdate = true;
        this.habilitarDetallePLus = true;
        this.flagDirEntrega = true;
        this._cotizacionTitulo = this.appGeneralQuotesGetDto.cotizacion + " - " + this.appGeneralQuotesGetDto.mtrClienteDto.nombre;
        this.nombreCliente = this.appGeneralQuotesGetDto.mtrClienteDto.nombre;
        this.nombreContacto = this.appGeneralQuotesGetDto.mtrContactosDto.nombre;

        this.direccionFacturar = this.appGeneralQuotesGetDto.mtrDireccionesFacturarDto;
        this.direccionEntrega = this.appGeneralQuotesGetDto.mtrDireccionesEntregarDto;

        this.CotizacionesService.direccionFacturarCliente$.next(this.direccionFacturar);
        this.CotizacionesService.direccionEntregaCliente$.next(this.direccionEntrega);

        this.appGeneralQuotesUpdateDto.id = this.appGeneralQuotesGetDto.id;
        this.appGeneralQuotesUpdateDto.cotizacion = this.appGeneralQuotesGetDto.cotizacion;

        // Setea los valores de la cotizacion a editar a los controles del formulario
        this.form.get('codigoCliente').setValue(this.appGeneralQuotesGetDto.idCliente);

        //this.form.get('condicionPago').setValue(this.appGeneralQuotesGetDto.condicionPagoDto.codigo);
        this._condicionPagoCodigo = this.appGeneralQuotesGetDto.condicionPagoDto.codigo

        this.form.get('idContacto').setValue(this.appGeneralQuotesGetDto.mtrContactosDto.idContacto);

        this.form.get('ordenCompra').setValue(this.appGeneralQuotesGetDto.ordenCompra);

        this.form.get('observaciones').setValue(this.appGeneralQuotesGetDto.observaciones);

        this.form.get('idDireccionEntrega').setValue(this.appGeneralQuotesGetDto.idDireccionEntregar);

        this.form.get('idDireccionFacturar').setValue(this.appGeneralQuotesGetDto.idDireccionFacturar);

        this.form.get('idMoneda').setValue(this.appGeneralQuotesGetDto.idMtrTipoMoneda);



        if (this.appGeneralQuotesGetDto.idMtrTipoMoneda == 1) {
          this.form.get('fijarPrecioBs').setValue(true);
        } else {
          this.form.get('fijarPrecioBs').setValue(false);
        }

        //this.form.get('fijarPrecioBs').setValue(this.appGeneralQuotesGetDto.fijarPrecioBs);

        this.form.get('rif').setValue(this.appGeneralQuotesGetDto.rif);

        this.form.get('razonSocial').setValue(this.appGeneralQuotesGetDto.razonSocial);

        this.form.get('direccion').setValue(this.appGeneralQuotesGetDto.direccion);
        this.form.get('idMunicipio').setValue(this.appGeneralQuotesGetDto.idMunicipio);
        this.form.get('descripcionMunicipio').setValue(this.appGeneralQuotesGetDto.descripcionMunicipio);

        if (this.appGeneralQuotesGetDto.idCliente == '000000') {
          this.flagDirEntrega = false;
        } else {
          this.flagDirEntrega = true;
        }


      } else {
        this._cotizacionTitulo = "";

        this.titulo = "Añadir Cotización"
        this.flagInsert = true;
      }

    });

  }

  private cargarComboMonedas() {
    this.listMtrTipoMonedasDto = JSON.parse(localStorage.getItem("listMoneda"));
  }

  onChangeMoneda(event) {
    console.log("En onChangeMoneda, event.detail.value tiene el valor:")
    console.log(typeof event.detail.value);

    this.generalCotizacion.idMtrTipoMoneda = event.detail.value;
    if (this.generalCotizacion.idMtrTipoMoneda == 1) {
      this.form.get('fijarPrecioBs').setValue(true);
    } else {
      this.form.get('fijarPrecioBs').setValue(false);
    }

  }

  private buildForm() {
    this.rifPattern = "[JGVE][-][0-9]{8}[-][0-9]";
    this.form = this.formBuilder.group({

      codigoCliente: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      condicionPago: ['', [Validators.required]],
      idContacto: ['', [Validators.required]],
      ordenCompra: ['',],
      observaciones: ['', []],
      idDireccionEntrega: [''],
      idDireccionFacturar: [''],
      idMoneda: [0, [Validators.required]],
      fijarPrecioBs: [false],
      rif: ['', [Validators.pattern(this.rifPattern)]],
      razonSocial: ['', [Validators.required, Validators.maxLength(80)]],
      direccion: ['', [Validators.required, Validators.maxLength(240)]],
      idMunicipio: [0, []],
      descripcionMunicipio: ['', []],
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


  async onBuscarCliente() {

    const modal = await this.modalCtrl.create({
      component: SearchClientePage,
      componentProps: {
        userConectado: this.usuario.user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal*******", data);

    this.nombreCliente = data.nombreCliente;

    this.generalCotizacion.idCliente = data.clienteSeleccionado;
    this.form.get('codigoCliente').setValue(data.clienteSeleccionado);
    this.form.get('rif').setValue(data.rif);
    this.form.get('razonSocial').setValue(data.nombreCliente);
    if (data.mtrDireccionesDto) {
      this.form.get('direccion').setValue(data.mtrDireccionesDto.direccion);
    }


    this.generalCotizacion.idDireccionFacturar = data.idDireccion;
    this.direccionFacturar = data.mtrDireccionesDto;

    this.form.get('idDireccionFacturar').setValue( data.idDireccion);
    this.form.get('idDireccionEntrega').setValue('');
    this.CotizacionesService.direccionFacturarCliente$.next(this.direccionFacturar);
    if (this.generalCotizacion.idCliente == '000000') {
      this.flagDirEntrega = false;
    } else {
      this.flagDirEntrega = true;
    }

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


  async onBuscarIdDireccionEntrega() {

    let idCliente;

    if (this.flagUpdate === true) {
      idCliente = this.form.controls['codigoCliente'].value
    } else {
      idCliente =this.form.controls['codigoCliente'].value
    }


    const modal = await this.modalCtrl.create({
      component: DireccionListPage,
      componentProps: {
        userConectado: this.usuario.user,
        idCliente: idCliente
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log(data.direccionEntregaCliente);
    this.direccionEntrega = data.direccionEntregaCliente;

    this.generalCotizacion.idDireccionEntregar = this.direccionEntrega.id;
    this.form.get('idDireccionEntrega').setValue(this.direccionEntrega.id);
    this.CotizacionesService.direccionEntregaCliente$.next(this.direccionEntrega);

  }


  async onBuscarContacto() {

    let idCliente;

    if (this.flagUpdate === true) {
      idCliente = this.appGeneralQuotesGetDto.idCliente
    } else {
      idCliente = this.generalCotizacion.idCliente
    }

    const modal = await this.modalCtrl.create({
      component: SearchContactosPage,
      componentProps: {
        cliente: idCliente
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    this.generalCotizacion.idContacto = data.idContacto;
    this.form.get('idContacto').setValue(data.idContacto);
    this.nombreContacto = data.nombreContacto;
  }

  async onAddContacto() {

    let idCliente;


    if (this.flagUpdate === true) {
      idCliente = this.appGeneralQuotesGetDto.idCliente
    } else {
      idCliente = this.generalCotizacion.idCliente
    }

    if (!idCliente) {
      this.openToast("Cliente Invalido", 'danger');
      return;
    }
    if (!this.form.controls['rif'].value) {
      this.openToast("Rif Invalido", 'danger');
      return;
    }

    this.clienteRif = {
      cliente: idCliente,
      rif: this.form.controls['rif'].value
    };



    const modal = await this.modalCtrl.create({
      component: ContactosListPage,
      componentProps: {
        clienteRif: this.clienteRif
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    this.generalCotizacion.idContacto = data.idContacto;
    this.form.get('idContacto').setValue(data.idContacto);
    this.nombreContacto = data.nombreContacto;
  }

  get rifField() {
    return this.form.get('rif')
  }

  get rifFieldIsValid() {
    return this.rifField.touched && this.rifField.valid
  }

  get rifFieldIsInvalid() {
    return this.rifField.touched && this.rifField.invalid
  }


  onChangeCondicionPago(event) {

    this.generalCotizacion.idCondPago = event.target.value;

    this._condicionPagoCodigo = event.target.value;
  }

  insertCotizacion() {

    if (!this.flagDirEntrega) {
      if (this.form.controls['idMunicipio'].value <= 0) {
        this.openToast("Por favor indique el Municipio a Entregar el Material", 'danger');
        return;

      }

    }



    this._guardando = true;
    this.generalCotizacion.ordenCompra = this.form.controls['ordenCompra'].value;
    this.generalCotizacion.observaciones = this.form.controls['observaciones'].value;
    this.generalCotizacion.fijarPrecioBs = this.form.controls['fijarPrecioBs'].value;
    this.generalCotizacion.rif = this.form.controls['rif'].value;
    this.generalCotizacion.razonSocial = this.form.controls['razonSocial'].value;
    this.generalCotizacion.direccion = this.form.controls['direccion'].value;
    this.generalCotizacion.idMunicipio = this.form.controls['idMunicipio'].value;



    this.CotizacionesService.InsertGeneralCotizacion(this.generalCotizacion).subscribe(result => {

      this.appGeneralQuotesGetDto = result.data;
      console.log("******el result enviado por la api despues de insertar es:********")
      console.log(result)

      console.log("el result.data enviado por la api despues de insertar es:")
      console.log(result.data)

      if (result.meta.isValid === true) {

        //refrescar el observable
        this.CotizacionesService.cotizacion$.next(result.data)

        this.habilitarDetallePLus = true;
        this.flagInsert = false;
        this.openToast(result.meta.message, 'success');
        this._guardando = false;
       
        //this.router.navigate(['/menu/cotizacion-edit'], { state: { flag: true } })
        //this.goListDetalleCotizacion(); 
      } else {

        this.openToast(result.meta.message, 'danger');
        this._guardando = false;
      }
    });

  }

  UpdateCotizacion() {

    if (!this.flagDirEntrega) {
      if (this.form.controls['idMunicipio'].value <= 0) {
        this.openToast("Por favor indique el Municipio a Entregar el Material", 'danger');
        return;

      }

    }


    this._guardando = true;
    this.appGeneralQuotesUpdateDto.idCliente = this.form.controls['codigoCliente'].value;

    this.appGeneralQuotesUpdateDto.idCondPago = this._condicionPagoCodigo;

    this.appGeneralQuotesUpdateDto.idContacto = this.form.controls['idContacto'].value;
    this.appGeneralQuotesUpdateDto.ordenCompra = this.form.controls['ordenCompra'].value;
    this.appGeneralQuotesUpdateDto.observaciones = this.form.controls['observaciones'].value;
    this.appGeneralQuotesUpdateDto.idDireccionEntregar = this.form.controls['idDireccionEntrega'].value;
    this.appGeneralQuotesUpdateDto.idDireccionFacturar = this.form.controls['idDireccionFacturar'].value;
    this.appGeneralQuotesUpdateDto.idMtrTipoMoneda = this.form.controls['idMoneda'].value;
    this.appGeneralQuotesUpdateDto.usuarioActualiza = this.usuario.user;
    this.appGeneralQuotesUpdateDto.fijarPrecioBs = this.form.controls['fijarPrecioBs'].value;
    this.appGeneralQuotesUpdateDto.rif = this.form.controls['rif'].value;
    this.appGeneralQuotesUpdateDto.razonSocial = this.form.controls['razonSocial'].value;
    this.appGeneralQuotesUpdateDto.direccion = this.form.controls['direccion'].value;
    this.appGeneralQuotesUpdateDto.idMunicipio = this.form.controls['idMunicipio'].value;

    console.log("el objeto enviado a la API para actualizar es:")
    console.log(this.appGeneralQuotesUpdateDto)

    this.cotizaService.UpdateGeneralCotizacion(this.appGeneralQuotesUpdateDto).subscribe(result => {

      this.appGeneralQuotesGetDto = result.data

      console.log("******el result enviado por la api despues de actualizar es:********")
      console.log(result)

      console.log("el result.data enviado por la api despues de actualizar es:")
      console.log(result.data)

      if (result.meta.isValid = true) {


        //refrescar el observable
        this.CotizacionesService.cotizacion$.next(result.data)

        this.openToast(result.meta.message, 'success')
        this._guardando = false;
        //this.router.navigate(['/menu/cotizacion-edit'], { state: { flag: true } })
        //this.goListDetalleCotizacion(); 

      } else {

        this.openToast(result.meta.message, 'danger')
        this._guardando = false;
      }

    });
  }

  //ir a detalle de cotizacion
  ListDetalleCotizacion() {
    this.router.navigate(['menu/list-detalle-cotizacion'], { state: {} });
  }

  save(event) {

  }

  //ir a listado general de cotizaciones
  goListDetalleCotizacion() {

    console.log(this.appGeneralQuotesGetDto);


    this.appGeneralQuotesQueryFilter = {
      pageSize: this.pageSize,
      pageNumber: this.page,
      usuarioConectado: this.usuario.user,
      cotizacion: "",
      searchText: ''  //this.searchText
    };

    this.cotizaService.GetAllGeneralCotizacion(this.appGeneralQuotesQueryFilter).subscribe(dat => {
      this.cotizaService.allCotizaciones$.next(dat.data);
      this.router.navigate(['/menu/cotizaciones-list']).then(() => { });
    })


    //  this.router.navigate(['/menu/cotizaciones-list']).then(() => {});
  }


  

}
