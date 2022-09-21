import { AppProductsGetDto } from './../../../models/app-products-get-dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { AppPriceQueryFilter } from 'src/app/interfaces/app-price-filter';
import { ProductoService } from '../../../services/producto.service';
import { AppPriceDeleteDto, AppPriceGetDto } from 'src/app/models/app-price-dto';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.page.html',
  styleUrls: ['./price-list.page.scss'],
})
export class PriceListPage implements OnInit {
  product: AppProductsGetDto = new AppProductsGetDto();


  appPriceQueryFilter:AppPriceQueryFilter
  itemAppPriceGetDto:AppPriceGetDto;
  appPriceDeleteDto:AppPriceDeleteDto;
  public listAppPriceGetDto:AppPriceGetDto[] = [];
  public showLoading: boolean = false;

  constructor(private router: Router,
              private generalService: GeneralService,
              private productService:ProductoService,
              public actionSheetController: ActionSheetController,
             ) { }

  ngOnInit() {

    this.product = this.router.getCurrentNavigation().extras.state.itemProducto;
    this.showLoading=true;
    this.appPriceQueryFilter = {
      appProductsId: this.product.id,
      
    }

    console.log('this.appPriceQueryFilter',this.appPriceQueryFilter)


  this.productService.GetAllPriceByProduct(this.appPriceQueryFilter).subscribe(result => {

    this.showLoading=false;

      console.log("el objeto result:")
      console.log(result)
      this.listAppPriceGetDto= result.data;
      this.showLoading = false;

  });

  }

  ionViewDidEnter(){

   
      this.showLoading=true;
      this.appPriceQueryFilter = {
        appProductsId: this.product.id,
        
      }
  
      console.log('this.appPriceQueryFilter',this.appPriceQueryFilter)
  
  
    this.productService.GetAllPriceByProduct(this.appPriceQueryFilter).subscribe(result => {
  
      this.showLoading=false;
  
        console.log("el objeto result:")
        console.log(result)
        this.listAppPriceGetDto= result.data;
        this.showLoading = false;
  
    });
  }
  refreshNew(){


    this.showLoading=true;
    this.appPriceQueryFilter = {
      appProductsId: this.product.id,
      
    }

    console.log('this.appPriceQueryFilter',this.appPriceQueryFilter)


  this.productService.GetAllPriceByProduct(this.appPriceQueryFilter).subscribe(result => {

    this.showLoading=false;

      console.log("el objeto result:")
      console.log(result)
      this.listAppPriceGetDto= result.data;
      this.showLoading = false;

  });

  }
  onClickAdd(){

   

       
        let itemProducto= this.product;
        this.router.navigate(['/menu/price-edit'], { state: { flag: 0, itemProducto } })


  }


  
  DeletePrice(item) {



    //confirm
    this.generalService.presentConfirm("Eliminar Item", "Confirme para proceder.", "Cancelar", "Aceptar").then(

        confirma => {

            if (confirma) {

                this.appPriceDeleteDto = {
                    id: item.id
                }

                this.productService.DeletePrice(this.appPriceDeleteDto)
                    .subscribe(resp => {

                        if (resp.meta.isValid) {
                            this.refreshNew();
                            this.generalService.presentToast(resp.meta.message, 'success');
                            
                        } else {

                            this.generalService.presentToast(resp.meta.message, 'danger');


                        }



                    });

            }

        }

    )
}


  UpdatePrice(item) {
    
      
       let itemPrice= item;
       let itemProducto= this.product;
       this.router.navigate(['/menu/price-edit'], { state: { flag: 1, itemPrice,itemProducto } })


  }

  async presentActionSheet(item) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Acción',
      cssClass: 'my-custom-class',

      buttons: [{
        text: 'Actualizar',
        role: 'destructive',
        icon: 'pencil-outline',
        handler: () => {
          this.UpdatePrice(item);
        }
      },
      {
        text: 'Eliminar',
        icon: 'trash',
        handler: () => {
          this.DeletePrice(item);
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

}
