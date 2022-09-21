import { AppProductConversionGetDto } from './app-product-conversion-get-dto';
import { AppUnitsGetDto } from './app-units-get-dto';
import { AppSubcategoryGetDto } from './app-subcategory-get-dto';
import { AppPriceDto } from './app-price-dto';

export class AppProductsGetDto {

    id: number;
    code: string;
    description1: string;
    description2: string;
    appUnitsId: number;
    productionUnitId: number;
    unitPrice: number;
    urlImage: string;
    externalCode: string;
    appUnitsGetDto: AppUnitsGetDto;
    productionUnitGetDto: AppUnitsGetDto;
    prymaryMtrMonedaId: number;
    secundaryMtrMonedaId: number;
    appSubCategoryId: number;
    link: string;
    appSubCategoryGetDto: AppSubcategoryGetDto;
    quantityPerPackage: number;
    requiereDatosEntrada: boolean;
    flete: number;
    precioMasFlete: number;
    existencia: number;
    cajasProgramadas: number;
    disponible: number;
    appPriceDto:AppPriceDto[]
    cantidadMinima:number;
    validadCantidadFija:boolean;
    cantidadFija:number;
    tipoCalculo:number;
    conversiones :AppProductConversionGetDto[];

}