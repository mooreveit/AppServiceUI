export interface AppGeneralQuotesQueryFilter {

    //Paginacion
    pageSize: number;

    pageNumber: number


    //Filtros
    usuarioConectado: string;

    cotizacion: string;

    searchText: string;

    fechaDesde?:string;
    fechaHasta?:string;

}
