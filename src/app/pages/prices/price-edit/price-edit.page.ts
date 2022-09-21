import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { AppPriceCreateDto, AppPriceGetDto, AppPriceUpdateDto } from '../../../models/app-price-dto';
import { AppProductsGetDto } from '../../../models/app-products-get-dto';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.page.html',
  styleUrls: ['./price-edit.page.scss'],
})
export class PriceEditPage implements OnInit {

  price: AppPriceGetDto;
  operacion: number;
  producto:AppProductsGetDto;
  public showLoading: boolean = false;
  titulo: string="";
  flagInsert:boolean=false;
  flagUpdate:boolean=false;
  form: FormGroup;
  appPriceUpdateDto: AppPriceUpdateDto;
  appPriceCreateDto: AppPriceCreateDto

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private productoService:ProductoService,
              private gs: GeneralService) { }

  ngOnInit() {
    this.buildForm();
    this.operacion = this.router.getCurrentNavigation().extras.state.flag;

    this.producto = this.router.getCurrentNavigation().extras.state.itemProducto;
    


    if(this.operacion==1){
      this.flagInsert=false;
      this.flagUpdate=true;
      this.titulo="Editar Precio";
      this.price = this.router.getCurrentNavigation().extras.state.itemPrice;
      this.form.get('id').setValue(this.price.id);
      this.form.get('appproductsId').setValue(this.producto.id);
      this.form.get('desde').setValue(this.price.desde);
      this.form.get('hasta').setValue(this.price.hasta);
      this.form.get('precio').setValue(this.price.precio);
    }else{
      this.form.get('appproductsId').setValue(this.producto.id);
      this.flagInsert=true;
      this.flagUpdate=false;
      this.titulo="Crear Precio";
    }
  
  }

  private buildForm() {

    //todo establecer precios unitarios a 0
    this.form = this.formBuilder.group({
      id: [0, []],
      appproductsId:[0, [Validators.required]],
      desde: [0, [Validators.required]],
      hasta: [0, [Validators.required]],
      precio: [0, [Validators.required]]

    });
  }

  insert(){
    this.appPriceCreateDto = {
      appproductsId:this.form.get('appproductsId').value,
      desde:this.form.get('desde').value,
      hasta:this.form.get('hasta').value,
      precio:this.form.get('precio').value
     
    }
    this.showLoading= true;
    
    this.productoService.CreateAppPrice(this.appPriceCreateDto).subscribe(result => {


      this.showLoading= false;
      if (result.meta.isValid === true) {

        this.gs.presentToast(result.meta.message, 'success');
        this.router.navigate(['menu/price-list'], {});


        
      } else {

        this.gs.presentToast(result.meta.message, 'danger');

      }

    });

  }

  Update(){

    this.appPriceUpdateDto = {
      id: this.form.get('id').value,
      appproductsId:this.form.get('appproductsId').value,
      desde:this.form.get('desde').value,
      hasta:this.form.get('hasta').value,
      precio:this.form.get('precio').value
     
    }

    this.showLoading= true;
    console.log("OBJETO A ENVIAR PARA actualizar Receta:", this.appPriceUpdateDto)
    this.productoService.UpdateAppPrice(this.appPriceUpdateDto).subscribe(result => {


      this.showLoading= false;
      if (result.meta.isValid === true) {

        this.gs.presentToast(result.meta.message, 'success');
        this.router.navigate(['menu/price-list'], {});


        
      } else {

        this.gs.presentToast(result.meta.message, 'danger');

      }

    });


  }

}
