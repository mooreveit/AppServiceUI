export class CobPagoRetencionesDto {

    id:number;
    idCobranza:number;
    idTransaccion:number;
    porcentaje:number;
    monto:number;
    fechaCrea:Date
    flagComprobanteNo:boolean;
    nroComprobante:string;
    fechaComprobante:Date;
    nombreTransaccion:string;
    montoString:string;

    fechaComprobanteString:string;
    txOrigen:string;

}
