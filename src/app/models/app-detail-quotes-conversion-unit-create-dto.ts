import { AppTemplateConversionUnitGetDto } from './app-template-conversion-unit-get-dto';
export class AppDetailQuotesConversionUnitCreateDto {


    appGeneralQuotesId: number;
    appProductId: number;
    appDetailQuotesId: number;
    appUnitIdSince: number;
    appUnitIdUntil: number;
    appTemplateConversionUnitGetDto: AppTemplateConversionUnitGetDto[] = [];

}
