export class AppGeneralQuotesCreateDto {


    idCliente: string;
    idDireccionFacturar: number;
    idDireccionEntregar: number;
    idCondPago: number;
    idContacto: number;
    idMtrTipoMoneda: number;
    fecha: Date;
    ordenCompra: string
    observaciones: string;
    fijarPrecioBs: boolean;
    //para prospectos
    rif: string;
    razonSocial: string;
    direccion: string;
    idMunicipio: number;

    //Auditoria
    usuarioActualiza: string;
}