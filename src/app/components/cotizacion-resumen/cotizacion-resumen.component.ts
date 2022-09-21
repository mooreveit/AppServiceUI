import { Component, OnInit, Input} from '@angular/core';
import { AppGeneralQuotesGetDto } from '../../models/app-general-quotes-get-dto';

@Component({
  selector: 'app-cotizacion-resumen',
  templateUrl: './cotizacion-resumen.component.html',
  styleUrls: ['./cotizacion-resumen.component.scss'],
})
export class CotizacionResumenComponent implements OnInit {

    @Input('cotizacion') cotizacion: AppGeneralQuotesGetDto;
  
    constructor() { }

    ngOnInit() {
        console.log("desde el componente resumen-cotizacion")
        console.log(this.cotizacion.cotizacion)
    }

}
