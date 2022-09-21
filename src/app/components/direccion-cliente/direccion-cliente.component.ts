import { Component, OnInit } from '@angular/core';
import { MtrDireccionesDto } from 'src/app/models/mtr-direcciones-dto';
import { CotizacionesListService } from '../../services/cotizaciones/cotizaciones-list.service'
@Component({
  selector: 'app-direccion-cliente',
  templateUrl: './direccion-cliente.component.html',
  styleUrls: ['./direccion-cliente.component.scss'],
})
export class DireccionClienteComponent implements OnInit {

  direccionFacturaCliente : MtrDireccionesDto[] = [];
  labelFacturacion : string;

  constructor(private cotizaService: CotizacionesListService) { }

  ngOnInit() {
    
    this.cotizaService.direccionFacturarCliente$.subscribe(direccionFacturaResult =>{

      if(direccionFacturaResult === ''){
        
        this.direccionFacturaCliente = [];

      }else{

      this.direccionFacturaCliente = []; 
      this.direccionFacturaCliente.push(direccionFacturaResult); 
      this.labelFacturacion =  "Dirección a Facturar"
    }
  
  });
  
 }

}
