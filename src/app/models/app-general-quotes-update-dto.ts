export class AppGeneralQuotesUpdateDto {

    id: number;
    cotizacion: string;
    idCliente: string;
    idDireccionFacturar: number;
    idDireccionEntregar: number;
    idCondPago: number;
    idContacto: number;
    idMtrTipoMoneda: number;
    ordenCompra: string
    fecha: Date;
    observaciones: string;
    usuarioActualiza: string;
    fijarPrecioBs: boolean;
    FechaPostergada?: Date;
    ObservacionPostergar?: string;
    rif: string;
    razonSocial: string;
    direccion: string;
    idMunicipio: number;
}