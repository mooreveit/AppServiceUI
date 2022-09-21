export class CobTransaccionesDto {

    idTransacccionCobranzas:number;
    transaccion:string;
    nombreTransaccion:string;
    efectivo:boolean;
    documentoMadre:boolean;
    impuesto:boolean;
    usuarioCreacion:string;
    fechaCreacion:Date;
    usuarioModificacion:string;
    fechaModificacion:Date;
    inactivo:boolean;
    cuentaContable:string;
    transLegacy:string
    anticipo:boolean;
    tipoSap:string;
    cuentaSap:string;
    digitosValidar:number;
    bsHolgura:number;
    flagRepiteImpuesto:boolean;

}
