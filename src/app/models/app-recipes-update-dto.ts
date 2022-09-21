

export class AppRecipesUpdateDto {

    id: number;
    appproductsId: number;
    appVariableId: number;
    description: string;
    appIngredientsId: number;
    quantity: number;
    totalCost: number;
    formula: string;
    orderCalculate: number;

    sumValue: boolean;
    includeInSearch: boolean;
    secuencia: number;
    afectaCosto: boolean;
    truncarEntero: boolean;
    esVariableDeEntrada: boolean;
    descriptionSearch:string;


}