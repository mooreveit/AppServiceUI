import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { AppVariablesQueryFilter } from 'src/app/interfaces/app-variables-query-filter';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { AppVariableCreateDto } from 'src/app/models/app-variable-create-dto';
import { AppVariableDeleteDto } from 'src/app/models/app-variable-delete-dto';
import { AppVariableUpdateDto } from 'src/app/models/app-variable-update-dto';
import { AppVariablesGetDto } from 'src/app/models/app-variables-get-dto';
import { CalculoVariablesService } from 'src/app/services/calculo-variables.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.page.html',
  styleUrls: ['./variables.page.scss'],
})
export class VariablesPage implements OnInit {

appVariablesQueryFilter : AppVariablesQueryFilter; 
appVariablesGetDto : AppVariablesGetDto[] = [];
appVariableCreateDto : AppVariableCreateDto = new AppVariableCreateDto();
appVariableUpdateDto : AppVariableUpdateDto = new AppVariableUpdateDto();
appVariableDeleteDto : AppVariableDeleteDto = new AppVariableDeleteDto(); 

usuario: IUsuario;
tituloVentaEdicion: string;

  constructor(
    private calculoVariablesService:CalculoVariablesService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private generalService: GeneralService,
    public toastController: ToastController,
    ) {
      this.usuario = this.generalService.GetUsuario();
     }

  ngOnInit() {
     this.calculoVariablesService.allVariables$.subscribe(allVariables =>{
      this.appVariablesGetDto =  allVariables.data;
      console.log(allVariables.data);
     });

     this.appVariablesQueryFilter = {
      pageSize : 10,
      pageNumber : 1,
      code : '',
      description : '',
      searchText : ''
    }
    
    this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter);
  }

  /* Crear nueva variable */ 
  onClickAdd(){
    this.CreateEditVariable(0,'');
  }

  refresh(){
    this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter);
  }

  onChangeSearchText(event) {
 
       this.appVariablesQueryFilter.searchText = event.target.value; 
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

  /* Menu de acciones sobre cada variable de la lista */ 
  async presentActionSheet(variable) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Acción',
      cssClass: 'my-custom-class',
      
      buttons: [{
        text: 'Actualizar',
        role: 'destructive',
        icon: 'pencil-outline',
        handler: () => {
          this.CreateEditVariable(1,variable);
        }
      }, 
      {
        text: 'Eliminar',
        icon: 'trash',
        handler: () => {
          this.DeleteVariable(variable)
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
  async CreateEditVariable(flag : number, variable : any){

    // flag 0 Nueva variable , flag 1 Actualizar o editar variable

    if(flag === 0){
      this.tituloVentaEdicion = 'Crear Nueva Variable'; 
              
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header:  this.tituloVentaEdicion,
      inputs: [
        {
          name: 'code',
          type: 'text',
          label: 'Code',
          placeholder: 'Code',
          attributes: {
            minlength: 4,
            maxlength: 100,
            inputmode: 'text'
          }
        },
        {
          name: 'descripcion',
          type: 'text',
          label: 'Descripción',
          placeholder: 'descripción',
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

              this.appVariableCreateDto.code = data.code;
              this.appVariableCreateDto.description = data.descripcion;
              this.appVariableCreateDto.UsuarioConectado = this.usuario.user;  

              this.calculoVariablesService.InsertVariable(this.appVariableCreateDto).subscribe(result =>{
              
                 if(result.meta.isValid === true){

                   this.openToast(result.meta.message,'success');
                   setTimeout( () => {
                     this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter)
                     },500);

                  }else{

                    this.openToast(result.meta.message,'danger');
                  
                  }
            
            });

          } // fin del handler para la llamada insert en la API
        }
      ]
    });

    await alert.present();

    }else{
 
     this.tituloVentaEdicion = 'Editar Variable';

     const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.tituloVentaEdicion,
      subHeader: '',
      message: 'Code:'+ variable.code,
      inputs: [
        {
          name: 'descripcion',
          type: 'text',
          label: 'Descripción',
          placeholder: 'descripción',
          value : variable.description,
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

              this.appVariableUpdateDto.code = variable.code;
              this.appVariableUpdateDto.description = data.descripcion;
              this.appVariableUpdateDto.id = variable.id;
                
              this.calculoVariablesService.UpdateVariable(this.appVariableUpdateDto).subscribe(result =>{
              
                if(result.meta.isValid === true){

                  this.openToast(result.meta.message,'success');
                  setTimeout( () => {
                    this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter)
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

  /* Eliminacion de una variable */  
  async DeleteVariable(variable) {

    
    this.appVariableDeleteDto.id = variable.id;

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: 'Esta seguro de eliminar esta variable?',
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

             this.calculoVariablesService.DeleteVariable(this.appVariableDeleteDto).subscribe(result =>{

              if(result.meta.isValid === true){
                this.openToast(result.meta.message,'success');
                setTimeout( () => {
                  this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter)
                  },500);
               }else{
                 this.openToast(result.meta.message,'danger');
               }
             

             })
          
          }
        }
      ]
    });

    await alert.present();
  }


}
