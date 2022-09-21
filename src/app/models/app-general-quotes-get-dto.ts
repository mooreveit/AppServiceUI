import { MtrVendedorDto } from './mtr-vendedor-dto';
import { MtrClienteDto } from './mtr-cliente-dto';
import { MtrContactosDto } from './mtr-contactos-dto';
import { CondicionPagoDto } from './CondicionPagoDto';
import { MtrDireccionesDto } from './mtr-direcciones-dto';
import { MtrTipoMonedaDto } from './mtr-tipo-moneda-dto';
import { AppDetailQuotesGetDto } from './app-detail-quotes-get-dto';
import { AppStatusQuoteGetDto } from './app-status-quote-get-dto';
import { AppGeneralQuotesActionSheetDto } from './app-general-quotes-action-sheet-dto';

export class AppGeneralQuotesGetDto {


    id: number;
    cotizacion: string;
    idVendedor: string;
    idCliente: string;
    fecha: Date;
    observaciones: string;
    diasVigencia: number;
    fechaCaducidad: Date;
    fechaPostergada: Date;
    idEstatus: number;
    idCondPago: number;
    idContacto: number;
    observacionPostergar: string;
    idDireccionFacturar: number;
    idDireccionEntregar: number;
    ordenCompra: string;
    idMtrTipoMoneda: number;
    fijarPrecioBs: boolean;
    claseCss:string;
    mtrVendedorDto: MtrVendedorDto;
    mtrClienteDto: MtrClienteDto;
    mtrContactosDto: MtrContactosDto;
    condicionPagoDto: CondicionPagoDto;
    mtrDireccionesFacturarDto: MtrDireccionesDto;
    mtrDireccionesEntregarDto: MtrDireccionesDto;
    mtrTipoMonedaDto: MtrTipoMonedaDto;
    appDetailQuotesGetDto: AppDetailQuotesGetDto[] = [];
    appStatusQuoteGetDto: AppStatusQuoteGetDto;
    //appDetailQuotesInsertedGetDto: AppDetailQuotesGetDto;
    appGeneralQuotesActionSheetDto: AppGeneralQuotesActionSheetDto;
    rif: string;
    razonSocial: string;
    direccion: string;
    fechaString: string;
    permiteAdicionarDetalle: boolean;
    porcFlete: number;
    idMunicipio: number;
    descripcionMunicipio: string;
    orden: number;
    productosCotizados:string;

}