import { Component, OnInit, Input } from '@angular/core';
import { CobPagoRetencionesDto } from '../../../models/cob-pago-retenciones-dto';
import { CobTransaccionesDto } from '../../../models/cob-transacciones-dto';
import { CobTransaccionesQueryFilter } from '../../../interfaces/cob-transacciones-query-filter';
import { GeneralService } from '../../../services/general.service';
import { CobTransaccionesService } from '../../../services/cob-transacciones.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { IUsuario } from '../../../interfaces/iusuario';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { MyValidations } from '../../../utils/my-validations';
import { CobPagosRetencionesService } from '../../../services/cob-pagos-retenciones.service';
@Component({
  selector: 'app-retenciones-edit',
  templateUrl: './retenciones-edit.page.html',
  styleUrls: ['./retenciones-edit.page.scss'],
})
export class RetencionesEditPage implements OnInit {

  listCobTransaccionesImpuestoDto: CobTransaccionesDto[] = [];

  listCobTransaccionesImpuestoDto1: CobTransaccionesDto[] = [];

  selectedcobTransaccionesImpuestoDto: CobTransaccionesDto;
  cobTransaccionesQueryFilter: CobTransaccionesQueryFilter;
  @Input() itemcobPagoRetencionesDto: CobPagoRetencionesDto;

  usuario: IUsuario;

  form: FormGroup;
  show: boolean;
  digitosvalidar: number;
  constructor(private gs: GeneralService,
    private cobTransaccionesService: CobTransaccionesService,
    private cobPagosRetencionesService: CobPagosRetencionesService,
    public modalCtrl: ModalController,
    public activateRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    public toastController: ToastController) {
    this.buildForm();

  }

  ngOnInit() {



    this.listCobTransaccionesImpuestoDto = JSON.parse(localStorage.getItem("listCobTransaccionesRetencion"));

    this.listCobTransaccionesImpuestoDto1 = JSON.parse(localStorage.getItem("listCobTransaccionesRetencion"));

    localStorage.setItem("digitoValidadorComprobanteRetencion", "");
    console.log("Tipo de Transaccion impuesto  cargado******", this.listCobTransaccionesImpuestoDto);
    this.setValue();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id: [0],
      idCobranza: [0, [Validators.required]],
      idTransaccion: [0, [Validators.required]],
      porcentaje: [0, [Validators.required, Validators.min(0.0001)]],
      nroComprobante: ["", [Validators.required, MyValidations.lenComprobanteRetencion]],
      fechaComprobante: ["", [Validators.required, Validators.min(1)]],
      monto: [0, [Validators.min(0)]],
    });

  }


  async getTransaccionById(id: number) {

    this.cobTransaccionesQueryFilter = {
      efectivo: false,
      idTransacccionCobranzas: id

    };

    await this.cobTransaccionesService.GetTransaccionesRetencionesById(this.cobTransaccionesQueryFilter).subscribe(resp => {
      this.selectedcobTransaccionesImpuestoDto = resp.data;
      localStorage.setItem("digitoValidadorComprobanteRetencion", JSON.stringify(this.selectedcobTransaccionesImpuestoDto.digitosValidar));
      this.digitosvalidar = this.selectedcobTransaccionesImpuestoDto.digitosValidar;
      console.log("-------", resp.data);
      console.log("digitos", this.digitosvalidar);
    });

  }

  setValue() {
    this.idField.setValue(this.itemcobPagoRetencionesDto.id);
    this.idCobranzaField.setValue(this.itemcobPagoRetencionesDto.idCobranza);
    this.idTransaccionField.setValue(this.itemcobPagoRetencionesDto.idTransaccion);
    this.porcentajeField.setValue(this.itemcobPagoRetencionesDto.porcentaje);
    this.nroComprobanteField.setValue(this.itemcobPagoRetencionesDto.nroComprobante);
    this.fechaComprobanteField.setValue(this.itemcobPagoRetencionesDto.fechaComprobante);
    this.montoField.setValue(this.itemcobPagoRetencionesDto.monto);

    this.listCobTransaccionesImpuestoDto = JSON.parse(localStorage.getItem("listCobTransaccionesRetencion"));
    this.getTransaccionById(this.itemcobPagoRetencionesDto.idTransaccion);


    //const found = this.listCobTransaccionesImpuestoDto.filter(x => x.idTransacccionCobranzas = this.itemcobPagoRetencionesDto.idTransaccion);
    //localStorage.setItem("digitoValidadorComprobanteRetencion", JSON.stringify(found[0].digitosValidar));
    //this.digitosvalidar = found[0].digitosValidar.toString();

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

    this.show = true;
    this.itemcobPagoRetencionesDto.id = this.idField.value;

    this.itemcobPagoRetencionesDto.idTransaccion = this.idTransaccionField.value;
    this.itemcobPagoRetencionesDto.porcentaje = this.porcentajeField.value;
    this.itemcobPagoRetencionesDto.fechaComprobante = this.fechaComprobanteField.value;
    this.itemcobPagoRetencionesDto.nroComprobante = this.nroComprobanteField.value;
    this.itemcobPagoRetencionesDto.monto = this.montoField.value;
    if (this.itemcobPagoRetencionesDto.id > 0) {
      this.cobPagosRetencionesService.update(this.itemcobPagoRetencionesDto)
        .subscribe(resp => {
          this.show = false;
          console.log(resp);
          this.modalCtrl.dismiss({ culmino: true });
        },
          error => {
            this.openToast(error, 'danger');
            this.show = false;

          });

    } else {

      this.cobPagosRetencionesService.insert(this.itemcobPagoRetencionesDto)
        .subscribe(resp => {

          this.show = false;
          if (!resp.meta.isValid) {

            this.openToast(resp.meta.message, 'danger');
          } else {


            console.log(resp);
            this.openToast("Retencion Guardado Satisfactoriamente", 'success');
            this.modalCtrl.dismiss({ culmino: true });


          }



        },
          error => {
            this.openToast(error, 'danger');
            this.show = false;

          });


    }






  }

  get idField() {
    return this.form.get('id')
  }
  get idCobranzaField() {
    return this.form.get('idCobranza')
  }
  get idTransaccionField() {
    return this.form.get('idTransaccion')
  }
  get porcentajeField() {
    return this.form.get('porcentaje')
  }
  get nroComprobanteField() {
    return this.form.get('nroComprobante')
  }
  get fechaComprobanteField() {
    return this.form.get('fechaComprobante')
  }
  get montoField() {
    return this.form.get('monto')
  }

  onChangeTransaccion(event) {

    console.log("Transaccion Seleccionada", event.target.value);

    this.selectedcobTransaccionesImpuestoDto = null;


    //this.listCobTransaccionesImpuestoDto = JSON.parse(localStorage.getItem("listCobTransaccionesRetencion"));

    this.getTransaccionById(+event.target.value);


    // const found = this.listCobTransaccionesImpuestoDto.filter(x => x.idTransacccionCobranzas = +event.target.value);
    // localStorage.setItem("digitoValidadorComprobanteRetencion", JSON.stringify(found[0].digitosValidar));
    // this.digitosvalidar = found[0].digitosValidar.toString();
  }
  Salir(event) {
    this.modalCtrl.dismiss();
  }
}
