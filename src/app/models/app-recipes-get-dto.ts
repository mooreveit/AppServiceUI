import { AppProductsGetDto } from './app-products-get-dto';
import { AppVariablesGetDto } from './app-variables-get-dto';
import { AppIngredientsGetDto } from './app-ingredients-get-dto';
export class AppRecipesGetDto {


    id: number;


    appproductsId: number;

    appVariableId: number;
    description: string;
    appIngredientsId: number;
    quantity: number;
    totalCost: number;
    formula: string;
    formulaValue: string
    sumValue: boolean;
    orderCalculate: number;
    code: string
    includeInSearch: boolean;
    secuencia: number;
    afectaCosto: boolean;
    truncarEntero: boolean;
    esVariableDeEntrada: boolean;
    descriptionSearch:string;
    mensajeValidacionFormula:string;
    
    appProductsGetDto: AppProductsGetDto;

    appVariablesGetDto: AppVariablesGetDto;

    appIngredientsGetDto: AppIngredientsGetDto;

}
