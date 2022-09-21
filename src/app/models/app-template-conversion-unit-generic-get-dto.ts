import { AppVariablesGetDto } from './app-variables-get-dto';
import { AppUnitsGetDto } from './app-units-get-dto';
export class AppTemplateConversionUnitGenericGetDto {

    id: number;
    appUnitIdSince: number;
    appUnitIdUntil: number;
    appVariableId: number;
    description: string;
    value: number;
    formula: string;
    formulaValue: string;
    sumValue: boolean;
    orderCalculate: number;
    code: string;
    min: number;
    max: number;
    appVariablesGetDto: AppVariablesGetDto;
    appUnitIdSinceGetDto: AppUnitsGetDto;
    appUnitIdUntilGetDto: AppUnitsGetDto;


}