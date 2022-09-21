import { CobEstadoCuentaDto } from './cob-estado-cuenta-dto';
export class CobGrabacionCobranzaDto {

    id: number;
    documento: number;
    transaccion: string;
    docAfecta: number;
    monto: number
    cotizacion: string;
    rpdoc: number;
    rpdct: string;
    rpkco: string
    rpsfx: string
    docAfectaSap: string
    rmonto: number;

    docAfectaMostrar: string;
    montoMostrar: string;
    baseImponibleMostrar: string;
    ivaMostrar: string;
    montoOriginalMostrar: string;
    fechaDocumento: Date;
    fechaDocumentoString: string;
    cuentaBancaria: string;
    moneda: string;
    baseImponible: number;
    iva: number;

    documentoSap: string;
    ejercicioDocumentoSap: string;
    pagoCorrespondeIva: boolean;


    cobEstadoCuentaDto: CobEstadoCuentaDto;

}
