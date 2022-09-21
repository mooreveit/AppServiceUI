import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { CobGrabacionCobranzaDto } from '../../../models/cob-grabacion-cobranza-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { CobTransaccionesDto } from 'src/app/models/cob-transacciones-dto';
import { CobTransaccionesQueryFilter } from '../../../interfaces/cob-transacciones-query-filter';
import { CobTransaccionesService } from '../../../services/cob-transacciones.service';
import { GeneralCobranzaQueryFilter } from '../../../interfaces/general-cobranza-query-filter';
import { IUsuario } from '../../../interfaces/iusuario';
import { GeneralCobranzaService } from '../../../services/general-cobranza.service';
import { CobEstadoCuentaService } from '../../../services/cob-estado-cuenta.service';
import { CobEstadoCuentaQueryFilter } from '../../../interfaces/cob-estado-cuenta-query-filter';
import { CobEstadoCuentaDto } from '../../../models/cob-estado-cuenta-dto';
import { CobGrabacionCobranzasService } from '../../../services/cob-grabacion-cobranzas.service';
import { MyValidations } from '../../../utils/my-validations';
import { SearchEstadoCuentaPage } from '../../EstadoCuenta/search-estado-cuenta/search-estado-cuenta.page';
import { CobGeneralCobranzaDto } from 'src/app/models/cob-general-cobranza-dto';


@Component({
  selector: 'app-grabacion-cobranza-edit',
  templateUrl: './grabacion-cobranza-edit.page.html',
  styleUrls: ['./grabacion-cobranza-edit.page.scss'],
})
export class GrabacionCobranzaEditPage implements OnInit {

  @Input() detalleGrabacionCobranza: CobGrabacionCobranzaDto;



  form: FormGroup;

  cobTransaccionesQueryFilter: CobTransaccionesQueryFilter;
  generalCobranzaQueryFilter: GeneralCobranzaQueryFilter;
  cobEstadoCuentaQueryFilter: CobEstadoCuentaQueryFilter;
  listCobTransaccionesDto: CobTransaccionesDto[] = [];
  cobEstadoCuentaDto: CobEstadoCuentaDto[] = [];
  cobEstadoCuentaDtoAll: CobEstadoCuentaDto[] = [];
  cobGrabacionCobranzaDto = new CobGrabacionCobranzaDto();
  itemCobEstadoCuentaDto = new CobEstadoCuentaDto();
  itemCobGeneralCobranza = new CobGeneralCobranzaDto();
  usuario: IUsuario;
  tipoTransaccion: string = "";


  montoOriginal: number;
  iva: number;
  montoOriginalString: number;
  ivaString: number;
  show: boolean;
  showLoading: boolean = false;
  constructor(public modalCtrl: ModalController,
    public gs: GeneralService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    public cobTransaccionesService: CobTransaccionesService,
    public generalCobranzaService: GeneralCobranzaService,
    public cobEstadoCuentaService: CobEstadoCuentaService,
    public cobGrabacionCobranzasService: CobGrabacionCobranzasService,
    public toastController: ToastController) {

    this.buildForm();

  }



  /*
      id:number;
      documento:number;
      transaccion:string;
      docAfecta:number;
      monto:number
      cotizacion:string;
  */

  ngOnInit() {

    this.usuario = this.gs.GetUsuario();



    //Estado de Cuenta

    this.cobEstadoCuentaDtoAll = JSON.parse(localStorage.getItem("estadoCuenta"));
    this.cobEstadoCuentaDto = JSON.parse(localStorage.getItem("estadoCuenta"));
    this.itemCobGeneralCobranza = JSON.parse(localStorage.getItem("itemGeneralCobranza"));


    console.log('General Cobranza*****', this.itemCobGeneralCobranza)
    console.log('Detalle Recibido*****', this.detalleGrabacionCobranza)

    console.log('Estado Cuenta*******:', this.cobEstadoCuentaDtoAll);

    this.docAfectaField.setValue(this.detalleGrabacionCobranza.docAfecta);

    //Cob Transaccion
    this.listCobTransaccionesDto = JSON.parse(localStorage.getItem("listCobTransacciones"));
    console.log(' this.listCobTransaccionesDto*******:', this.listCobTransaccionesDto);

    if (!this.listCobTransaccionesDto) {
      this.cobTransaccionesQueryFilter = {
        efectivo: true,
        idTransacccionCobranzas: 0

      };

      this.cobTransaccionesService.listCobTransaccionesEfectivo(this.cobTransaccionesQueryFilter).subscribe(resp => {
        this.listCobTransaccionesDto = resp.data;
        localStorage.setItem("listCobTransacciones", JSON.stringify(this.listCobTransaccionesDto));
        if (this.itemCobGeneralCobranza.idTipoTransaccion == "RET") {
          this.listCobTransaccionesDto = this.listCobTransaccionesDto.filter(x => x.transaccion == "RE");
        }

      });
    } else {
      if (this.itemCobGeneralCobranza.idTipoTransaccion == "RET") {
        this.listCobTransaccionesDto = this.listCobTransaccionesDto.filter(x => x.transaccion == "RE");
      }
    }


    this.setValue();


  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [0],
      documento: [0, [Validators.required]],
      transaccion: ['', [Validators.required]],
      docAfecta: [0, MyValidations.docAfectaIsInvalid],
      monto: [0, [Validators.required, Validators.min(1)]],
      cotizacion: ["", MyValidations.lenCotizacionIsInvalid, MyValidations.validateCotizacion(this.cobGrabacionCobranzasService)]
    });

  }

  setValue() {
    this.idField.setValue(this.detalleGrabacionCobranza.id);
    this.documentoField.setValue(this.detalleGrabacionCobranza.documento);
    this.transaccionField.setValue(this.detalleGrabacionCobranza.transaccion);
    this.tipoTransaccion = this.detalleGrabacionCobranza.transaccion;
    this.docAfectaField.setValue(this.detalleGrabacionCobranza.docAfecta);
    this.montoField.setValue(this.detalleGrabacionCobranza.monto);
    this.cotizacionField.setValue(this.detalleGrabacionCobranza.cotizacion);
    this.cobEstadoCuentaDtoAll = JSON.parse(localStorage.getItem("estadoCuenta"));
    this.itemCobEstadoCuentaDto == null;
    //console.log("Id buscar estadocuenta",this.detalleGrabacionCobranza.docAfecta);
    //this.itemCobEstadoCuentaDto=this.cobEstadoCuentaDtoAll.find(x=> x.id=this.detalleGrabacionCobranza.docAfecta);
    this.itemCobEstadoCuentaDto = this.detalleGrabacionCobranza.cobEstadoCuentaDto;
    console.log("item estado cuenta selecionado----++++++++>>>>>>", this.detalleGrabacionCobranza.cobEstadoCuentaDto);
    console.log("item estado cuenta selecionado----++++++++>>>>>>", this.itemCobEstadoCuentaDto);
    //this.cobEstadoCuentaDto.push(this.itemCobEstadoCuentaDto);
    console.log("Estado cuenta selecionado----++++++++", this.cobEstadoCuentaDto);
    localStorage.setItem("tipoTransaccion", this.tipoTransaccion);
  }

  get idField() {
    return this.form.get('id')
  }
  get documentoField() {
    return this.form.get('documento')
  }
  get transaccionField() {
    return this.form.get('transaccion')
  }
  get docAfectaField() {
    return this.form.get('docAfecta')
  }
  get montoField() {
    return this.form.get('monto')
  }
  get cotizacionField() {
    return this.form.get('cotizacion')
  }

  Salir(event) {
    this.modalCtrl.dismiss();
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
  save(event) {


    console.log("Transaccion", this.transaccionField.value);
    console.log("Transaccion", this.montoField.value);

    console.log("Estado de Cuenta para Validar", this.itemCobEstadoCuentaDto);
    if (this.transaccionField.value == "RC" && this.montoField.value > this.itemCobEstadoCuentaDto.saldo) {

      this.openToast("Monto superior a el saldo del documento", 'danger');
      this.show = false;
      return;
    }

    this.cobGrabacionCobranzaDto.id = this.idField.value;
    this.cobGrabacionCobranzaDto.documento = this.documentoField.value;
    this.cobGrabacionCobranzaDto.transaccion = this.transaccionField.value;
    this.cobGrabacionCobranzaDto.docAfecta = this.docAfectaField.value;
    this.cobGrabacionCobranzaDto.monto = this.montoField.value;
    this.cobGrabacionCobranzaDto.cotizacion = this.cotizacionField.value;
    this.show = true;
    this.showLoading = true;
    if (this.cobGrabacionCobranzaDto.id > 0) {
      this.cobGrabacionCobranzasService.update(this.cobGrabacionCobranzaDto)
        .subscribe(resp => {

          this.show = false;
          console.log("Al Grabar bobranza:>>>>>>", resp);

          if (!resp.meta.isValid) {
            this.openToast(resp.meta.message, 'danger');
            this.showLoading = false;

          } else {
            this.showLoading = false;
            this.modalCtrl.dismiss({ culmino: true });
          }






        },
          error => {
            this.showLoading = false;
            this.openToast(error, 'danger');
            this.show = false;

          });

    } else {

      this.cobGrabacionCobranzasService.insert(this.cobGrabacionCobranzaDto)
        .subscribe(resp => {
          this.show = false;
          console.log("Al Grabar bobranza:>>>>>>", resp);

          if (!resp.meta.isValid) {
            this.openToast(resp.meta.message, 'danger');


          } else {
            this.modalCtrl.dismiss({ culmino: true });
          }

        }
          ,
          error => {
            this.openToast(error, 'danger');
            this.show = false;

          });


    }






  }

  onChangeTransaccion(event) {
    console.log("Transaccion Seleccionada", event.target.value);
    this.tipoTransaccion = event.target.value;
    localStorage.setItem("tipoTransaccion", this.tipoTransaccion);

  }

  onChangeTransaccionAfecta(event) {
    console.log("Transaccion Afecta", event.target.value);
    console.log("Documento Afecta *****", this.docAfectaField.value);

    let documentoAfecta = +event.target.value;
    let docafetaSeleccionado = this.cobEstadoCuentaDtoAll.find(x => x.id = documentoAfecta);
    console.log(documentoAfecta);
    console.log(docafetaSeleccionado);
    console.log(this.itemCobEstadoCuentaDto);
    console.log(this.docAfectaField.value);
    console.log(this.cobEstadoCuentaDtoAll);

  }
  async onBuscarDocumento() {

    const modal = await this.modalCtrl.create({
      component: SearchEstadoCuentaPage,
      componentProps: {
        cliente: localStorage.getItem("idCliente")
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("datos retornados por el modal", data);
    this.itemCobEstadoCuentaDto = data.documentoSeleccionadoObj;
    this.docAfectaField.setValue(data.documentoSeleccionado);


  }

}
