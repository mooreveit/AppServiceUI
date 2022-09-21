export interface AppIngredientsQueryFilter {

    //Paginacion
    pageSize: number;

    pageNumber: number


    //Filtros
    id: number;
    code: string;
    description: string;
    searchText: string;

}