import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { AppProductsGetDto } from 'src/app/models/app-products-get-dto';
import { ProductoService } from 'src/app/services/producto.service';
import { RecipesService } from '../../../services/recipes.service';
import { AppRecipesGetDto } from '../../../models/app-recipes-get-dto';
import { AppRecipesQueryFilter } from '../../../interfaces/app-recipes-query-filter';
import { GeneralService } from '../../../services/general.service';
import { AppRecipesDeleteDto } from '../../../models/app-recipes-delete-dto';

@Component({
    selector: 'app-recetas-list',
    templateUrl: './recetas-list.page.html',
    styleUrls: ['./recetas-list.page.scss'],
})
export class RecetasListPage implements OnInit {

    product: AppProductsGetDto = new AppProductsGetDto();
    public checkError:boolean=false;
    appRecipesQueryFilter: AppRecipesQueryFilter;
    appRecipesGetDto: AppRecipesGetDto[] = [];
    appRecipesGetDtoOriginal: AppRecipesGetDto[] = [];
    itemAppRecipesGetDto: AppRecipesGetDto;
    botones = [];
    appRecipesDeleteDto: AppRecipesDeleteDto;
    public showLoading: boolean = false;
    constructor(private router: Router,
        private productoService: ProductoService,
        private recipesService: RecipesService,
        public actionSheetController: ActionSheetController,
        public alertController: AlertController,
        private generalService: GeneralService,
        public toastController: ToastController) { }

    ngOnInit() {

        this.showLoading = true;
        this.product = this.router.getCurrentNavigation().extras.state.itemProducto;

        console.log("Producto Recibido:", this.product);

        this.appRecipesQueryFilter = {
            appproductsId: this.product.id,
            searchText: ""
        }



        this.recipesService.GetAllRecipesNew(this.appRecipesQueryFilter).subscribe(result => {



            console.log("el objeto result:")
            console.log(result)
            this.appRecipesGetDto = result;
            this.appRecipesGetDtoOriginal = result;
            this.showLoading = false;

        });


        /* this.productoService.product$.subscribe(product => {

            this.product = product;



            this.appRecipesQueryFilter = {
                appproductsId: this.product.id,
                searchText: ""
            }


            this.showLoading = true;
            this.recipesService.GetAllRecipesNew(this.appRecipesQueryFilter).subscribe(result => {



                console.log("el objeto result:")
                console.log(result)
                this.appRecipesGetDto = result;
                this.showLoading = false;

            });

        }); */

    }

    refreshNew() {
        this.showLoading = true;
        this.recipesService.GetAllRecipesNew(this.appRecipesQueryFilter).subscribe(result => {



            console.log("el objeto result:")
            console.log(result)
            this.appRecipesGetDtoOriginal = result;
            this.appRecipesGetDto = result;
            this.showLoading = false;

        });


    }

    /* refresh() {
        this.showLoading = true;
        this.recipesService.GetAllRecipes(this.appRecipesQueryFilter);
        this.showLoading = false;
    } */

    onChangeSearchText(event) {


        this.appRecipesQueryFilter = {
            appproductsId: this.product.id,
            searchText: event.target.value
        }
        this.refreshNew();

    }

    onChangeErrores(event){
        
        
        if(this.checkError){
            
            this.appRecipesGetDto = this.appRecipesGetDtoOriginal.filter(x=> x.mensajeValidacionFormula!= '')
           
        }else{
           
            this.appRecipesGetDto =this.appRecipesGetDtoOriginal;
        }
    }


    // actualizar Ingrediente
    actualizarReceta(receta: AppRecipesGetDto) {
        let itemProducto = this.product;
        this.router.navigate(['/menu/recetas-edit'], { state: { flag: true, receta, itemProducto } })
    }


    onClickAdd() {
        let itemProducto = this.product;
        this.router.navigate(['/menu/recetas-edit'], { state: { flag: false, itemProducto } })

    }

    public async presentActionSheet(item) {

        this.itemAppRecipesGetDto = item;

        this.botones = [
            {
                text: ' Actualizar',
                icon: 'create-outline',
                handler: () => {
                    this.actualizarReceta(item);
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

                    this.appRecipesDeleteDto = {
                        id: item.id
                    }

                    this.recipesService.Delete(this.appRecipesDeleteDto)
                        .subscribe(resp => {

                            if (resp.meta.isValid) {
                                this.refreshNew();
                                this.openToast(resp.meta.message, 'success');

                            } else {

                                this.openToast(resp.meta.message, 'danger');


                            }



                        });

                }

            }

        )
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
