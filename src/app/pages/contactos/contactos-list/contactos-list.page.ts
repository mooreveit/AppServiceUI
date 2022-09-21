import { Component, OnInit, Input } from '@angular/core';
import { MtrClienteQueryFilter } from '../../../interfaces/mtr-cliente-query-filter';
import { MtrContactosDto } from '../../../models/mtr-contactos-dto';
import { IUsuario } from '../../../interfaces/iusuario';
import { GeneralService } from '../../../services/general.service';
import { ClienteService } from '../../../services/cliente.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContactosCreatePage } from '../contactos-create/contactos-create.page';
import { ContactosEditPage } from '../contactos-edit/contactos-edit.page';
import { ClienteRif } from '../../../models/cliente-rif';

@Component({
  selector: 'app-contactos-list',
  templateUrl: './contactos-list.page.html',
  styleUrls: ['./contactos-list.page.scss'],
})
export class ContactosListPage implements OnInit {

  botones = [];
  mtrClienteQueryFilter: MtrClienteQueryFilter;
  listMtrContactosDto: MtrContactosDto[] = [];
  codigoSeleccionado = "";
  searchText = "";
  show: boolean;
  usuario: IUsuario;
  cliente: string;
  rif: string;
  @Input() clienteRif: ClienteRif;
  constructor(
    public gs: GeneralService,
    private clienteService: ClienteService,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cliente = this.clienteRif.cliente;
    this.rif = this.clienteRif.rif;
    this.usuario = this.gs.GetUsuario();
    console.log("Cliente Rif recibido", this.clienteRif);
    this.refresh();
  }

  refresh() {

    this.mtrClienteQueryFilter = {
      usuario: this.usuario.user,
      PageNumber: 0,
      PageSize: 0,
      codigo: this.cliente,
      rif: this.rif,
      searchText: this.searchText

    };

    this.clienteService.ListContactosCliente(this.mtrClienteQueryFilter).subscribe(respContacto => {


      this.listMtrContactosDto = respContacto.data;

      console.log("list contactos: ", respContacto);

    },
      error => {

        this.show = false;
        console.log("en el error list contactos: ", error);
      });
  }
  onChangeSearchCliente(event) {
    console.log(event.target.value);
    this.searchText = event.target.value;
    this.refresh();
  }

  SelectClient(item) {

    this.codigoSeleccionado = item.email;
    let idContacto = item.idContacto;

    this.modalCtrl.dismiss({
      emailSeleccionado: this.codigoSeleccionado,
      idContacto: idContacto,
      nombreContacto: item.nombre
    });
  }

  async crearContacto() {

    let idCliente;



    const modal = await this.modalCtrl.create({
      component: ContactosCreatePage,
      componentProps: {
        clienteRif: this.clienteRif
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
    this.refresh();


  }


  async editarContacto(item) {

    let idCliente;

    console.log("Item a enviar", item);

    const modal = await this.modalCtrl.create({
      component: ContactosEditPage,
      componentProps: {
        itemContacto: item
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
    this.refresh();

  }


  public async presentActionSheet(item) {



    this.botones = [
      {
        text: ' Seleccionar',
        icon: 'checkbox-outline"',
        handler: () => {
          this.SelectClient(item);
        }
      },
      {
        text: ' Crear',
        icon: 'create-outline',
        handler: () => {
          this.crearContacto();
        }
      },

      {
        text: ' Editar',
        icon: 'clipboard-outline',
        handler: () => {
          this.editarContacto(item);
        }
      },

      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]



    let actionSheet = this.actionSheetController.create({
      header: 'Acciones',
      buttons: this.botones
    });

    (await actionSheet).present()


  }

  closeModal() {


    this.modalCtrl.dismiss({
      isValid: false
    });

  }

}
