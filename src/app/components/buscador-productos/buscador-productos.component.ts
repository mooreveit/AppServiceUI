import { Component, OnInit, Input } from '@angular/core';
import { AppProductsGetDto } from '../../models/app-products-get-dto';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { AppProdutsQueryFilter } from '../../interfaces/app-produts-query-filter';

@Component({
  selector: 'app-buscador-productos',
  templateUrl: './buscador-productos.component.html',
  styleUrls: ['./buscador-productos.component.scss'],
})
export class BuscadorProductosComponent implements OnInit {


  itemAppProductsGetDto: AppProductsGetDto;
  appProductsGetDto: AppProductsGetDto[] = [];

  appProdutsQueryFilter: AppProdutsQueryFilter;
  @Input() subCategoria: number;
  constructor(private modalCtrl: ModalController, private router: Router,
    private productoService: ProductoService,) { }

  ngOnInit() {


    this.productoService.allProducts$.subscribe(resp => {
      this.appProductsGetDto = resp.data.filter(res => res.unitPrice>0);
      console.log(resp.data);
    });

    if (this.subCategoria == null) { this.subCategoria = 0 }

    this.appProdutsQueryFilter = {
      id: 0,
      subCategoria: this.subCategoria,
      pageSize: 100,
      pageNumber: 1,
      code: "",
      description1: "",
      description2: "",
      searchText: ''
    }
    console.log('filter a buscar productos General', this.appProdutsQueryFilter);

    this.productoService.GetAllAppProducts(this.appProdutsQueryFilter);

  }


  refresh() {
    this.productoService.GetAllAppProducts(this.appProdutsQueryFilter);
  }

  onChangeSearchText(event) {

    this.appProdutsQueryFilter.searchText = event.target.value;
    this.refresh();
  }

  selectProduct(item: AppProductsGetDto) {

    this.modalCtrl.dismiss({
      id: item.id,
      description:  item.description1,
      link: item.link,
      idUnidadMedida: item.productionUnitId,
      isValid: true,
      decripcionProductionUnit: item.productionUnitGetDto.description1,
      code: item.code,
      requiereDatosEntrada: item.requiereDatosEntrada,
      precioLista: item.unitPrice,
      precioListaProduccion: item.unitPrice,
      cantidadPorUnidadProduccion: item.quantityPerPackage,
      valorConvertido: item.quantityPerPackage,
      appPriceDto:item.appPriceDto,
      appProduct:item

    });

   

  }

  closeModal() {
    this.modalCtrl.dismiss()
  }
}
