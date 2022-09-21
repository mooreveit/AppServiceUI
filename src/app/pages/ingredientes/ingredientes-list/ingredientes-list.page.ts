import { Component, OnInit } from '@angular/core';
import { AppIngredientsGetDto } from '../../../models/app-ingredients-get-dto';
import { AppIngredientsQueryFilter } from '../../../interfaces/app-ingredients-query-filter';
import { IUsuario } from '../../../interfaces/iusuario';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { IngredientesService } from '../../../services/ingredientes.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppIngredientsDeleteDto } from '../../../models/app-ingredients-delete-dto';

@Component({
  selector: 'app-ingredientes-list',
  templateUrl: './ingredientes-list.page.html',
  styleUrls: ['./ingredientes-list.page.scss'],
})
export class IngredientesListPage implements OnInit {


  itemAppIngredientsGetDto: AppIngredientsGetDto;


  appIngredientsQueryFilter: AppIngredientsQueryFilter;
  appIngredientsGetDto: AppIngredientsGetDto[] = [];
  appIngredientsDeleteDto: AppIngredientsDeleteDto;

  usuario: IUsuario;
  tituloVentaEdicion: string;
  botones = [];

  constructor(
    private router: Router,
    private ingredientesService: IngredientesService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private generalService: GeneralService,
    public toastController: ToastController) {

    this.usuario = this.generalService.GetUsuario();
  }

  ngOnInit() {

    this.ingredientesService.allIngredients$.subscribe(resp => {
      this.appIngredientsGetDto = resp.data;
      console.log(resp.data);
    });

    this.appIngredientsQueryFilter = {
      id: 0,
      pageSize: 100,
      pageNumber: 1,
      code: '',
      description: '',
      searchText: ''
    }
    this.ingredientesService.GetAllAppIngredients(this.appIngredientsQueryFilter);

  }

  // Añadir o Agregar Ingrediente
  onClickAdd() {
    this.router.navigate(['/menu//ingredientes-edit'], { state: { operacion: 0 } });
  }

  public async presentActionSheet(item) {

    this.itemAppIngredientsGetDto = item;

    this.botones = [
      {
        text: ' Actualizar',
        icon: 'create-outline',
        handler: () => {
          this.actualizarIngrediente(item);
        }
      },


      {
        text: ' Eliminar',
        icon: 'trash',
        handler: () => {
          this.eliminar(item);
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



  eliminar(item) {

    //El parametro 'item' contiene toda la informacion del item a eliminar,



    //confirm
    this.generalService.presentConfirm("Eliminar Item", "Confirme para proceder.", "Cancelar", "Aceptar").then(

      confirma => {

        if (confirma) {

          this.appIngredientsDeleteDto = {
            id: item.id
          }
          this.ingredientesService.Delete(this.appIngredientsDeleteDto)
            .subscribe(resp => {

              if (resp.meta.isValid) {
                this.refresh();
                this.openToast(resp.meta.message, 'success');

              } else {

                this.openToast(resp.meta.message, 'danger');


              }



            });

        }

      }

    )
  }

  // actualizar Ingrediente
  actualizarIngrediente(ingrediente: AppIngredientsGetDto) {

    this.router.navigate(['/menu/ingredientes-edit'], { state: { flag: true, ingrediente } })
  }

  refresh() {
    this.ingredientesService.GetAllAppIngredients(this.appIngredientsQueryFilter);
  }

  onChangeSearchText(event) {

    this.appIngredientsQueryFilter.searchText = event.target.value;
    this.refresh();
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

}
