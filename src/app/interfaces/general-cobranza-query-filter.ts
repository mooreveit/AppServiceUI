export interface GeneralCobranzaQueryFilter {

    UsuarioConectado?:string;

    IdOficina?:string;
    
    IdCliente?:string;
    
    IdBanco?:string;
    
    IdTipoTransaccion?:string;
    
    FechaTransaccion?:Date;

    UsuarioRegistro?:string;

    documento:number;

    vendedor:string;
    
    searchText?:string;

    //Paginacion
    PageSize:number;

    PageNumber:number;
}
