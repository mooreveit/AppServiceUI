import { AppProductsGetDto } from './app-products-get-dto';
import { AppStatusQuoteGetDto } from './app-status-quote-get-dto';
import { AppUnitsGetDto } from './app-units-get-dto';
import { AppTemplateConversionUnitGetDto } from './app-template-conversion-unit-get-dto';
import { StatusAprobacionDto } from './app-status-aprobacion-dto';
import { AppProductConversionGetDto } from './app-product-conversion-get-dto';

export class AppDetailQuotesGetDto {

    id: number;
    appGeneralQuotesId: number;
    cotizacion: string;
    producto: string;
    idProducto: number;
    nombreComercialProducto: string;
    idEstatus: number;
    cantidad: number;
    cantidadSolicitada: number;
    precio: number;
    total: number;
    precioUsd: number;
    totalUsd: number;
    idUnidad: number;
    observaciones: string;
    diasEntrega: number;
    usuarioConectado: string
    valorConvertido: number;
    unitPriceBaseProduction: number;
    unitPriceConverted: number;
    appProductsGetDto: AppProductsGetDto;
    
    AppStatusQuoteGetDto: AppStatusQuoteGetDto;
    appUnitsGetDto: AppUnitsGetDto;
    quantityPerPackage: number;
    obsSolicitud: string;
    cantidadPorUnidadProduccion: number;
    appTemplateConversionUnitGetDto: AppTemplateConversionUnitGetDto[] = [];
    statusAprobacionDto: StatusAprobacionDto;
    medidaBasica: string;
    medidaOpuesta: string;
    appProductConversionGetDto:AppProductConversionGetDto;

}