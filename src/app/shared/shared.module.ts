import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { CotizacionResumenComponent } from '../components/cotizacion-resumen/cotizacion-resumen.component';
import { DireccionClienteComponent } from '../components/direccion-cliente/direccion-cliente.component';
import { DireccionEntregaComponent } from '../components/direccion-entrega/direccion-entrega.component';
import { BuscadorUnidadesComponent } from '../components/buscador-unidades/buscador-unidades.component';
import { NumberInputComponent } from '../components/number-input/number-input.component';
import { NumberMaskComponent } from '../components/number-mask/number-mask.component';

@NgModule({
  declarations: [
    CotizacionResumenComponent,
    DireccionClienteComponent,
    DireccionEntregaComponent,
    BuscadorUnidadesComponent,
    NumberMaskComponent,
    NumberInputComponent,
    BuscadorUnidadesComponent,



  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CotizacionResumenComponent,
    DireccionClienteComponent,
    DireccionEntregaComponent,
    BuscadorUnidadesComponent,
    NumberMaskComponent,
    NumberInputComponent,
    IonicModule,
    

  ]
})
export class SharedModule { }
