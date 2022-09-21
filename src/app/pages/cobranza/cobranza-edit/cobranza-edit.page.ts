import { Component, OnInit } from '@angular/core';
import { CobGeneralCobranzaDto } from '../../../models/cob-general-cobranza-dto';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { ModalController, ToastController } from '@ionic/angular';
import { ClienteListPage } from '../../clientes/cliente-list/cliente-list.page';
import { SearchClientePage } from '../../clientes/search-cliente/search-cliente.page';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { CobTipoTransaccionService } from '../../../services/cob-tipo-transaccion.service';
import { CobTipoTransaccionDto } from '../../../models/cob-tipo-transaccion-dto';
import { CobTipoTransaccionQueryFilter } from '../../../interfaces/cob-tipo-transaccion-query-filter';
import { MtrBancosQueryFilter } from '../../../interfaces/mtr-bancos-query-filter';
import { MtrBancosService } from '../../../services/mtr-bancos.service';
import { MtrBancosDto } from '../../../models/mtr-bancos-dto';
import { MtrTipoMonedaDto } from '../../../models/mtr-tipo-moneda-dto';
import { MtrTipoMonedaService } from '../../../services/mtr-tipo-moneda.service';
import { MtrTipoMonedaQueryFilter } from '../../../interfaces/mtr-tipo-moneda-query-filter';
import { GeneralCobranzaQueryFilter } from '../../../interfaces/general-cobranza-query-filter';
import { GeneralCobranzaService } from '../../../services/general-cobranza.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import * as moment from 'moment';
import { MtrClienteQueryFilter } from '../../../interfaces/mtr-cliente-query-filter';
import { MtrContactosDto } from '../../../models/mtr-contactos-dto';
import { ClienteService } from '../../../services/cliente.service';
import { SearchContactosPage } from '../../clientes/search-contactos/search-contactos.page';

@Component({
  selector: 'app-cobranza-edit',
  templateUrl: './cobranza-edit.page.html',
  styleUrls: ['./cobranza-edit.page.scss'],
})
export class CobranzaEditPage implements OnInit {


  mtrClienteQueryFilter: MtrClienteQueryFilter;

  itemcobGeneralCobranzaDto = new CobGeneralCobranzaDto();
  listCobTipoTransaccionDto: CobTipoTransaccionDto[] = [];

  listMtrContactosDto: MtrContactosDto[] = [];

  cobTipoTransaccionQueryFilter: CobTipoTransaccionQueryFilter;
  usuario: IUsuario;
  titulo: string;

  //codigoClienteCtrl = new FormControl('', [Validators.required,Validators.maxLength(6),Validators.minLength(6)]);

  codigo: string = "";
  nombreCliente: string = "";


  tipoTransaccionSelected: CobTipoTransaccionDto;


  mtrBancosQueryFilter: MtrBancosQueryFilter;
  listMtrBancosDto: MtrBancosDto[] = [];
  listMtrBancosDtoAll: MtrBancosDto[] = [];

  form: FormGroup;
  listMtrTipoMonedasDto: MtrTipoMonedaDto[] = [];
  mtrTipoMonedaQueryFilter: MtrTipoMonedaQueryFilter;
  mtrTipoMonedasDtoSelected: MtrTipoMonedaDto;
  //descripcionMoneda = "";


  generalCobranzaQueryFilter: GeneralCobranzaQueryFilter;


  documento: number;
  parametroId: string;

  mensaje = "";

  basePath: string;
  accionPath: string;
  controller: string;
  show: boolean;
  fechaPago: string;
  defaultDate = "1987-06-30";
  constructor(public activateRoute: ActivatedRoute,
    public router: Router,
    public gs: GeneralService,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private cobTipoTransaccionService: CobTipoTransaccionService,
    private mtrBancosService: MtrBancosService,
    private MtrTipoMonedaService: MtrTipoMonedaService,
    private generalCobranzaService: GeneralCobranzaService,
    public toastController: ToastController,
    private http: HttpClient,
    private clienteService: ClienteService) {
    this.basePath = gs.basePath;
    this.buildForm();

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

  async ngOnInit() {
    this.usuario = this.gs.GetUsuario();
    this.titulo = "Editar Cobro"
    this.parametroId = 'id';
    this.documento = +this.activateRoute.snapshot.params[this.parametroId];
    console.log("Id Item Recibido", this.documento);


    this.itemcobGeneralCobranzaDto.documento = this.documento;


    if (this.documento == 1) {



      let fecha = moment().toISOString();
      this.fechaTransaccionField.setValue(fecha);
      this.fechaPago = fecha;



      console.log("si documento es uno fecha this.fechaTransaccionField.value", this.fechaTransaccionField.value);




      await this.CargarCombos();

    } else {
      await this.CargarCombos();
      this.refresh();
    }


  }
  ionViewDidEnter() {
    this.refresh();
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.form.get('fechaTransaccion').setValue(date, {
      onlyself: true
    })
  }
  private CargarCombos() {
    //Moneda

    this.listMtrTipoMonedasDto = JSON.parse(localStorage.getItem("listMoneda"));
    console.log('moneda recuperada local storage', this.listMtrTipoMonedasDto);
    if (!this.listMtrTipoMonedasDto) {

      this.mtrTipoMonedaQueryFilter = {
        id: 0,
        descripcion: ""
      };
      this.MtrTipoMonedaService.ListMonedas(this.mtrTipoMonedaQueryFilter).subscribe(respMoneda => {
        this.listMtrTipoMonedasDto = respMoneda.data;
        localStorage.setItem("listMoneda", JSON.stringify(this.listMtrTipoMonedasDto));
      });
    }


    //Tipo de Transaccion
    this.listCobTipoTransaccionDto = JSON.parse(localStorage.getItem("listCobTipoTransaccion"));
    if (!this.listCobTipoTransaccionDto) {
      this.cobTipoTransaccionQueryFilter = {
        searchText: "",
      };

      this.cobTipoTransaccionService.ListCobTipoTransaccion(this.cobTipoTransaccionQueryFilter).subscribe(respTipo => {
        this.listCobTipoTransaccionDto = respTipo.data;
        localStorage.setItem("listCobTipoTransaccion", JSON.stringify(this.listCobTipoTransaccionDto));
      });
    }

    //Banco


    this.listMtrBancosDtoAll = JSON.parse(localStorage.getItem("listMtrBanco"));

    this.listMtrBancosDto = this.listMtrBancosDtoAll;




    /*this.mtrBancosQueryFilter = {
      codigo: "",
      nombre: "",
      idTipoTransaccion: "",
    };
    this.GetListBancos(this.mtrBancosQueryFilter);*/

  }
  updateMyDate($event) {
    console.log($event); // --> wil contains $event.day.value, $event.month.value and $event.year.value
  }
  async refresh() {
    this.generalCobranzaQueryFilter = {
      UsuarioConectado: this.usuario.user,
      IdOficina: "",
      vendedor: "",
      documento: this.documento,
      PageSize: 0,
      PageNumber: 0,
    };
    await this.generalCobranzaService.GetAllGeneralCobranzasByDocumento(this.generalCobranzaQueryFilter).subscribe(resp => {

      localStorage.setItem("itemGeneralCobranza", JSON.stringify(resp.data));
      console.log("itemGeneralCobranza", resp.data);
      console.log("itemGeneralCobranza email", resp.data.emailCliente);
      this.emailField.setValue(resp.data.emailCliente);
      if (resp.data.documento > 1) {
        let fecha = moment(resp.data.fechaTransaccion).toISOString();
        this.fechaTransaccionField.setValue(fecha);
        console.log("fecha retornada sin aplicar moment", resp.data.fechaTransaccion);
        console.log("fecha retornada aplicando moment", fecha);

      }


      //Moneda
      this.mtrTipoMonedaQueryFilter = {
        id: 0,
        descripcion: ""
      };
      this.MtrTipoMonedaService.ListMonedas(this.mtrTipoMonedaQueryFilter).subscribe(respMoneda => {
        this.listMtrTipoMonedasDto = respMoneda.data;
        this.mtrTipoMonedasDtoSelected = this.listMtrTipoMonedasDto.find(i => i.id == resp.data.idMtrTipoMoneda);
        //this.descripcionMoneda = this.mtrTipoMonedasDtoSelected[0].descripcion;

      });

      //Tipo de Transaccion
      this.cobTipoTransaccionQueryFilter = {
        searchText: "",
      };

      this.cobTipoTransaccionService.ListCobTipoTransaccion(this.cobTipoTransaccionQueryFilter).subscribe(respTipo => {
        this.listCobTipoTransaccionDto = respTipo.data;
        this.tipoTransaccionSelected = this.listCobTipoTransaccionDto.find(i => i.idTipoTransaccion == resp.data.idTipoTransaccion);
      });


      this.codigoClienteField.setValue(resp.data.idCliente);
      this.montoTransaccionField.setValue(resp.data.montoTransaccion);

      this.idTipoTransaccionField.setValue(resp.data.idTipoTransaccion);
      this.nombreCliente = resp.data.nombreCliente;
      this.codigo = resp.data.idCliente;
      this.idBancoField.setValue(resp.data.idBanco);
      this.idMonedaField.setValue(resp.data.idMtrTipoMoneda)
      this.numReferenciaField.setValue(resp.data.numReferencia);

      this.emailField.setValue(resp.data.emailCliente);



      //Banco

      this.mtrBancosQueryFilter = {
        codigo: "",
        nombre: "",
        idTipoTransaccion: resp.data.idTipoTransaccion,
      };

      this.GetListBancos(this.mtrBancosQueryFilter);

    });



  }

  private buildForm() {
    this.form = this.formBuilder.group({
      codigoCliente: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      idMoneda: [0, [Validators.required]],
      montoTransaccion: [0, [Validators.required, Validators.min(1)]],
      idTipoTransaccion: ["", [Validators.required]],
      idBanco: ["", [Validators.required]],
      fechaTransaccion: [this.fechaPago, [Validators.required]],
      numReferencia: ["", [Validators.required]],

      email: ["", [Validators.required, Validators.email]],
    });


  }


  hablar = (texto) => speechSynthesis.speak(new SpeechSynthesisUtterance(texto));

  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    if (this.form.valid) {




      if (this.documento == 1) {
        this.itemcobGeneralCobranzaDto.documento = null;
      } else {
        this.itemcobGeneralCobranzaDto.documento = this.documento;
      }
      this.itemcobGeneralCobranzaDto.idCliente = this.codigoClienteField.value;
      this.itemcobGeneralCobranzaDto.idMtrTipoMoneda = this.idMonedaField.value;
      this.itemcobGeneralCobranzaDto.montoTransaccion = this.montoTransaccionField.value;
      this.itemcobGeneralCobranzaDto.idTipoTransaccion = this.idTipoTransaccionField.value;
      this.itemcobGeneralCobranzaDto.idBanco = this.idBancoField.value;
      this.itemcobGeneralCobranzaDto.fechaTransaccion = this.fechaTransaccionField.value;
      this.itemcobGeneralCobranzaDto.numReferencia = this.numReferenciaField.value;
      this.itemcobGeneralCobranzaDto.emailCliente = this.emailField.value;
      let date = new Date();
      this.itemcobGeneralCobranzaDto.fechaRegistro = date;
      this.itemcobGeneralCobranzaDto.usuarioRegistro = this.usuario.user;

      this.show = true;
      if (this.documento == 1) {
        this.generalCobranzaService.InsertGeneralCobranzas(this.itemcobGeneralCobranzaDto).subscribe(resp => {
          console.log(resp);
          this.show = false;
          if (!resp.meta.isValid) {
            this.openToast(resp.meta.message, 'danger');
            //this.hablar(resp.meta.message);

          } else {
            this.openToast("Recibo Guardado Satisfactoriamente", 'success');
            //this.hablar("Recibo Guardado Satisfactoriamente...Puede proceder a grabar la cobranza asociada a este recibo");
            this.documento = resp.data.documento;
            this.itemcobGeneralCobranzaDto = resp.data;
            localStorage.setItem("itemGeneralCobranza", JSON.stringify(this.itemcobGeneralCobranzaDto));

          }

        },
          error => {
            this.openToast(error, 'danger');
            this.show = false;

          });
      } else {
        console.log("Objeto a guardar", this.itemcobGeneralCobranzaDto)
        this.generalCobranzaService.UpdateGeneralCobranzas(this.itemcobGeneralCobranzaDto).subscribe(resp => {
          console.log(resp);
          this.show = false;
          if (!resp.meta.isValid) {

            this.openToast(resp.meta.message, 'danger');
            //this.hablar(resp.meta.message);
          } else {
            this.itemcobGeneralCobranzaDto = resp.data;
            this.documento = this.itemcobGeneralCobranzaDto.documento;
            localStorage.setItem("itemGeneralCobranza", JSON.stringify(this.itemcobGeneralCobranzaDto));
            this.openToast("Recibo Guardado Satisfactoriamente", 'success');
            //this.hablar("Recibo Guardado Satisfactoriamente...Puede proceder a grabar la cobranza asociada a este recibo");

          }

        },
          error => {
            this.openToast(error, 'danger');
            this.show = false;

          });
      }

    }

    //console.log(this.codigoClienteCtrl.value);
  }

  getCodigoCliente(event: Event) {
    event.preventDefault();
    //console.log(this.codigoClienteCtrl.value);
  }

  get codigoClienteField() {
    return this.form.get('codigoCliente')
  }

  get fechaTransaccionField() {
    return this.form.get('fechaTransaccion')
  }

  get montoTransaccionField() {
    return this.form.get('montoTransaccion')
  }
  get emailField() {
    return this.form.get('email')
  }
  get idTipoTransaccionField() {
    return this.form.get('idTipoTransaccion')
  }

  get idBancoField() {
    return this.form.get('idBanco')
  }
  get numReferenciaField() {
    return this.form.get('numReferencia')
  }
  get idMonedaField() {
    return this.form.get('idMoneda')
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
    console.log("datos retornados por el modal", data);
    this.codigo = data.clienteSeleccionado;
    this.nombreCliente = data.nombreCliente;
    //this.codigoClienteField().setvalue(this.codigo);
    this.codigoClienteField.setValue(this.codigo);

  }

  async onBuscarContacto() {

    const modal = await this.modalCtrl.create({
      component: SearchContactosPage,
      componentProps: {
        cliente: this.codigo
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal", data);

    this.emailField.setValue(data.emailSeleccionado);

  }




  onChangeEmail(event) {
    console.log("Contacto seleccionado", event.target.value);
  }

  async onChangeTipoTransaccion(event) {

    console.log("Tipo Transaccion Seleccionada", event.target.value);
    this.mtrBancosQueryFilter = {
      codigo: "",
      nombre: "",
      idTipoTransaccion: event.target.value,
    };

    this.GetListBancos(this.mtrBancosQueryFilter);
  }

  onChangeBanco(event) {
    console.log("Banco Seleccionado", event.target.value);
  }

  onChangeMoneda(event) {

    console.log("Moneda Seleccionado", event.target.value);

    // let moneda = +event.target.value;
    /* if (moneda <= 0) {
      moneda = 1;
    } */
    //console.log("Moneda Seleccionado cuando cambia la moneda", moneda);
    //this.mtrTipoMonedasDtoSelected = this.listMtrTipoMonedasDto.find(i => i.id == moneda);
    //this.descripcionMoneda = this.mtrTipoMonedasDtoSelected[0].descripcion;

  }

  GetListBancos(mtrBancosQueryFilter: MtrBancosQueryFilter) {

    console.log('Lista Completa de bancos*******', this.listMtrBancosDtoAll)
    this.listMtrBancosDto = this.listMtrBancosDtoAll.filter(x => x.idTipoTransaccion == mtrBancosQueryFilter.idTipoTransaccion);

    console.log('Variables Filtro*******', mtrBancosQueryFilter)
    console.log('Bancos Filtrados********', this.listMtrBancosDto);

    /*  this.mtrBancosService.ListBancos(mtrBancosQueryFilter).subscribe(resp => {
        this.listMtrBancosDto = resp.data;

      });*/

  }
  onClickExit() {
    this.gs.KillUsuario();
    this.router.navigate(['/login']);
  }

  onGotoGrabacionCobranza() {



    let navigationExtras: NavigationExtras = {
      state: {
        user: this.itemcobGeneralCobranzaDto
      }
    };
    // this.router.navigate(['menu/cobranza-edit'], navigationExtras);

    this.router.navigate(['menu/grabacion-cobranza-list/' + this.itemcobGeneralCobranzaDto.documento]);

  }



}
