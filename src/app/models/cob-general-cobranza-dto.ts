export class CobGeneralCobranzaDto {

    documento: number;
    idCliente: string;
    idBanco: string;
    idTipoTransaccion: string;
    montoTransaccion: number;
    numReferencia: string;
    fechaTransaccion: Date;
    fechaRegistro: Date;
    usuarioRegistro: string;
    flagEnviado: boolean;
    fechaEnviado: Date;
    flagAprobado: boolean;
    fechaAprobado: Date;
    usuarioAprueba: string;
    flagConfirmado: boolean
    fechaConfirmado: Date;
    usuarioConfirma: string;
    totalDetalleCobrado: number;
    flagAnulado: boolean;
    fechaAnulado: Date;
    usuarioAnula: string;
    flagPagoMas: boolean;
    obsvAnulacion: string;
    emailCliente: string;
    batch: number;
    flagReversado: boolean;
    fechaReversado: Date;
    UsuarioReversa: string;
    fechaLm: Date;
    transferidoSap: boolean;
    fechaLmcxC: Date;
    pasoIntegridadInterfase: boolean;
    nombreCliente: string;
    fechaTransaccionString: string;
    montoTransaccionString: string;
    nombreVendedor: string;
    idMtrTipoMoneda: number;
    totalDetalleCobradoString: string;
    status: string;
    nombreBanco: string;
    nombreTipoTransaccion: string;
    flagImpuesto: boolean;

    nombreTipoMoneda: string;

    correoVendedor: string;

    telefonoVendedor: string;

    fechaTransaccionIso: string;

    linkRecibo: string;

}
