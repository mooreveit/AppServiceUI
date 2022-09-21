import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/Operators';
import { AppOrdenProductoRepeticionFilterDto } from 'src/app/interfaces/app-orden-producto-repeticion-filter';
import { AppGeneralQuotesGetDto } from 'src/app/models/app-general-quotes-get-dto';
import { AppOrdenProductoRepeticionGetDto, CantidadPartes, CantidadTintas, PapelPrimeraParte } from 'src/app/models/repeticiones';
import { RepeticionesService } from 'src/app/services/repeticiones.service';

@Component({
  selector: 'app-repeticiones',
  templateUrl: './repeticiones.page.html',
  styleUrls: ['./repeticiones.page.scss'],
})
export class RepeticionesPage implements OnDestroy,OnInit {
  public cotizacion: AppGeneralQuotesGetDto
  public repeticionesFilter: AppOrdenProductoRepeticionFilterDto;
  public _cargando:boolean=false;
  public  appOrdenProductoRepeticionGetDto:AppOrdenProductoRepeticionGetDto[] = [];
  public  appOrdenProductoRepeticionGetDtoBK:AppOrdenProductoRepeticionGetDto[] = [];
  public  appOrdenProductoRepeticionGetDtoOriginal:AppOrdenProductoRepeticionGetDto[] = [];
  constructor( private router: Router,private repeticionesService:RepeticionesService) { }
  public orden : string;
  public nombreProducto:string;
  public  nombreForma:string;
  public partes:number;
  public tintas:number;
  public basica:string;
  public opuesta:string;
  papelPrimeraParte:PapelPrimeraParte[] = [];
  cantidadPartes:CantidadPartes[] = [];
  cantidadTintas:CantidadTintas[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  private subjectKeyUp = new Subject<any>();
  ngOnInit() {
    this.subjectKeyUp.pipe((debounceTime(1000))).subscribe((d)=>{
      console.log('recalculando para cantidad :',d);

      this.onFiltrar(d);
  }) 

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 2
  };

    this.cotizacion = this.router.getCurrentNavigation().extras.state.cotizacion;
    console.log(this.cotizacion);

    this.repeticionesFilter = {
      idCliente: this.cotizacion.idCliente //this.searchText
    };
    this._cargando = true;
    this.repeticionesService.GetAllRepeticiones(this.repeticionesFilter)
      .subscribe(result => {
        
          console.log('result de lista repeticiones: ', result);
          this.appOrdenProductoRepeticionGetDto=result.data.appOrdenProductoRepeticionGetDto;
          this.appOrdenProductoRepeticionGetDtoOriginal=result.data.appOrdenProductoRepeticionGetDto;
          this.papelPrimeraParte= result.data.papelPrimeraParte;
          this.cantidadPartes=result.data.cantidadPartes;
          this.cantidadTintas=result.data.cantidadTintas;
          console.log('result de lista repeticiones appOrdenProductoRepeticionGetDto: ', this.appOrdenProductoRepeticionGetDto);
          this._cargando = false;
          this.dtTrigger.next();
          //event.target.complete();
      });
    }


    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
   ordenChanged(event){

   
    this.orden=event;
   

    this.subjectKeyUp.next('ordenChanged');
  }

  nombreProductoChanged(event){
    this.nombreProducto=event;
    this.subjectKeyUp.next('nombreProductoChanged');
  }

  nombreFormaChanged(event){
    this.nombreForma=event;
    this.subjectKeyUp.next('nombreFormaChanged');
  }

  partesChanged(event){
    
    this.partes=event.detail.value.cantidad
    this.subjectKeyUp.next('partesChanged');
  }
  

  tintasChanged(event){

    this.tintas=event.detail.value.cantidad;
    console.log('tintas seleccionada',event.detail.value.cantidad)
    this.subjectKeyUp.next('tintasChanged');
  }

  basicaChanged(event){
    this.basica=event;
    this.subjectKeyUp.next('basicaChanged');
  }
  opuestaChanged(event){
    this.basica=event;
    this.subjectKeyUp.next('opuestaChanged');
  } 


 

  async onFiltrar(origenLlamada: string) {
        
       
   
    if(this.orden!= null && this.orden.length>0){
      this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDtoOriginal.filter(r => r !== null && r.orden.includes(this.orden) == true);
      return;
    }else{
      this.appOrdenProductoRepeticionGetDto =this.appOrdenProductoRepeticionGetDtoOriginal;
    }
 
   

   

    if(this.nombreProducto!=null && this.nombreProducto.length>0){
      
      this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDto.filter(r => r !== null && r.nombreProducto.toLowerCase().includes(this.nombreProducto.toLowerCase()) == true);
      if( this.appOrdenProductoRepeticionGetDto.length==0){
        this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDtoBK;
      }
    }
   


    if(this.nombreForma!=null && this.nombreForma.length>0){
      this.appOrdenProductoRepeticionGetDtoBK=this.appOrdenProductoRepeticionGetDto;
      this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDto.filter(r => r !== null && r.nombreForma.toLowerCase().includes(this.nombreForma.toLowerCase()) == true);
      if( this.appOrdenProductoRepeticionGetDto.length==0){
        this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDtoBK;
      }
    }
   
  
    if(this.partes != null && this.partes>0){
      console.log('PARTES',this.partes)
      console.log('ANTES DE FILTRAR',this.appOrdenProductoRepeticionGetDto)
      this.appOrdenProductoRepeticionGetDtoBK=this.appOrdenProductoRepeticionGetDto;

      this.appOrdenProductoRepeticionGetDto= this.appOrdenProductoRepeticionGetDto.filter(r => r !== null && r.partesFormula==this.partes);
      console.log('DESPUES DE FILTRAR',this.appOrdenProductoRepeticionGetDto)
      console.log('longitud',this.appOrdenProductoRepeticionGetDto.length)
      if( this.appOrdenProductoRepeticionGetDto.length==0){
        this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDtoBK;
      }
    }
   

    if(this.tintas != null && this.tintas>0){
      this.appOrdenProductoRepeticionGetDtoBK=this.appOrdenProductoRepeticionGetDto;
      this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDto.filter(r => r !== null && r.cantTintas==this.tintas);
      if( this.appOrdenProductoRepeticionGetDto.length==0){
        this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDtoBK;
      }
    }

 
    if( this.basica != null && this.basica.length>0){
      this.appOrdenProductoRepeticionGetDtoBK=this.appOrdenProductoRepeticionGetDto;
      this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDto.filter(r => r !== null && r.basicaHumano.includes(this.basica) == true);
      if( this.appOrdenProductoRepeticionGetDto.length==0){
        this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDtoBK;
      }
    }

   
    if(this.opuesta!= null && this.opuesta.length>0){
      this.appOrdenProductoRepeticionGetDtoBK=this.appOrdenProductoRepeticionGetDto;
      this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDto.filter(r => r !== null && r.opuestaHumano.includes(this.opuesta) == true);
      if( this.appOrdenProductoRepeticionGetDto.length==0){
        this.appOrdenProductoRepeticionGetDto = this.appOrdenProductoRepeticionGetDtoBK;
      }
    }


}

}
