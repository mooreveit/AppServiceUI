import { Component, OnInit } from '@angular/core';
import { MtrDireccionesDto } from 'src/app/models/mtr-direcciones-dto';
import { CotizacionesListService } from '../../services/cotizaciones/cotizaciones-list.service'


@Component({
  selector: 'app-direccion-entrega',
  templateUrl: './direccion-entrega.component.html',
  styleUrls: ['./direccion-entrega.component.scss'],
})
export class DireccionEntregaComponent implements OnInit {

  direccionEntregaCliente : MtrDireccionesDto[] = [];
  labelEntrega : string;
  
  constructor(private cotizaService: CotizacionesListService) { }

  ngOnInit() {

    this.cotizaService.direccionEntregaCliente$.subscribe(direccionEntregaResult => {

      if( direccionEntregaResult === ''){

         this.direccionEntregaCliente = []
      }else{

      this.direccionEntregaCliente = [];
      this.direccionEntregaCliente.push(direccionEntregaResult);
      this.labelEntrega =  "Dirección a Entregar"
      
      }
    });

  }

}
