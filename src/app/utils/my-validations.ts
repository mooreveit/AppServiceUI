import { AbstractControl } from '@angular/forms'
import { CobGrabacionCobranzasService } from '../services/cob-grabacion-cobranzas.service';
import { map } from 'rxjs/Operators';
import { OfdCotizacionQueryFilter } from '../interfaces/ofd-cotizacion-query-filter';

export class MyValidations {



    static lenCotizacionIsInvalid(control: AbstractControl) {

        var cotizacion = new String("")
        cotizacion = control.value;
        let tipoTransaccion = localStorage.getItem("tipoTransaccion");

        //if (tipoTransaccion == 'RU') {

        let len = cotizacion.length;

        if (len != 13 && tipoTransaccion == 'RU') {
            return { lenIsInvalid: true };
        }
        //}


        return null;

    }

    static lenComprobanteRetencion(control: AbstractControl) {
        const comprobante = control.value;
        let longitud: number = +localStorage.getItem("digitoValidadorComprobanteRetencion");

        let len: number = comprobante.length;
        console.log(len);
        if (len != longitud && longitud > 0) {
            return { lenIsInvalid: true };
        }
        return null;

    }

    static validateCotizacion(service: CobGrabacionCobranzasService) {


        return (control: AbstractControl) => {

            const cotizacion = control.value;
            let valid = false;
            let tipoTransaccion = localStorage.getItem("tipoTransaccion");
            let idCliente = localStorage.getItem("idCliente");
            //{cotizacion:cotizacion,idCliente:idCliente}

            return service.checkCotizacion({ cotizacion: cotizacion, idCliente: idCliente })
                .pipe(
                    map(response => {
                        if (tipoTransaccion == 'RU' && response.meta.isValid) {
                            valid = true;
                        }
                        if (tipoTransaccion == 'RC' || tipoTransaccion == 'RE') {
                            valid = true;
                        }

                        return valid ? null : { notValid: true }
                    })
                );
        };

    }

    static docAfectaIsInvalid(control: AbstractControl) {
        const docAfecta = control.value;
        let tipoTransaccion = localStorage.getItem("tipoTransaccion");



        if (docAfecta <= 0 && (tipoTransaccion == 'RC' || tipoTransaccion == 'RE')) {
            return { docIsInvalid: true };
        }
        return null;

    }

    static lenCotizacionIsInvalidWithParam(transaccion: string) {

        return (control: AbstractControl) => {
            const cotizacion = control.value;
            let len = cotizacion.length;
            console.log(len);
            console.log(transaccion);
            if (len != 13) {
                return { lenIsInvalid: true };
            }
            return null;

        };

    }



}