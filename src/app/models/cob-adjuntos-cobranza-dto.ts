export class CobAdjuntosCobranzaDto {

    Indice: number;

    Documento: number;
        
    IdTipoDocumento: number;
    
    NombreArchivo: string;

    IdUsuarioCreacion: string;
            
    FechaCreacion: string;
                
    DescripcionTipoDocumento: string;
            
    Ruta: string;
            
    Link: string;
        
    Header: string;
            
    Extension: string;
            
    Data: string;

    Valid: boolean;
    
    isImage:boolean;
}

export class CobAdjuntosCobranzaUploadDto {

    Valid: boolean;

    Message: string;
}
