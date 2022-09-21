import { Component, OnInit } from '@angular/core';
import { MtrTipoMonedaDto } from '../../models/mtr-tipo-moneda-dto';
import { MtrBancosDto } from '../../models/mtr-bancos-dto';
import { MtrTipoMonedaQueryFilter } from '../../interfaces/mtr-tipo-moneda-query-filter';
import { CobTipoTransaccionDto } from '../../models/cob-tipo-transaccion-dto';
import { MtrBancosQueryFilter } from '../../interfaces/mtr-bancos-query-filter';
import { CobTipoTransaccionQueryFilter } from '../../interfaces/cob-tipo-transaccion-query-filter';
import { CobTipoTransaccionService } from '../../services/cob-tipo-transaccion.service';
import { MtrBancosService } from '../../services/mtr-bancos.service';
import { MtrTipoMonedaService } from '../../services/mtr-tipo-moneda.service';
import { CobTransaccionesService } from '../../services/cob-transacciones.service';
import { CobTransaccionesDto } from 'src/app/models/cob-transacciones-dto';
import { CobTransaccionesQueryFilter } from '../../interfaces/cob-transacciones-query-filter';
import { OfdTipoDocumentoDto } from '../../models/ofd-tipo-documento-dto';
import { OfdTipoDocumentoQueryFilter } from '../../interfaces/ofd-tipo-documento-query-filter';
import { OfdTipoDocumentoServiceService } from '../../services/ofd-tipo-documento-service.service';
import { MtrOficinaQueryFilter } from '../../interfaces/mtr-oficina-query-filter';
import { IUsuario } from '../../interfaces/iusuario';
import { MtrOficinaServiceService } from '../../services/mtr-oficina-service.service';
import { MtrOficinaDto } from '../../models/mtr-oficina-dto';
import { GeneralService } from '../../services/general.service';
import { MtrVendedorDto } from '../../models/mtr-vendedor-dto';
import { MtrVendedorQueryFilter } from '../../interfaces/mtr-vendedor-query-filter';
import { MtrVendedorService } from '../../services/mtr-vendedor.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { PageMenuQueryFilter } from '../../interfaces/page-menu-query-filter';
import { GenericFilter } from '../../interfaces/generic-filter';
import { SapTratamientoContactoGetDto } from '../../models/sap-tratamiento-contacto-get-dto';
import { SapCargoContactoGetDto } from '../../models/sap-cargo-contacto-get-dto';
import { SapPoderContactoGetDto } from '../../models/sap-poder-contacto-get-dto';
import { SapDepartamentoContactoGetDto } from '../../models/sap-departamento-contacto-get-dto';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  usuario: IUsuario;

  listMtrTipoMonedasDto: MtrTipoMonedaDto[] = [];
  listMtrBancosDto: MtrBancosDto[] = [];
  listCobTipoTransaccionDto: CobTipoTransaccionDto[] = [];
  listCobTransaccionesDto: CobTransaccionesDto[] = [];
  listCobTransaccionesImpuestoDto: CobTransaccionesDto[] = [];
  listOfdTipoDocumentoDto: OfdTipoDocumentoDto[] = [];
  mtrOficinaDto: MtrOficinaDto[] = [];

  mtrTipoMonedaQueryFilter: MtrTipoMonedaQueryFilter;
  mtrBancosQueryFilter: MtrBancosQueryFilter;
  cobTipoTransaccionQueryFilter: CobTipoTransaccionQueryFilter;
  cobTransaccionesQueryFilter: CobTransaccionesQueryFilter;
  ofdTipoDocumentoQueryFilter: OfdTipoDocumentoQueryFilter;

  mtrOficinaQueryFilter: MtrOficinaQueryFilter;

  mtrVendedoresDto: MtrVendedorDto[] = [];
  mtrVendedorQueryFilter: MtrVendedorQueryFilter;

  pageMenuQueryFilter: PageMenuQueryFilter;
  role: number;



  genericFilter: GenericFilter;
  listTratamientoDto: SapTratamientoContactoGetDto[] = [];
  listSapCargoContacto: SapCargoContactoGetDto[] = [];
  listsapPoderContactoGetDto: SapPoderContactoGetDto[] = [];
  listSapDepartamentoContacto: SapDepartamentoContactoGetDto[] = [];
  constructor(private gs: GeneralService,
    private cobTipoTransaccionService: CobTipoTransaccionService,
    private mtrBancosService: MtrBancosService,
    private MtrTipoMonedaService: MtrTipoMonedaService,
    private cobTransaccionesService: CobTransaccionesService,
    private ofdTipoDocumentoServiceService: OfdTipoDocumentoServiceService,
    private mtrOficinaService: MtrOficinaServiceService,
    private mtrVendedorService: MtrVendedorService,
    public router: Router,
    public loginService: LoginService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private configuracionService:ConfiguracionService) {


    this.usuario = this.gs.GetUsuario();
  }

  ngOnInit() {

    //ParametrosMaquinas
    this.configuracionService.getParametrosMaquina().subscribe(resp => {
      console.log('respuesta en parametros maquina',resp)
      localStorage.setItem("parametrosMaquinas", JSON.stringify(resp));
    
     });

    this.CargarCombos();
  }


  private CargarCombos() {

    /*this.pageMenuQueryFilter = {
      role: +localStorage.getItem('Role')
    };


    console.log("role desede el main", this.pageMenuQueryFilter);
    this.loginService.GetMenu(this.pageMenuQueryFilter).subscribe(response => {
      console.log("Menu desde la api", response);
      localStorage.setItem("menu", JSON.stringify(response));
    });*/




    //Busco subcategorias 
    let data =
    {
      Id: 0,
      Description: ""
    }
    this.productoService.SubCategoryGetAll(data).subscribe(result => {


      localStorage.setItem("listSubcategoria", JSON.stringify(result.data));
    });

    


    //Oficinas

    this.mtrOficinaQueryFilter = {
      Usuario: this.usuario.user,
      PageSize: 10,
      PageNumber: 1,
    };

    this.mtrOficinaService.GetAllOficinas(this.mtrOficinaQueryFilter).subscribe(resp => {
      this.mtrOficinaDto = resp.data;
      console.log('Oficinas desde el Main', this.mtrOficinaDto);
      localStorage.setItem("listOficinas", JSON.stringify(this.mtrOficinaDto));
    });


    //Vendedores

    this.mtrVendedorQueryFilter = {
      usuario: this.usuario.user,
      oficina: 0
    };
    this.mtrVendedorService.ListVendedoresPorUsuario(this.mtrVendedorQueryFilter).subscribe(resp => {
      this.mtrVendedoresDto = resp.data;

      localStorage.setItem("listVendedores", JSON.stringify(this.mtrVendedoresDto));
    });




    //Moneda


    console.log('buscando moneda en la api +++++++');
    this.mtrTipoMonedaQueryFilter = {
      id: 0,
      descripcion: ""
    };
    this.MtrTipoMonedaService.ListMonedas(this.mtrTipoMonedaQueryFilter).subscribe(respMoneda => {
      this.listMtrTipoMonedasDto = respMoneda.data;
      localStorage.setItem("listMoneda", JSON.stringify(this.listMtrTipoMonedasDto));
    });



    //Tipo de Transaccion

    this.cobTipoTransaccionQueryFilter = {
      searchText: "",
    };

    this.cobTipoTransaccionService.ListCobTipoTransaccion(this.cobTipoTransaccionQueryFilter).subscribe(respTipo => {
      this.listCobTipoTransaccionDto = respTipo.data;
      localStorage.setItem("listCobTipoTransaccion", "");
      localStorage.setItem("listCobTipoTransaccion", JSON.stringify(this.listCobTipoTransaccionDto));
    });


    //Banco

    this.mtrBancosQueryFilter = {
      codigo: "",
      nombre: "",
      idTipoTransaccion: "",
    };

    this.mtrBancosService.ListBancos(this.mtrBancosQueryFilter).subscribe(resp => {
      this.listMtrBancosDto = resp.data;
      localStorage.setItem("listMtrBanco", "");
      localStorage.setItem("listMtrBanco", JSON.stringify(this.listMtrBancosDto));
      console.log("LISTADO DE BANCOS", resp.data);
    });


    //Cob Transaccion

    this.cobTransaccionesQueryFilter = {
      efectivo: true,
      idTransacccionCobranzas: 0
    };

    this.cobTransaccionesService.listCobTransaccionesEfectivo(this.cobTransaccionesQueryFilter).subscribe(resp => {
      this.listCobTransaccionesDto = resp.data;
      localStorage.setItem("listCobTransacciones", JSON.stringify(this.listCobTransaccionesDto));
    });


    //Cob Transacciones Impuesto

    this.cobTransaccionesQueryFilter = {
      efectivo: false,
      idTransacccionCobranzas: 0
    };

    this.cobTransaccionesService.listCobTransaccionesRetenciones(this.cobTransaccionesQueryFilter).subscribe(resp => {
      this.listCobTransaccionesImpuestoDto = resp.data;
      console.log("list retenciones desde el main resp.data: ", resp.data);
      console.log("list retenciones desde el main : ", this.listCobTransaccionesImpuestoDto);
      localStorage.setItem("listCobTransaccionesRetencion", JSON.stringify(this.listCobTransaccionesImpuestoDto));
    });

    /*  this.listCobTransaccionesImpuestoDto = JSON.parse(localStorage.getItem("listCobTransaccionesRetencion"));
     if(!this.listCobTransaccionesImpuestoDto ){
       this.cobTransaccionesQueryFilter = {
         efectivo: false,
       };
     
       this.cobTransaccionesService.listCobTransaccionesRetenciones(this.cobTransaccionesQueryFilter).subscribe(resp => {
         this.listCobTransaccionesImpuestoDto = resp.data;
         localStorage.setItem("listCobTransaccionesRetencion", JSON.stringify(this.listCobTransaccionesDto ));
       });
     } */



    //Tipo Documento adjunto


    this.ofdTipoDocumentoQueryFilter = {
      idGrupoTipoDocumento: 2,
      nombreDocumento: '',
      idTipoDocumento: 0,

    };

    this.ofdTipoDocumentoServiceService.listTipoDocumento(this.ofdTipoDocumentoQueryFilter).subscribe(resp => {
      this.listOfdTipoDocumentoDto = resp.data;
      localStorage.setItem("listTipoDocumento", JSON.stringify(this.listOfdTipoDocumentoDto));
    });


    //MAestro de Contactos
    this.genericFilter = {

      pageNumber: 1,
      pageSize: 20,


    };

    this.clienteService.GetAllSapTratamientoContacto(this.genericFilter).subscribe(respTratamiento => {


      this.listTratamientoDto = respTratamiento;
      localStorage.setItem("listTratamientoDto", JSON.stringify(this.listTratamientoDto));



    },
      error => {


        console.log("en el error list tratamiento: ", error);
      });


    this.clienteService.ListGetAllSapCargoContacto(this.genericFilter).subscribe(respCargoContacto => {


      this.listSapCargoContacto = respCargoContacto;
      localStorage.setItem("listSapCargoContacto", JSON.stringify(this.listSapCargoContacto));



    },
      error => {


        console.log("en el error list cargo: ", error);
      });

    this.clienteService.GetAllSapDepartamentoContacto(this.genericFilter).subscribe(respDepartamentoContacto => {


      this.listSapDepartamentoContacto = respDepartamentoContacto;
      localStorage.setItem("listSapDepartamentoContacto", JSON.stringify(this.listSapDepartamentoContacto));


    },
      error => {


        console.log("en el error list departamento: ", error);
      });


    this.clienteService.ListGetAllSapPoderContacto(this.genericFilter).subscribe(respPoderContacto => {


      this.listsapPoderContactoGetDto = respPoderContacto;
      localStorage.setItem("listsapPoderContactoGetDto", JSON.stringify(this.listsapPoderContactoGetDto));




    },
      error => {


        console.log("en el error list departamento: ", error);
      });





  }

  onClickExit() {
    this.gs.KillUsuario();
    this.router.navigate(['/login']);
  }
}
