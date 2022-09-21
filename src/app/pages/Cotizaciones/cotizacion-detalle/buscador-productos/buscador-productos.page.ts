import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { AppVariableSearchQueryFilter } from 'src/app/interfaces/app-variable-search-query-filter';
import { AppVariableSearchCompareQueryFilter } from 'src/app/interfaces/app-variable-search-compare-queryfilter';
import { ProductoService } from '../../../../services/producto.service';
import { AppVariableSearchGetDto } from '../../../../models/app-variable-search-get-dto';
import { AppProductsGetDto } from '../../../../models/app-products-get-dto';
import { AppVariableSearchGroupByVariableGetDto } from 'src/app/models/app-variable-search-group-by-variable-get-dto';
import { AppVariableSearchCompareQueryFilterBySubCategory, FilterProduct } from '../../../../interfaces/app-variable-search-compare-query-filter-by-sub-category-filter';

@Component({
    selector: 'app-buscador-productos',
    templateUrl: './buscador-productos.page.html',
    styleUrls: ['./buscador-productos.page.scss'],
})
export class BuscadorProductosPage implements OnInit {

    variablesSeleccionadasArray: any

    private qryFilter = new AppVariableSearchQueryFilter();

    public listaVariables: AppVariableSearchGetDto[] = []

    public listaVariablesAgrupado: AppVariableSearchGroupByVariableGetDto[] = []
    public listAppVariableSearchGetDto:AppVariableSearchGetDto[]=[];

    public listaProductos: AppProductsGetDto[];

    public arrayVariables: any[] = [];
    @Input() subcategoryId: number;
    constructor(private modalCtrl: ModalController, private productoService: ProductoService) {
    }

    ngOnInit() {
        console.log("this.subcategoryId",this.subcategoryId);
        this.qryFilter.appSubCategoryId = this.subcategoryId;

        
        this.productoService.GetAllAppVariableSearchAgrupado(this.qryFilter).subscribe(res => {

            this.listaVariablesAgrupado = res.data
            console.log("data en buscador de productos", res.data)

            console.log("this.listaVariablesAgrupado", this.listaVariablesAgrupado)


        })


        //Solicito unidades al servicio
        this.productoService.GetAllAppVariableSearch(this.qryFilter).subscribe(res => {

            this.listaVariables = res.data

            this.arrayVariables = []

            this.listaVariables.forEach((o, index) => {

                let _variable: AppVariableSearchGetDto = o

                let objeto = { id: index, objeto: o, marcado: false }

                this.arrayVariables.push(objeto)
            })


        })
    }

    //------ Para manejo de la lista de variables seleccionadas
    marcado() {

        return { "background-color": "green", "color": "white", "padding": "10px" }

    }

    desmarcado(): any {

        return { "background-color": "white", "color": "black", "padding": "10px" }

    }

    onChangeVariableId(event){
      console.log('Al seleccionar variable',event.detail.value)
      this.listAppVariableSearchGetDto = this.listAppVariableSearchGetDto.filter(item => item.appVariableId !== event.detail.value.appVariableId);

      this.listAppVariableSearchGetDto.push(event.detail.value);

      console.log('Al seleccionar variable this.listAppVariableSearchGetDto: ',this.listAppVariableSearchGetDto)
        
      this.buscar();

    }

    buscar(){

         //Hago peticion a la api  para q me entregue la lista de productos resultante 
        //asociados a los criterios indicados
        

        let objeto = {filters: this.listAppVariableSearchGetDto, subcategoryId:this.subcategoryId }
         console.log('Filter a enviar para buscar productos',objeto)

        this.productoService.GetAllProductusByCriteria(objeto).subscribe(res => {
            console.log('Result al buscar productos',res)
            this.listaProductos = res.data;
           /*  if (res.length > 0) {
                this.listaProductos = res
            }
            else {
                this.listaProductos = []
            } */

        });
    }
    


    onSelectListItem(ndx, variable: AppVariableSearchGetDto) {

        //el item seleccionado lo monto en un objeto

        let objeto = { id: ndx, objeto: variable }

        if (this.arrayVariables[ndx].marcado == true) {

            //Lo desmarco
            this.arrayVariables[ndx].marcado = false

        } else {

            //Lo marco
            this.arrayVariables[ndx].marcado = true

        }

        this.buscarProductos()

    }

    buscarProductos() {

        this.listaProductos = []

        //filtro variables seleccionadas
        const result = this.arrayVariables.filter(item => {
            return item.marcado == true;
        })


        //armo un arreglo con el que voy a llamar a la API para buscar productos
        let requestArray: any[] = []

        result.forEach(item => {
            requestArray.push({
                AppVariableId: item.objeto.appVariableId,
                SearchText: item.objeto.searchText
            })
        })

        //Hago peticion a la api  para q me entregue la lista de productos resultante 
        //asociados a los criterios indicados
        this.productoService.GetAllProductusByCriteria(requestArray).subscribe(res => {

            if (res.data.length > 0) {
                this.listaProductos = res.data
            }
            else {
                this.listaProductos = []
            }

        })


    }

    //al seleccionar producto...
    onSelect(producto: AppProductsGetDto) {
        console.log("Al seleccionar producto", producto);
        this.modalCtrl.dismiss({
            id: producto.id,
            descripcion: producto.description1,
            link: producto.link,
            idUnidadMedida: producto.productionUnitId,
            isValid: true,
            decripcionProductionUnit: producto.productionUnitGetDto.description1,
            code: producto.code,
            requiereDatosEntrada: producto.requiereDatosEntrada,
            precioLista: producto.unitPrice,
            precioListaProduccion: producto.unitPrice,
            appPriceDto:producto.appPriceDto,
            appProduct:producto
        });
    }

    goDetalle() {
        //this.router.navigate(['/edit-detalle-cotizacion'], {})
    }

    closeModal() {
        this.modalCtrl.dismiss({
            isValid: false
        })
    }

}
