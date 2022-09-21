import { Component, OnInit, Input } from '@angular/core';
import { GenericFilter } from '../../../interfaces/generic-filter';
import { GeneralService } from '../../../services/general.service';
import { ClienteService } from '../../../services/cliente.service';
import { SapTratamientoContactoGetDto } from '../../../models/sap-tratamiento-contacto-get-dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IUsuario } from '../../../interfaces/iusuario';
import { SapCargoContactoGetDto } from '../../../models/sap-cargo-contacto-get-dto';
import { SapDepartamentoContactoGetDto } from '../../../models/sap-departamento-contacto-get-dto';
import { SapPoderContactoGetDto } from '../../../models/sap-poder-contacto-get-dto';
import { ContactoCreateDto } from '../../../models/contacto-create-dto';
import { ModalController } from '@ionic/angular';
import { ClienteRif } from '../../../models/cliente-rif';

@Component({
  selector: 'app-contactos-create',
  templateUrl: './contactos-create.page.html',
  styleUrls: ['./contactos-create.page.scss'],
})
export class ContactosCreatePage implements OnInit {

  public _guardando: boolean = false;
  contactoCreateDto: ContactoCreateDto;
  form: FormGroup;
  genericFilter: GenericFilter;
  listTratamientoDto: SapTratamientoContactoGetDto[] = [];
  listSapCargoContacto: SapCargoContactoGetDto[] = [];
  listsapPoderContactoGetDto: SapPoderContactoGetDto[] = [];
  listSapDepartamentoContacto: SapDepartamentoContactoGetDto[] = [];
  usuario: IUsuario;
  rifPattern: string;
  rif: string;
  cliente: string;
  @Input() clienteRif: ClienteRif;
  constructor(public gs: GeneralService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cliente = this.clienteRif.cliente;
    this.rif = this.clienteRif.rif;

    this.usuario = this.gs.GetUsuario();
    this.buildForm();

    this.form.get('rif').setValue(this.rif);
    console.log("Cliente recibido", this.cliente);

    this.genericFilter = {

      pageNumber: 1,
      pageSize: 20,


    };
    console.log("Generic Filter a enviar", this.genericFilter)
    this.clienteService.GetAllSapTratamientoContacto(this.genericFilter).subscribe(respTratamiento => {


      this.listTratamientoDto = respTratamiento;

      console.log("list tratamiento: ", respTratamiento);
      console.log("list tratamiento: ", this.listTratamientoDto);
    },
      error => {


        console.log("en el error list tratamiento: ", error);
      });


    this.clienteService.ListGetAllSapCargoContacto(this.genericFilter).subscribe(respCargoContacto => {


      this.listSapCargoContacto = respCargoContacto;

      console.log("list cargo: ", respCargoContacto);
      console.log("list cargo: ", this.listSapCargoContacto);
    },
      error => {


        console.log("en el error list cargo: ", error);
      });

    this.clienteService.GetAllSapDepartamentoContacto(this.genericFilter).subscribe(respDepartamentoContacto => {


      this.listSapDepartamentoContacto = respDepartamentoContacto;

      console.log("list departamento: ", respDepartamentoContacto);
      console.log("list departamento: ", this.listSapDepartamentoContacto);
    },
      error => {


        console.log("en el error list departamento: ", error);
      });


    this.clienteService.ListGetAllSapPoderContacto(this.genericFilter).subscribe(respPoderContacto => {


      this.listsapPoderContactoGetDto = respPoderContacto;

      console.log("list departamento: ", respPoderContacto);
      console.log("list departamento: ", this.listsapPoderContactoGetDto);
    },
      error => {


        console.log("en el error list departamento: ", error);
      });



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
  private buildForm() {

    this.rifPattern = "[JGVE][-][0-9]{8}[-][0-9]";

    //todo establecer precios unitarios a 0
    this.form = this.formBuilder.group({
      rif: ['', [Validators.pattern(this.rifPattern)]],
      tratamiento: ['', [Validators.required]],
      poder: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', []],
      cargo: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      fax: ['', []],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', []],
      idCliente: [this.cliente, [Validators.required]],
    });



  }

  agregarContacto() {
    this._guardando = true;
    this.contactoCreateDto = {

      rif: this.form.get('rif').value,
      tratamiento: this.form.get('tratamiento').value,
      poder: this.form.get('poder').value,
      nombre: this.form.get('nombre').value,
      apellido: this.form.get('apellido').value,
      cargo: this.form.get('cargo').value,
      departamento: this.form.get('departamento').value,
      telefono: this.form.get('telefono').value,
      celular: this.form.get('cargo').value,
      fax: this.form.get('fax').value,
      email: this.form.get('email').value,
      fechaNacimiento: this.form.get('fechaNacimiento').value,
      idContacto: 0,
      idCliente: this.form.get('idCliente').value,
      idContactoSap: "",
      usuarioConectado: this.usuario.user


    };

    console.log("Objeto a enviar", this.contactoCreateDto);
    this.clienteService.CreateContactoAlTables(this.contactoCreateDto).subscribe(resp => {
      console.log("Respuesta en creacion", resp);
      if (resp.meta.isValid) {
        this.limpia();
        this.gs.presentToast("Contacto Creado", 'success')
        this._guardando = false;
        this.closeModal();
      } else {
        this._guardando = false;
        this.gs.presentToast(resp.meta.message, 'danger')

      }

    },
      error => {


        console.log("en el error de creacion: ", error);
        this._guardando = false;
      });

    this._guardando = false;

  }


  limpia() {

    this.form.get('rif').setValue("");
    this.form.get('tratamiento').setValue("");
    this.form.get('poder').setValue("");
    this.form.get('nombre').setValue("");
    this.form.get('apellido').setValue("");
    this.form.get('cargo').setValue("");
    this.form.get('departamento').setValue("");
    this.form.get('celular').setValue("");
    this.form.get('fax').setValue("");
    this.form.get('email').setValue("");
    this.form.get('fechaNacimiento').setValue("");
  }
  closeModal() {


    this.modalCtrl.dismiss({
      isValid: false
    });

  }


}
