import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ContactoCreateDto } from '../../../models/contacto-create-dto';
import { GenericFilter } from '../../../interfaces/generic-filter';
import { SapTratamientoContactoGetDto } from '../../../models/sap-tratamiento-contacto-get-dto';
import { SapCargoContactoGetDto } from '../../../models/sap-cargo-contacto-get-dto';
import { SapPoderContactoGetDto } from '../../../models/sap-poder-contacto-get-dto';
import { SapDepartamentoContactoGetDto } from '../../../models/sap-departamento-contacto-get-dto';
import { IUsuario } from '../../../interfaces/iusuario';
import { GeneralService } from '../../../services/general.service';
import { ClienteService } from '../../../services/cliente.service';
import { ModalController } from '@ionic/angular';
import { MtrContactosDto } from '../../../models/mtr-contactos-dto';
import { ContactoUpdateDto } from '../../../models/contacto-update-dto';
import { ContactoGetDto } from '../../../models/contacto-get-dto';
import { ContactoQueryFilter } from '../../../interfaces/contacto-query-filter';

@Component({
  selector: 'app-contactos-edit',
  templateUrl: './contactos-edit.page.html',
  styleUrls: ['./contactos-edit.page.scss'],
})
export class ContactosEditPage implements OnInit {
  public _guardando: boolean = false;
  contactoUpdateDto: ContactoUpdateDto;
  form: FormGroup;
  genericFilter: GenericFilter;
  contactoQueryFilter: ContactoQueryFilter;
  listTratamientoDto: SapTratamientoContactoGetDto[] = [];
  listSapCargoContacto: SapCargoContactoGetDto[] = [];
  listsapPoderContactoGetDto: SapPoderContactoGetDto[] = [];
  listSapDepartamentoContacto: SapDepartamentoContactoGetDto[] = [];
  contactoGetDto: ContactoGetDto;
  usuario: IUsuario;
  rifPattern: string;
  public cliente: string;
  @Input() itemContacto;
  constructor(public gs: GeneralService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController) { }

  ngOnInit() {


    this.buildForm();
    //this.cliente = this.itemContacto.idCliente;
    this.usuario = this.gs.GetUsuario();

    console.log("Item recibido", this.itemContacto.idContacto);
    //console.log("Cliente recibido", this.cliente);

    this.listTratamientoDto = JSON.parse(localStorage.getItem("listTratamientoDto"));
    this.listSapCargoContacto = JSON.parse(localStorage.getItem("listSapCargoContacto"));
    this.listSapDepartamentoContacto = JSON.parse(localStorage.getItem("listSapDepartamentoContacto"));
    this.listsapPoderContactoGetDto = JSON.parse(localStorage.getItem("listsapPoderContactoGetDto"));



    /*
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
      });*/


    this.contactoQueryFilter = {

      idContacto: this.itemContacto.idContacto

    }

    this.clienteService.GetContactoById(this.contactoQueryFilter).subscribe(respItemContacto => {


      this.contactoGetDto = respItemContacto.data;

      console.log("Contacto a editar: ", respItemContacto);
      console.log("Contacto a editar: ", this.contactoGetDto);
      this.showData();
    },
      error => {


        console.log("en el error list departamento: ", error);
      });



  }

  private buildForm() {

    this.rifPattern = "[JGVE][-][0-9]{8}[-][0-9]";

    //todo establecer precios unitarios a 0
    this.form = this.formBuilder.group({
      idContacto: [0, [Validators.required]],
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

  showData() {
    this.form.get('idContacto').setValue(this.contactoGetDto.idContacto);
    this.form.get('rif').setValue(this.contactoGetDto.rif);
    this.form.get('tratamiento').setValue(this.contactoGetDto.tratamiento);
    this.form.get('poder').setValue(this.contactoGetDto.poder);
    this.form.get('nombre').setValue(this.contactoGetDto.nombre);
    this.form.get('cargo').setValue(this.contactoGetDto.cargo);
    this.form.get('departamento').setValue(this.contactoGetDto.departamento);
    this.form.get('telefono').setValue(this.contactoGetDto.telefono);
    this.form.get('celular').setValue(this.contactoGetDto.celular);
    this.form.get('fax').setValue(this.contactoGetDto.fax);
    this.form.get('email').setValue(this.contactoGetDto.email);
    this.form.get('idCliente').setValue(this.contactoGetDto.idCliente);
    this.form.get('fechaNacimiento').setValue(this.contactoGetDto.fechaNacimiento);
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

  guardarContacto() {
    this._guardando = true;
    this.contactoUpdateDto = {

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
      idContacto: this.form.get('idContacto').value,
      idCliente: this.form.get('idCliente').value,
      idContactoSap: "",
      usuarioConectado: this.usuario.user


    };

    console.log("Objeto a enviar", this.contactoUpdateDto);
    this.clienteService.UpdateContactoAllTables(this.contactoUpdateDto).subscribe(resp => {
      console.log("Respuesta en creacion", resp);
      if (resp.meta.isValid) {
        this.limpia();
        this.gs.presentToast("Contacto Guardao", 'success')
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
