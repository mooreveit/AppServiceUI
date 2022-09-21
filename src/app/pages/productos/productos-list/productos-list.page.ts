import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { AppProdutsQueryFilter } from 'src/app/interfaces/app-produts-query-filter';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { AppProductsDeleteDto } from 'src/app/models/app-products-delete-dto';
import { AppProductsGetDto } from 'src/app/models/app-products-get-dto';
import { GeneralService } from 'src/app/services/general.service';
import { ProductoService } from 'src/app/services/producto.service';
import { RecetasListPage } from 'src/app/pages/recetas/recetas-list/recetas-list.page';
@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.page.html',
  styleUrls: ['./productos-list.page.scss'],
})
export class ProductosListPage implements OnInit {

  appProdutsQueryFilter: AppProdutsQueryFilter;
  appProductsGetDto: AppProductsGetDto[] = [];
  appProductsDeleteDto: AppProductsDeleteDto = new AppProductsDeleteDto();

  usuario: IUsuario;
  tituloVentaEdicion: string;
  public showLoading: boolean = false;
  constructor(
    private productoService: ProductoService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private generalService: GeneralService,
    public toastController: ToastController,
    private router: Router
  ) {
    this.usuario = this.generalService.GetUsuario();
  }

  ngOnInit() {



    this.productoService.allProducts$.subscribe(allProducts => {
      this.appProductsGetDto = allProducts.data;
      console.log(this.appProductsGetDto);
    });

    this.appProdutsQueryFilter = {
      pageSize: 20,
      pageNumber: 1,
      id: 0,
      code: '',
      description1: '',
      description2: '',
      searchText: ''

    }

    this.refresh();
  }


  onClickAdd() {
    this.router.navigate(['/menu/productos-edit'], { state: { flag: 0 } })
  }

  onChangeSearchText(event) {

    this.appProdutsQueryFilter.searchText = event.target.value;
    this.refresh();

  }


  refresh() {
    this.showLoading = true;
    //this.productoService.GetAllAppProducts(this.appProdutsQueryFilter);
    

    this.productoService.GetAll(this.appProdutsQueryFilter).subscribe(result => {
      console.log('Al refrescar productos*********',result);
      this.appProductsGetDto=result.data;
      this.showLoading = false;
    });



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


  async presentActionSheet(producto) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Acción',
      cssClass: 'my-custom-class',

      buttons: [{
        text: 'Actualizar',
        role: 'destructive',
        icon: 'pencil-outline',
        handler: () => {
          this.UpdateProduct(producto);
        }
      },
      {
        text: 'Eliminar',
        icon: 'trash',
        handler: () => {
          this.DeleteProduct(producto);
        }
      },
      {
        text: 'Copiar',
        icon: 'albums',
        handler: () => {
          this.CopiarProduct(producto);
        }
      },
      {
        text: 'Recetas',
        icon: 'receipt-outline',
        handler: () => {
          this.RecetaProducto(producto);
        }
      },
      {
        text: 'Precios',
        icon: 'cash',
        handler: () => {
          this.PreciosProducto(producto);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  //Receta del producto
  RecetaProducto(producto) {

    this.productoService.product$.next(producto)
    let itemProducto = producto;
    this.router.navigate(['/menu/recetas-list'], { state: { flag: 1, itemProducto } })

  }

  PreciosProducto(producto){
    this.productoService.product$.next(producto)
    let itemProducto = producto;
    this.router.navigate(['/menu/price-list'], { state: { flag: 1, itemProducto } })
  }

  //Copiar Receta del producto
  CopiarRecetaProducto(producto) {

    this.productoService.product$.next(producto)

    this.router.navigate(['/menu/copy-recetas'], { state: { flag: 1 } })

  }
  // Metodo para actualizar un producto

  UpdateProduct(producto) {

    this.productoService.product$.next(producto)

    this.router.navigate(['/menu/productos-edit'], { state: { flag: 1 } })

  }


  //Metodo para Copiar Producto
  async CopiarProduct(Producto) {

    this.appProductsDeleteDto.id = Producto.id;

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: 'Esta seguro de copiar esté Producto?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
           
            this.productoService.CopyProduct(this.appProductsDeleteDto).subscribe(result => {
              
              if (result.meta.isValid === true) {
                this.appProductsGetDto=result.data;
                //this.refresh();
                this.openToast(result.meta.message, 'success');
                /* setTimeout(() => {
                  this.productoService.GetAllAppProducts(this.appProdutsQueryFilter)
                  
                }, 500); */
              } else {
                this.openToast(result.meta.message, 'danger');
              }
            })

          }
        }
      ]
    });

    await alert.present();
  }


  // Metodo para Eliminar un producto
  

  async DeleteProduct(Producto) {

    this.appProductsDeleteDto.id = Producto.id;

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: 'Esta seguro de eliminar esté Producto?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.showLoading=true;
            this.productoService.DeleteProduct(this.appProductsDeleteDto).subscribe(result => {
              this.showLoading=false;
              
              if (result.meta.isValid === true) {
                this.openToast(result.meta.message, 'success');
                this.refresh();
                /* setTimeout(() => {
                  this.productoService.GetAllAppProducts(this.appProdutsQueryFilter)
                }, 500); */
              } else {
                this.openToast(result.meta.message, 'danger');
              }
            })

          }
        }
      ]
    });

    await alert.present();
  }


}
