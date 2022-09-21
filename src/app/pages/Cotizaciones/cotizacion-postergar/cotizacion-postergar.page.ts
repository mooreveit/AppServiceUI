import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppGeneralQuotesGetDto } from '../../../models/app-general-quotes-get-dto';
import { AppGeneralQuotesUpdateDto } from '../../../models//app-general-quotes-update-dto';

import { GeneralService } from '../../../services/general.service';
import { CotizacionesListService} from '../../../services/cotizaciones/cotizaciones-list.service';
@Component({
  selector: 'app-cotizacion-postergar',
  templateUrl: './cotizacion-postergar.page.html',
  styleUrls: ['./cotizacion-postergar.page.scss'],
})
export class CotizacionPostergarPage implements OnInit {

    public cotizacion: AppGeneralQuotesGetDto
    public updateDto: AppGeneralQuotesUpdateDto = new AppGeneralQuotesUpdateDto()

    constructor(private router: Router,
                private generalService: GeneralService,
                private cotizacionesListService: CotizacionesListService
    ) { }

    ngOnInit() {
                
        //subscripcion al observable de cotizaciones
        this.cotizacionesListService.cotizacion$.subscribe(resp => { 
            this.cotizacion=resp
        })

    }

    //evento cuando se lececciona la fecha
    dateChanged() { 
        //alert(this._fecha)
    }

    onCancelar() { alert("Cancelar") }

    onGrabar() {
        
        this.updateDto.FechaPostergada = this.cotizacion.fechaPostergada

        if ((this.updateDto.FechaPostergada != null) && (this.cotizacion.observacionPostergar.length > 0) ) {
            //Datos OK

            console.log("Grabar...")

            //datos postergacion
            this.updateDto.FechaPostergada = this.cotizacion.fechaPostergada
            this.updateDto.ObservacionPostergar = this.cotizacion.observacionPostergar

            //datos complementarios requeridos para hacer el updateDto
            this.updateDto.cotizacion = this.cotizacion.cotizacion
            this.updateDto.fecha = this.cotizacion.fecha
            this.updateDto.id = this.cotizacion.id
            this.updateDto.idCliente = this.cotizacion.idCliente
            this.updateDto.idCondPago = this.cotizacion.idCondPago
            this.updateDto.idContacto = this.cotizacion.idContacto
            this.updateDto.idDireccionEntregar = this.cotizacion.idDireccionEntregar
            this.updateDto.idDireccionFacturar = this.cotizacion.idDireccionFacturar
            this.updateDto.idMtrTipoMoneda = this.cotizacion.idMtrTipoMoneda
            this.updateDto.observaciones = this.cotizacion.observaciones
            this.updateDto.ordenCompra = this.cotizacion.ordenCompra
            this.updateDto.usuarioActualiza = this.generalService.GetUsuario().user

            //Llamo al servicio pasandole el objeto AppGeneralQuotesUpdateDto
            this.cotizacionesListService.UpdateGeneralCotizacion(this.updateDto).subscribe(resp => {

                console.log(resp)

                //Recibo la cotizacion actualizada
                this.cotizacion = resp.data

                //Mensaje al usuario
                if (resp.meta.isValid) {

                    //válido
                    this.generalService.presentToast(resp.meta.message, "success")

                    //Actualizo el observable
                    this.cotizacionesListService.cotizacion$.next(this.cotizacion)
                }
                else {

                    //Operacion no valida
                    this.generalService.presentToast(resp.meta.message, "danger")
                }

            })
        }
        else { 
            alert("Debe indicar fecha y observaciones.")
        }
        
    }

}
