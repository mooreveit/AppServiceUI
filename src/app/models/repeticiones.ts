export class ListaRepeticiones {

    appOrdenProductoRepeticionGetDto:AppOrdenProductoRepeticionGetDto[] = [];
    papelPrimeraParte:PapelPrimeraParte[] = [];
    papelSegundaParte:PapelSegundaParte[] = [];
    papelTerceraParte:PapelTerceraParte[] = [];
    papelCuartaParte:PapelCuartaParte[] = [];
    papelQuintaParte:PapelQuintaParte[] = [];
    nombresForma:NombresForma[] = [];
    productosExternos:ProductosExternos[] = [];
    productos:Productos[] = [];
    cantidadPartes:CantidadPartes[] = [];
    cantidadTintas:CantidadTintas[] = [];
    basica:Basica[] = [];
    opuesta:Opuesta[] = [];
}

export class AppOrdenProductoRepeticionGetDto {

    id :number;
    idCliente:string;
    nombreCliente:string;
    orden:string;
    fecha:Date;
    appproductsId:number;
    appproductsDecription:string;
    codProducto:string;
    nombreProducto:string;
    nombreForma:string;
    medidaBase:number;
    medidaVariable:number;
    partesFormula:number;
    cantTintas:number;
    papelPrimeraParte:string;
    papelSegundaParte:string;
    papelTerceraParte:string;
    papelCuartaParte:string
    papelQuintaParte:string;
    medidaBaseDecimal:number;
    medidaVariableDecimal:number;
    basicaHumano:string;
    opuestaHumano:string;

}
export class NombresForma
{
    descripcion:string;

}

export class ProductosExternos
{

    nombreProducto:string;
}

export class Productos
{

    appproductsDecription:string
}

export class CantidadPartes
{
   cantidad:number;
}
export class CantidadTintas
{
    cantidad:number;
}
export class Basica
{
    medidaBasica:string;
}
export class Opuesta
{
    medidaOpuesta:string;
}
export class PapelPrimeraParte
{
    papel : string;
}
export class PapelSegundaParte
{
    papel : string;
}
export class PapelTerceraParte
{
    papel : string;
}
export class PapelCuartaParte
{
    papel : string;
}
export class PapelQuintaParte
{
    papel : string;
}
