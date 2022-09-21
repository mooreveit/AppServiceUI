import { Component, OnInit } from '@angular/core';
import { AppProductsGetDto } from '../../../models/app-products-get-dto';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { RecipesService } from '../../../services/recipes.service';
import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { GeneralService } from '../../../services/general.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BuscadorProductosPage } from '../../Cotizaciones/cotizacion-detalle/buscador-productos/buscador-productos.page';
import { BuscadorProductosComponent } from '../../../components/buscador-productos/buscador-productos.component';
import { AppCopyRecipesDto } from '../../../models/app-copy-recipes-dto';

@Component({
  selector: 'app-copy-recetas',
  templateUrl: './copy-recetas.page.html',
  styleUrls: ['./copy-recetas.page.scss'],
})
export class CopyRecetasPage implements OnInit {
  product: AppProductsGetDto = new AppProductsGetDto();

  appCopyRecipesDto: AppCopyRecipesDto;

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private recipesService: RecipesService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private generalService: GeneralService,
    public toastController: ToastController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {


    this.buildForm();

    this.productoService.product$.subscribe(product => {

      this.product = product;

      this.form.get('idProductoOrigen').setValue(this.product.id);
      console.log(this.product.code)
      console.log(this.product.description1)
      console.log("objeto product recibido:")
      console.log(this.product);

    });


  }


  private buildForm() {


    this.form = this.formBuilder.group({
      idProductoOrigen: [0, [Validators.required, Validators.min(1)]],
      idProducto: [0, [Validators.required, Validators.min(1)]],
      producto: ['', [Validators.required]],

    });
  }


  //Buscador de productos OK
  async onBuscarProducto() {

    const modal = await this.modalCtrl.create({
      component: BuscadorProductosComponent,
      componentProps: {
        userConectado: this.generalService.GetUsuario().user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("objeto data:", data);
    console.log("objeto data id:", data.id);
    console.log("objeto data descripcion:", data.description);
    this.form.get('idProducto').setValue(data.id);
    this.form.get('producto').setValue(data.description);




  }


  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    if (this.form.valid) {

      if (this.form.get('idProductoOrigen').value == this.form.get('idProducto').value) {
        this.generalService.presentToast('Destino debe ser diferente a el origen', 'danger');
        return;
      }



      this.appCopyRecipesDto = {
        productIdSince: this.form.get('idProductoOrigen').value,
        productIdUntil: this.form.get('idProducto').value


      }

      console.log("OBJETO A ENVIAR PARA Copiar Receta:", this.appCopyRecipesDto)
      this.recipesService.CopyRecipes(this.appCopyRecipesDto).subscribe(result => {

        console.log("el mensaje de la api es:")
        console.log(result.meta.message)

        console.log("el objeto result:")
        console.log(result)

        console.log("el objeto result.data:")
        console.log(result.data)

        if (result.meta.isValid === true) {
          this.generalService.presentToast(result.meta.message, 'success')
          this.router.navigate(['menu/productos-list'], {})
        } else {
          this.generalService.presentToast(result.meta.message, 'danger')
        }

      });



    }




  }
}