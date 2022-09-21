export class Conversion {

    //entradas
    x_numerador:number;
    y_denominador:number;
    cantidadBase:number;
    
    //Result
    cantidadAlternativa:number;

    constructor(x_numerador:number, y_denominador:number,  cantidadBase:number) {
            
        this.x_numerador=x_numerador;
        this.y_denominador=y_denominador;
        this.cantidadBase=cantidadBase;

     }



    //Metodos
    getCantidadAlternativa(){
        let cociente = this.x_numerador/this.y_denominador;
        this.cantidadAlternativa=this.cantidadBase*cociente;
        console.log('cociente',cociente);
        console.log('cantidadBase',this.cantidadBase);
        console.log('this.cantidadAlternativa',this.cantidadAlternativa);
        return this.cantidadAlternativa;
    }

}

export class ConversionUnidadesMetrosCuadrados{
    
    //Entradas
    cantidadBase:number;
    medidaBasica:number;
    medidaOpuesta:number;
    ADICIONALPRODUCCION:number;
    ADICIONALPRODUCCIONOPUESTA:number;
    MEDIDAOPUESTAROLLO:number;
    MEDIDABASICAROLLO:number;
    area:number;
    
    constructor(adicionalProduccion:number, adicionalProduccionOpuesta:number,medidaBasicaRollo:number,medidaOpuesRollo:number) {
           this.ADICIONALPRODUCCION=adicionalProduccion;
           this.ADICIONALPRODUCCIONOPUESTA=adicionalProduccionOpuesta;
           this.MEDIDABASICAROLLO=medidaBasicaRollo;
           this.MEDIDAOPUESTAROLLO=medidaOpuesRollo; 

    }




    public getCantidadPorUnidad():number{

               

                 //cantidadBase
                 let AREA=((this.medidaBasica+this.ADICIONALPRODUCCION)/100)*((this.medidaOpuesta+this.ADICIONALPRODUCCIONOPUESTA)/100);
                 console.log('Area',AREA)   
                 this.area=AREA;
                 //[MEDIDAOPUESTAROLLO]/([MEDIDAOPUESTA]+[ADICIONALPRODUCCIONOPUESTA])
                 let UNIDADESPORMEDIDAPUESTAROLLO=this.MEDIDAOPUESTAROLLO/(this.medidaOpuesta+this.ADICIONALPRODUCCIONOPUESTA)
                 console.log('UNIDADESPORMEDIDAPUESTAROLLO',UNIDADESPORMEDIDAPUESTAROLLO)  
                 //[MEDIDABASICAROLLO]/([MEDIDABASICA]+[ADICIONALPRODUCCION])
                 let UNIDADESPORBASICAROLLO=this.MEDIDABASICAROLLO/(this.medidaBasica+this.ADICIONALPRODUCCION);
                 console.log('UNIDADESPORBASICAROLLO',UNIDADESPORBASICAROLLO)  
                 //[MEDIDAOPUESTAROLLO]/([MEDIDABASICA]+[ADICIONALPRODUCCION])
                 let UNIDADESPORMEDIDAPUESTAROLLO2=this.MEDIDAOPUESTAROLLO/(this.medidaBasica+this.ADICIONALPRODUCCION);
                 console.log('UNIDADESPORMEDIDAPUESTAROLLO2',UNIDADESPORMEDIDAPUESTAROLLO2)  
                 //[MEDIDABASICAROLLO]/([MEDIDAOPUESTA]+[ADICIONALPRODUCCIONOPUESTA])
                 let UNIDADESPORBASICAROLLO2=this.MEDIDABASICAROLLO/(this.medidaOpuesta+this.ADICIONALPRODUCCIONOPUESTA);
                 console.log('UNIDADESPORBASICAROLLO2',UNIDADESPORBASICAROLLO2)  
                
                 //[UNIDADESPORMEDIDAPUESTAROLLO]*[UNIDADESPORBASICAROLLO]
                 let CANTIDADPORUNIDAD = Math.trunc(UNIDADESPORMEDIDAPUESTAROLLO)*Math.trunc(UNIDADESPORBASICAROLLO);
                 console.log('CANTIDADPORUNIDAD',CANTIDADPORUNIDAD)  
                 //[UNIDADESPORMEDIDAPUESTAROLLO2]*[UNIDADESPORBASICAROLLO2]
                 let CANTIDADPORUNIDAD2=Math.trunc(UNIDADESPORMEDIDAPUESTAROLLO2)*Math.trunc(UNIDADESPORBASICAROLLO2);
                 console.log('CANTIDADPORUNIDAD2',CANTIDADPORUNIDAD2)  

                 if (CANTIDADPORUNIDAD > CANTIDADPORUNIDAD2) {
                     return CANTIDADPORUNIDAD
                 }else{
                     return CANTIDADPORUNIDAD2
                 }    
                

    }

   



}