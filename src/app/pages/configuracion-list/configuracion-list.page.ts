import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { AppConfigAppQueryFilter } from 'src/app/interfaces/appConfigAppQueryFilter';
import { AppConfigCreateDto } from 'src/app/models/app-config-create-dto';
import { AppConfigDeleteDto } from 'src/app/models/app-config-delete-dto';
import { AppConfigGetDto } from 'src/app/models/app-config-get-dto';
import { AppConfigUpdateDto } from 'src/app/models/app-config-update-dto';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion-list',
  templateUrl: './configuracion-list.page.html',
  styleUrls: ['./configuracion-list.page.scss'],
})
export class ConfiguracionListPage implements OnInit {

  appConfigGetDto          : AppConfigGetDto[] = [];
  appConfigAppQueryFilter  : AppConfigAppQueryFilter;
  tituloVentaEdicion : string;
  appConfigCreateDto : AppConfigCreateDto = new AppConfigCreateDto();
  appConfigUpdateDto : AppConfigUpdateDto = new AppConfigUpdateDto();
  appConfigDeleteDto : AppConfigDeleteDto = new AppConfigDeleteDto();

  constructor(
        private configuracionService : ConfiguracionService,
        public actionSheetController: ActionSheetController,
        public alertController: AlertController,
        public toastController: ToastController,
             ) { }

  ngOnInit() {

    this.configuracionService.allConfig$.subscribe(result => {
      console.log(result);
      this.appConfigGetDto = result
    });

    this.appConfigAppQueryFilter = {
        PageSize   : 10,
        PageNumber : 1,
        Id         : 0,
        Clave      : "",
        Valor      : "",	
        SearchText : ""
    }

    this.configuracionService.GetAllAppConfig(this.appConfigAppQueryFilter);

  }

  refresh(){
    this.configuracionService.GetAllAppConfig(this.appConfigAppQueryFilter);
  }

  onChangeSearchText(event) {
 
    this.appConfigAppQueryFilter.SearchText = event.target.value; 
    this.refresh();
  }

  onClickAdd(){
    this.CreateEditConfiguracion(0,'');
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

  /* Controles de la UI */

  /* Menu de acciones sobre cada variable de la lista */ 
  async presentActionSheet(item) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Acción',
      cssClass: 'my-custom-class',
      
      buttons: [{
        text: 'Actualizar',
        role: 'destructive',
        icon: 'pencil-outline',
        handler: () => {
         this.CreateEditConfiguracion(1,item);
        }
      }, 
      {
        text: 'Eliminar',
        icon: 'trash',
        handler: () => {
          this.DeleteItem(item)
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


    /* ventana emergente para Insertar o Actualizar nueva variable  */  
    async CreateEditConfiguracion(flag : number, item : any){

      // flag 0 Nueva variable , flag 1 Actualizar o editar variable
  
      if(flag === 0){
       
      this.tituloVentaEdicion = 'Crear nuevo registro'; 
                
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header:  this.tituloVentaEdicion,
        inputs: [
          {
            name: 'clave',
            type: 'text',
            label: 'clave',
            placeholder: 'clave',
            attributes: {
              minlength: 4,
              maxlength: 100,
              inputmode: 'text'
            }
          },
          {
            name: 'valor',
            type: 'text',
            label: 'valor',
            placeholder: 'valor',
            attributes: {
              minlength: 4,
              maxlength: 450,
              inputmode: 'text'
            }
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {

                this.appConfigCreateDto.Clave = data.clave;
                this.appConfigCreateDto.Valor = data.valor;

                this.configuracionService.InsertConfig(this.appConfigCreateDto).subscribe(result =>{
                  
                  console.log(result);

                  if(result.meta.isValid === true){
  
                     this.openToast(result.meta.message,'success');
                     setTimeout( () => {
                       this.configuracionService.GetAllAppConfig(this.appConfigAppQueryFilter);
                       },500);
  
                    }else{
                       this.openToast(result.meta.message,'danger');
                    }

                });
              } 
           }
        ]
      });
  
      await alert.present();
  
      }else if(flag === 1){
   
       this.tituloVentaEdicion = 'Editar item';
  
       const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: this.tituloVentaEdicion,
        subHeader: '',
        message: '',
        inputs: [
          {
            name: 'clave',
            type: 'text',
            label: 'clave',
            placeholder: 'clave',
            value : item.clave,
            attributes: {
              minlength: 4,
              maxlength: 100,
              inputmode: 'text'
            }
          },
          {
            name: 'valor',
            type: 'text',
            label: 'valor',
            placeholder: 'valor',
            value : item.valor,
            attributes: {
              minlength: 4,
              maxlength: 450,
              inputmode: 'text'
            }
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {

              this.appConfigUpdateDto.id = item.id;
              this.appConfigUpdateDto.Clave = data.clave;
              this.appConfigUpdateDto.Valor = data.valor;

              this.configuracionService.UpdateConfig(this.appConfigUpdateDto).subscribe(result =>{

                  if(result.meta.isValid === true){
  
                    this.openToast(result.meta.message,'success');
                    setTimeout( () => {
                      this.configuracionService.GetAllAppConfig(this.appConfigAppQueryFilter);
                      },500);
  
                   }else{
  
                     this.openToast(result.meta.message,'danger');
                   
                    }

              });
            }
          }
        ]
      });
  
      await alert.present();
  
      }
  
  
    }


  /* Acciones de Eliminación,Actualizar, crear */ 

  async DeleteItem(item) {

    
    //this.appVariableDeleteDto.id = item.id;

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: 'Esta seguro de eliminar?',
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

            this.appConfigDeleteDto.id = item.id;

            this.configuracionService.DeleteConfig(this.appConfigDeleteDto).subscribe(result =>{

              if(result.meta.isValid === true){
                    this.openToast(result.meta.message,'success');
                    setTimeout( () => {
                      this.configuracionService.GetAllAppConfig(this.appConfigAppQueryFilter);
                      },500);
                   }else{
                     this.openToast(result.meta.message,'danger');
                   }

            });
          }
        }
      ]
    });

    await alert.present();
  }


}
