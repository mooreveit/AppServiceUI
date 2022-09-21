import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { UploaderComponent } from './uploader/uploader.component';
import { BuscadorVariablesComponent } from './buscador-variables/buscador-variables.component';
import { BuscadorIngredientesComponent } from './buscador-ingredientes/buscador-ingredientes.component';
//import { NumberInputComponent } from './number-input/number-input.component';
import { BuscadorProductosComponent } from './buscador-productos/buscador-productos.component';
import { BuscadorMunicipioComponent } from './buscador-municipio/buscador-municipio.component';
import { SpinnerComponent } from './spinner/spinner.component';
 
@NgModule({
    declarations: [
        UploaderComponent,
        BuscadorVariablesComponent,
        BuscadorIngredientesComponent,
        BuscadorProductosComponent,
        BuscadorProductosComponent,
        BuscadorMunicipioComponent,
     SpinnerComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        UploaderComponent,
        BuscadorVariablesComponent,
        BuscadorIngredientesComponent,
        BuscadorIngredientesComponent,
        BuscadorProductosComponent,
        BuscadorProductosComponent,
        BuscadorMunicipioComponent,
        SpinnerComponent,
       

        //NumberInputComponent
    ]
})
export class ComponentModule { }
