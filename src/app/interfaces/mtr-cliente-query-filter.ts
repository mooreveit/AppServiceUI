export interface MtrClienteQueryFilter {

    usuario?: string;
    oficina?: string;
    vendedor?: string;
    codigo?: string;
    rif?: string;
    searchText?: string;

    //Paginacion
    PageSize: number;

    PageNumber: number;
}
